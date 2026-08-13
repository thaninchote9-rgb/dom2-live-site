import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch-timeout';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const COOKIE = 'dom2_vpn_session';

function secret(): string {
  const value = process.env.VPN_SITE_SECRET ?? '';
  if (value.length < 32) throw new Error('VPN_SITE_SECRET is not configured securely');
  return value;
}
function sign(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

function sessionFrom(req: NextRequest): { id: string; fresh: boolean } {
  const raw = req.cookies.get(COOKIE)?.value ?? '';
  const [id, signature] = raw.split('.');
  if (id && signature && /^[A-Za-z0-9_-]{43}$/.test(id)) {
    const expected = sign(id);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length === b.length && timingSafeEqual(a, b)) return { id, fresh: false };
  }
  return { id: randomBytes(32).toString('base64url'), fresh: true };
}

function validOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return host === 'dom2-live.ru' || host === 'www.dom2-live.ru' || host === 'localhost';
  } catch {
    return false;
  }
}

function normalizedIp(req: NextRequest): string {
  const forwarded =
    req.headers.get('x-vercel-forwarded-for') ||
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    '';
  const raw = forwarded.split(',')[0]?.trim().toLowerCase() || 'unknown';
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(raw)) return raw;
  if (raw.includes(':')) {
    const prefix = raw.split(':').slice(0, 4).join(':');
    return `v6:${prefix}`;
  }
  return 'unknown';
}

function ipHash(req: NextRequest, sessionId: string): string {
  const ip = normalizedIp(req);
  const value = ip === 'unknown' ? `unknown:${sessionId}` : ip;
  return createHmac('sha256', secret()).update(`vpn-ip:${value}`).digest('hex');
}

async function forward(sessionId: string, payload: Record<string, unknown>) {
  const base = (process.env.VPN_BACKEND_URL ?? 'https://bot.rpl-live.ru').replace(/\/$/, '');
  const response = await fetchWithTimeout(`${base}/api/site/vpn`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-vpn-site-secret': secret(),
    },
    body: JSON.stringify({ ...payload, sessionId }),
    cache: 'no-store',
  }, 10_000);
  const data = await response.json().catch(() => ({ error: 'bad_backend_response' }));
  return { data, status: response.status };
}

function withSession(
  data: unknown,
  status: number,
  session: { id: string; fresh: boolean },
) {
  const response = NextResponse.json(data, { status });
  if (session.fresh) {
    response.cookies.set(COOKIE, `${session.id}.${sign(session.id)}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    });
  }
  return response;
}

function withoutSession(data: unknown, status: number) {
  const response = NextResponse.json(data, { status });
  response.cookies.set(COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}

export async function GET(req: NextRequest) {
  const session = sessionFrom(req);
  try {
    const result = await forward(session.id, { action: 'home' });
    return withSession(result.data, result.status, session);
  } catch {
    return withSession({ error: 'vpn_backend_unavailable' }, 503, session);
  }
}
export async function POST(req: NextRequest) {
  if (!validOrigin(req)) {
    return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  }
  const session = sessionFrom(req);
  const body = await req.json().catch(() => null);
  const action = body?.action;
  if (!['trial', 'order', 'status', 'request_email_code', 'verify_email', 'logout'].includes(action)) {
    return withSession({ error: 'bad_action' }, 400, session);
  }
  const payload: Record<string, unknown> = { action };
  if (action === 'order') {
    payload.plan = body?.plan;
    payload.region = body?.region;
  }
  if (action === 'status') payload.orderId = body?.orderId;
  if (action === 'request_email_code' || action === 'verify_email') {
    payload.email = body?.email;
  }
  if (action === 'verify_email') payload.code = body?.code;
  if (action === 'trial' || action === 'request_email_code') {
    payload.ipHash = ipHash(req, session.id);
  }

  try {
    const result = await forward(session.id, payload);
    if (action === 'logout' && result.status < 400) {
      return withoutSession(result.data, result.status);
    }
    return withSession(result.data, result.status, session);
  } catch {
    return withSession({ error: 'vpn_backend_unavailable' }, 503, session);
  }
}

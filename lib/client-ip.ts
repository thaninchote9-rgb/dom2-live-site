import { isIP } from 'node:net';

export function clientIp(headers: Headers): string {
  const vercel = Boolean(process.env.VERCEL);
  const trustedProxy = process.env.TRUST_PROXY_HEADERS === '1';
  if (!vercel && !trustedProxy) return 'unknown';
  const forwarded = vercel ? headers.get('x-vercel-forwarded-for') : headers.get('x-forwarded-for') || headers.get('x-real-ip');
  const candidate = forwarded?.split(',')[0].trim();
  return candidate && isIP(candidate) ? candidate : 'unknown';
}

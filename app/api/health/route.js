export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    { ok: true, commit: process.env.VPS_COMMIT_SHA || 'unknown' },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

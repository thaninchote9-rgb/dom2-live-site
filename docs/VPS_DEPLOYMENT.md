# VPS runtime

Use the standalone Docker image built with existing locked dependencies. Set `VPN_BACKEND_URL` and `SITE_YOUTUBE_API_URL` to the private backend and configure the matching `VPN_SITE_SECRET` at runtime. Keep ports private behind the trusted proxy.

Set `TRUST_PROXY_HEADERS=1` only when that proxy replaces client-supplied forwarded IP headers. Outside Vercel the site ignores `x-vercel-forwarded-for`; this prevents an arbitrary header from overriding the IP used for VPN abuse limits.

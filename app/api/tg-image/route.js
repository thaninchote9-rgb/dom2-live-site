/**
 * Прокси картинок Telegram.
 * Ссылки cdn*.telesco.pe отдаются с токеном и не всегда доступны для
 * хотлинка, поэтому фото тянем через свой домен и кэшируем на CDN Vercel.
 */

export const runtime = "edge";

const ALLOWED_HOST = /(^|\.)(telesco\.pe|cdn-telegram\.org|telegram-cdn\.org)$/i;

export async function GET(request) {
  const raw = new URL(request.url).searchParams.get("u");
  if (!raw) return new Response("missing u", { status: 400 });

  let target;
  try {
    target = new URL(raw);
  } catch {
    return new Response("bad url", { status: 400 });
  }

  if (target.protocol !== "https:" || !ALLOWED_HOST.test(target.hostname)) {
    return new Response("forbidden host", { status: 403 });
  }

  let upstream;
  try {
    upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Referer: "https://t.me/",
      },
      cache: "force-cache",
    });
  } catch {
    return new Response("upstream error", { status: 502 });
  }

  if (!upstream.ok) return new Response("upstream error", { status: 502 });

  const type = upstream.headers.get("content-type") || "image/jpeg";
  if (!type.startsWith("image/")) {
    return new Response("not an image", { status: 415 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": type,
      // Картинка поста неизменна — держим её в кэше долго.
      "Cache-Control": "public, max-age=86400, s-maxage=2592000, immutable",
    },
  });
}

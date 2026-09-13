const CHANNEL_ID = "UClFahfjQFiYT8cYrd1bob-Q";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

export function parseYoutubeShorts(xml) {
  const shorts = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) && shorts.length < 10) {
    const entry = match[1];
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const shortUrl = entry.match(/<link\s+rel="alternate"\s+href="https:\/\/www\.youtube\.com\/shorts\/([^"?]+)[^"]*"\s*\/>/)?.[1];
    if (!videoId || shortUrl !== videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) continue;

    const title = decodeXml(entry.match(/<title>([^<]*)<\/title>/)?.[1]) || "Короткое видео";
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    const date = published
      ? new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(published))
      : "";
    shorts.push({ videoId, title, date });
  }

  return shorts;
}

export async function getYoutubeShorts() {
  try {
    const response = await fetch(RSS_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; dom2-live-site/1.0)" },
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`YouTube RSS returned ${response.status}`);
    return parseYoutubeShorts(await response.text());
  } catch (error) {
    console.error("Не удалось получить YouTube Shorts:", error);
    return [];
  }
}

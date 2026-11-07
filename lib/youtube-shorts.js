import { YOUTUBE_CHANNEL_ID, YOUTUBE_SHORTS_URL } from "./youtube-channel.js";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

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

// YouTube can return an empty RSS feed while the Shorts tab already has videos.
export function parseYoutubeShortsPage(html) {
  const json = html.match(/var ytInitialData\s*=\s*([\s\S]*?);<\/script>/)?.[1];
  if (!json) throw new Error("Не найдены данные страницы YouTube");
  const data = JSON.parse(json);
  const renderer = data.contents?.twoColumnBrowseResultsRenderer;
  if (!renderer) throw new Error("Не распознана страница канала YouTube");
  const tabs = renderer.tabs || [];
  const content = tabs.find(tab => tab.tabRenderer?.selected)?.tabRenderer?.content;
  if (!content) return [];
  const items = [];
  const seen = new Set();
  function visit(node) {
    if (!node || typeof node !== "object" || items.length >= 10) return;
    const short = node.shortsLockupViewModel;
    const legacy = node.reelItemRenderer;
    const videoId = short?.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId || legacy?.videoId;
    if (videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) && !seen.has(videoId)) {
      seen.add(videoId);
      const title = short?.overlayMetadata?.primaryText?.content || legacy?.headline?.simpleText || "Короткое видео";
      items.push({ videoId, title, date: "" });
    }
    for (const value of Object.values(node)) visit(value);
  }
  visit(content);
  return items;
}

export async function fetchYoutubeShorts(options = {}) {
  async function fetchText(url) {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; dom2-live-site/1.0)" },
      signal: AbortSignal.timeout(15000),
      ...options,
    });
    if (!response.ok) throw new Error(`YouTube returned ${response.status}`);
    return response.text();
  }
  try {
    const shorts = parseYoutubeShorts(await fetchText(RSS_URL));
    if (shorts.length) return shorts;
  } catch (error) {
    console.error("YouTube RSS недоступен, проверяю страницу Shorts:", error.message);
  }
  return parseYoutubeShortsPage(await fetchText(YOUTUBE_SHORTS_URL));
}

export async function getYoutubeShorts() {
  try {
    return await fetchYoutubeShorts({ next: { revalidate: 30 } });
  } catch (error) {
    console.error("Не удалось получить YouTube Shorts:", error);
    return null;
  }
}

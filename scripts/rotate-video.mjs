// Синхронизация публичных Shorts нового YouTube-канала.
// Главное видео управляется вручную через Photo Track Bot Vercel App.

import fs from "node:fs";

const CHANNEL_ID = "UClFahfjQFiYT8cYrd1bob-Q"; // @WardaYosry-g9d
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const MEDIA_JS = "lib/home-media.js";
const UA = "Mozilla/5.0 (compatible; dom2-live-shorts-bot/1.0)";

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": UA } });
  if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText} for ${url}`);
  return response.text();
}

function parseFeedEntries(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml))) {
    const block = match[1];
    const videoId = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (block.match(/<title>([^<]*)<\/title>/) || [])[1];
    const published = (block.match(/<published>([^<]+)<\/published>/) || [])[1];
    const shortId = (block.match(/<link\s+rel="alternate"\s+href="https:\/\/www\.youtube\.com\/shorts\/([^"?]+)[^"]*"\s*\/>/) || [])[1];
    if (videoId && shortId === videoId) entries.push({ videoId, title: title || "", published: published || "" });
  }
  return entries;
}

function formatPublishedDate(value) {
  const date = value ? new Date(value) : new Date();
  const msk = new Date(date.getTime() + 3 * 60 * 60 * 1000);
  return `${String(msk.getUTCDate()).padStart(2, "0")}.${String(msk.getUTCMonth() + 1).padStart(2, "0")}.${msk.getUTCFullYear()}`;
}

function replaceShorts(source, entries) {
  const items = entries.slice(0, 10).map((entry) => `  {
    title: ${JSON.stringify(entry.title || "Короткое видео")},
    date: "${formatPublishedDate(entry.published)}",
    videoId: "${entry.videoId}",
  },`).join("\n");
  const block = `export const shortVideoItems = [\n${items}${items ? "\n" : ""}];`;
  const marker = /export const shortVideoItems = \[[\s\S]*?\];/;
  if (!marker.test(source)) throw new Error("Не найден массив shortVideoItems");
  return source.replace(marker, block);
}

async function main() {
  console.log("Проверяю Shorts:", RSS_URL);
  const entries = parseFeedEntries(await fetchText(RSS_URL));
  if (!entries.length) {
    console.log("В публичном RSS пока нет видео. Ничего не меняем.");
    return;
  }

  const shorts = entries.slice(0, 10);

  const source = fs.readFileSync(MEDIA_JS, "utf8");
  const updated = replaceShorts(source, shorts);
  if (updated === source) {
    console.log("Список Shorts уже актуален.");
    return;
  }
  fs.writeFileSync(MEDIA_JS, updated, "utf8");
  console.log(`Синхронизировано Shorts: ${shorts.length}`);
}

main().catch((error) => {
  console.error("Ошибка синхронизации Shorts:", error);
  process.exit(1);
});

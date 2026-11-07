// Синхронизация публичных Shorts нового YouTube-канала.
// Главное видео управляется вручную через админку bot.rpl-live.ru.

import fs from "node:fs";

import { fetchYoutubeShorts } from "../lib/youtube-shorts.js";
import { YOUTUBE_SHORTS_URL } from "../lib/youtube-channel.js";
const MEDIA_JS = "lib/home-media.js";

function replaceShorts(source, entries) {
  const items = entries.slice(0, 10).map((entry) => `  {
    title: ${JSON.stringify(entry.title || "Короткое видео")},
    date: "${entry.date || ""}",
    videoId: "${entry.videoId}",
  },`).join("\n");
  const block = `export const shortVideoItems = [\n${items}${items ? "\n" : ""}];`;
  const marker = /export const shortVideoItems = \[[\s\S]*?\];/;
  if (!marker.test(source)) throw new Error("Не найден массив shortVideoItems");
  return source.replace(marker, block);
}

async function main() {
  console.log("Проверяю Shorts:", YOUTUBE_SHORTS_URL);
  const entries = await fetchYoutubeShorts();
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

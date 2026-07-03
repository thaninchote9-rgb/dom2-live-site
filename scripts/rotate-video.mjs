// scripts/rotate-video.mjs
//
// Автоматическая ротация главного видео на dom2-live.ru.
// Логика:
//  1. Берём RSS-фид YouTube-канала (без API-ключа).
//  2. Идём от новых видео к старым, пропускаем Shorts.
//  3. Как только находим самое новое видео, которое НЕ Shorts и НЕ совпадает
//     с текущим currentVideoId — это новый эфир/выпуск.
//  4. Старое currentVideoId уходит в архив (app/page.jsx и app/archive/page.jsx),
//     новое становится главным.
//
// Скрипт ничего не делает, если новых подходящих видео нет (в т.ч. если
// появились только Shorts) — тогда просто выходит без изменений.

import fs from "node:fs";

const CHANNEL_ID = "UC7bIm-PdxJKfbh-JqUqCYag"; // @EnzoCampbell3045 — Макс Брабус шоу стримы
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const PAGE_JSX = "app/page.jsx";
const ARCHIVE_JSX = "app/archive/page.jsx";

const UA = "Mozilla/5.0 (compatible; dom2-live-rotate-bot/1.0)";

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${url}`);
  }
  return res.text();
}

function parseFeedEntries(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRegex.exec(xml))) {
    const block = m[1];
    const videoId = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (block.match(/<title>([^<]*)<\/title>/) || [])[1];
    const published = (block.match(/<published>([^<]+)<\/published>/) || [])[1];
    if (videoId) entries.push({ videoId, title: title || "", published: published || "" });
  }
  return entries; // YouTube отдаёт от новых к старым
}

// Проверка Shorts без API-ключа: запрос на /shorts/<id>.
// Если это реальный Shorts — YouTube отдаёт страницу напрямую (200).
// Если это обычное видео/трансляция — редирект (30x) на /watch?v=<id>.
// При любой ошибке/непонятном ответе — считаем Shorts (безопасный дефолт,
// пропустим один цикл, на следующем прогоне (~15 мин) перепроверим).
async function isShort(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      redirect: "manual",
      headers: { "User-Agent": UA },
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location") || "";
      return !loc.includes(`v=${videoId}`);
    }
    if (res.status === 200) return true;
    console.warn(`Неожиданный статус ${res.status} при проверке shorts для ${videoId}, пропускаем на этот раз.`);
    return true;
  } catch (e) {
    console.warn(`Ошибка проверки shorts для ${videoId}: ${e.message}. Пропускаем на этот раз.`);
    return true;
  }
}

function readFile(p) {
  return fs.readFileSync(p, "utf8");
}
function writeFile(p, content) {
  fs.writeFileSync(p, content, "utf8");
}

function getCurrentVideoId(pageSrc) {
  const m = pageSrc.match(/currentVideoId:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// Дата в формате DD.MM (используется в архиве), по московскому времени.
function todayDDMM() {
  const now = new Date();
  const msk = new Date(now.getTime() + 3 * 60 * 60 * 1000); // UTC+3
  const dd = String(msk.getUTCDate()).padStart(2, "0");
  const mm = String(msk.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}`;
}

function buildArchiveBlock(videoId, dateStr) {
  return `  {
    date: "${dateStr}",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/${videoId}?feature=share",
    image: "https://img.youtube.com/vi/${videoId}/hqdefault.jpg",
    tag: "Архив",
  },
`;
}

function insertIntoArchiveArray(src, block) {
  const marker = /(const archiveItems = \[\r?\n)/;
  if (!marker.test(src)) {
    throw new Error("Не найден массив archiveItems — проверьте формат файла.");
  }
  return src.replace(marker, `$1${block}`);
}

async function main() {
  console.log("Проверяю RSS:", RSS_URL);
  const xml = await fetchText(RSS_URL);
  const entries = parseFeedEntries(xml);
  console.log(`Найдено записей в фиде: ${entries.length}`);

  if (entries.length === 0) {
    console.log("Фид пуст, выходим без изменений.");
    return;
  }

  const pageSrc = readFile(PAGE_JSX);
  const currentVideoId = getCurrentVideoId(pageSrc);
  console.log("Текущее видео на сайте:", currentVideoId);

  let target = null;
  for (const entry of entries) {
    if (entry.videoId === currentVideoId) {
      console.log(`Дошли до текущего видео (${currentVideoId}) в фиде, новых подходящих видео нет.`);
      break;
    }
    const short = await isShort(entry.videoId);
    console.log(`- ${entry.videoId} "${entry.title}" short=${short}`);
    if (!short) {
      target = entry;
      break;
    }
  }

  if (!target) {
    console.log("Новых видео (кроме Shorts) не найдено. Ничего не меняем.");
    return;
  }

  console.log(`Ротация: ${currentVideoId} -> ${target.videoId} ("${target.title}")`);

  const dateStr = todayDDMM();

  let newPageSrc = pageSrc.replace(
    /currentVideoId:\s*"[^"]+"/,
    `currentVideoId: "${target.videoId}"`
  );

  if (currentVideoId) {
    const archiveBlock = buildArchiveBlock(currentVideoId, dateStr);
    newPageSrc = insertIntoArchiveArray(newPageSrc, archiveBlock);
    writeFile(PAGE_JSX, newPageSrc);

    const archivePageSrc = readFile(ARCHIVE_JSX);
    const newArchivePageSrc = insertIntoArchiveArray(archivePageSrc, archiveBlock);
    writeFile(ARCHIVE_JSX, newArchivePageSrc);
  } else {
    writeFile(PAGE_JSX, newPageSrc);
  }

  console.log("Готово.");
}

main().catch((e) => {
  console.error("Ошибка скрипта ротации:", e);
  process.exit(1);
});

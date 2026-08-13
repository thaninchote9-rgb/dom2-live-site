// scripts/rotate-video.mjs
//
// Автоматическая ротация главного видео на dom2-live.ru.
// Логика:
//  1. Берём RSS-фид YouTube-канала (без API-ключа).
//  2. Синхронизируем блок Shorts на главной со свежими роликами из фида.
//  3. Идём от новых видео к старым. Как только находим самое новое видео,
//     которое НЕ Shorts и НЕ совпадает
//     с текущим currentVideoId — это новый эфир/выпуск.
//  4. Старое currentVideoId уходит в архив (app/page.jsx и app/archive/page.jsx),
//     новое становится главным.
//
// Если появился только Shorts, обновляется только блок коротких видео.

import fs from "node:fs";

const CHANNEL_ID = "UCm2K8OXusqgt4MmJoUL9Hfg"; // @dancedoll11 — Макс Брабус 23
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
    const watchPage = await fetchText(`https://www.youtube.com/watch?v=${videoId}`);
    const lengthSeconds = Number((watchPage.match(/"lengthSeconds":"(\d+)"/) || [])[1]);
    if (Number.isFinite(lengthSeconds) && lengthSeconds > 180) return false;

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

function formatPublishedDate(value) {
  const date = value ? new Date(value) : new Date();
  const msk = new Date(date.getTime() + 3 * 60 * 60 * 1000);
  const dd = String(msk.getUTCDate()).padStart(2, "0");
  const mm = String(msk.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${msk.getUTCFullYear()}`;
}

function replaceShortVideoItems(src, entries) {
  const items = entries.slice(0, 6).map((entry) => `  {
    title: ${JSON.stringify(entry.title || "Короткое видео Max Brabus")},
    date: "${formatPublishedDate(entry.published)}",
    videoId: "${entry.videoId}",
  },`).join("\n");
  const block = `const shortVideoItems = [\n${items}${items ? "\n" : ""}];`;
  const marker = /const shortVideoItems = \[[\s\S]*?\];/;
  if (!marker.test(src)) {
    throw new Error("Не найден массив shortVideoItems — проверьте формат файла.");
  }
  return src.replace(marker, block);
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

  const classified = [];
  for (const entry of entries) {
    const short = await isShort(entry.videoId);
    classified.push({ ...entry, short });
    console.log(`- ${entry.videoId} "${entry.title}" short=${short}`);
  }

  let newPageSrc = replaceShortVideoItems(
    pageSrc,
    classified.filter((entry) => entry.short),
  );

  let target = null;
  for (const entry of classified) {
    if (entry.videoId === currentVideoId) {
      console.log(`Дошли до текущего видео (${currentVideoId}) в фиде, новых подходящих видео нет.`);
      break;
    }
    if (!entry.short) {
      target = entry;
      break;
    }
  }

  if (!target) {
    if (newPageSrc !== pageSrc) {
      writeFile(PAGE_JSX, newPageSrc);
      console.log("Блок Shorts синхронизирован. Нового основного видео нет.");
    } else {
      console.log("Новых видео и изменений в Shorts нет. Ничего не меняем.");
    }
    return;
  }

  console.log(`Ротация: ${currentVideoId} -> ${target.videoId} ("${target.title}")`);

  const dateStr = todayDDMM();

  newPageSrc = newPageSrc.replace(
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

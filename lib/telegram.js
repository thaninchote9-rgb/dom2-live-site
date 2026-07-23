/**
 * Парсер публичных превью Telegram-каналов (t.me/s/<channel>).
 *
 * Правила отбора поста:
 *  1. В посте есть ФОТО и НЕТ видео/кружка/документа/гифки.
 *  2. Рекламные посты отсекаются: внешние ссылки, erid, tglink.io,
 *     telega.in, промо-лексика.
 *  3. Служебные хвосты каналов («Мы в МАХ», «Больше новостей в МАХ»,
 *     «Please open Telegram…», ссылки на сам канал) вырезаются из текста,
 *     сам пост при этом остаётся.
 *  4. После чистки должен остаться осмысленный текст, иначе пост пропускаем.
 */

export const CHANNELS = [
  { key: "c1", username: "dom2_news2", title: "ДОМ 2 • Новости звёзд" },
  { key: "c2", username: "dom2_tv_news", title: "Дом 2 Новости" },
  { key: "c3", username: "dom_2_zvezdy", title: "ДОМ 2 Горячий Дом 2" },
];

export const POSTS_PER_CHANNEL_PER_DAY = 2;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/* ------------------------------------------------------------------ */
/* HTML helpers                                                        */
/* ------------------------------------------------------------------ */

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  laquo: "«", raquo: "»", mdash: "—", ndash: "–", hellip: "…", shy: "",
};

function decodeEntities(str) {
  return str
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => safeCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, name) => {
      const v = ENTITIES[name.toLowerCase()];
      return v === undefined ? m : v;
    });
}

function safeCodePoint(code) {
  try {
    return String.fromCodePoint(code);
  } catch {
    return "";
  }
}

/** Достаёт содержимое блока с учётом вложенных <div>. */
function extractBlock(html, startIdx) {
  const open = html.indexOf(">", startIdx);
  if (open === -1) return "";
  let depth = 1;
  const re = /<\/?div\b/gi;
  re.lastIndex = open + 1;
  let m;
  while ((m = re.exec(html))) {
    if (m[0][1] === "/") {
      depth -= 1;
      if (depth === 0) return html.slice(open + 1, m.index);
    } else {
      depth += 1;
    }
  }
  return html.slice(open + 1);
}

/* ------------------------------------------------------------------ */
/* Фильтры                                                             */
/* ------------------------------------------------------------------ */

/** Медиа, при наличии которых пост не берём (нужно только фото). */
const REJECT_MEDIA = [
  "tgme_widget_message_video_player",
  "tgme_widget_message_video_wrap",
  "tgme_widget_message_video ",
  "tgme_widget_message_roundvideo",
  "tgme_widget_message_voice",
  "tgme_widget_message_audio",
  "tgme_widget_message_document",
  "tgme_widget_message_poll",
  "tgme_widget_message_sticker",
  "tgme_widget_message_location",
  "message_media_not_supported",
];

/** Домены и маркеры однозначной рекламы — пост выкидываем целиком. */
const AD_MARKERS = [
  "tglink.io", "telega.in", "erid", "utm_source", "utm_campaign",
  "yandex.direct", "vk.cc", "bit.ly", "clck.ru",
];

const AD_PHRASES = [
  "реклама", "рекламодател", "промокод", "скидк", "по промокоду",
  "успей купить", "закажи", "оформи заказ", "переходи по ссылке",
  "регистрация в ркн", "купить рекламу", "интернет-магазин",
  "маркетплейс", "кэшбэк", "кешбэк", "бесплатная доставка",
  "оставь заявку", "запишись", "подпишись на канал и",
];

/**
 * Хосты служебных приписок самих каналов («Мы в МАХ», ссылка на свой
 * же телеграм). Это НЕ реклама: строки вырежем, а пост опубликуем.
 */
const SERVICE_HOSTS = [
  "t.me", "telegram.me", "telegram.org", "max.ru",
];

/** Служебные строки — вырезаем, но пост оставляем. */
const SERVICE_LINE_PATTERNS = [
  /please open telegram to view this post/i,
  /view in telegram/i,
  /max\.ru/i,
  /\bв\s*мах\b/i,
  /больше новостей/i,
  /всем перейти/i,
  /мы в мах/i,
  /^телеграмм?$/i,
  /^подписаться$/i,
  /^источник$/i,
  /наш канал/i,
  /^\s*\|\s*$/,
];

/** Строка состоит только из эмодзи, пунктуации и разделителей. */
function isDecorativeLine(line) {
  const stripped = line.replace(
    /[\p{Extended_Pictographic}\p{Emoji_Component}️‍\s|•·—–\-_=+*#>]/gu,
    ""
  );
  return stripped.length === 0;
}

/* ------------------------------------------------------------------ */
/* Разбор одного сообщения                                             */
/* ------------------------------------------------------------------ */

function parseMessage(block, channel) {
  const idMatch = block.match(/data-post="[^"\/]+\/(\d+)"/);
  if (!idMatch) return null;
  const postId = Number(idMatch[1]);

  if (REJECT_MEDIA.some((cls) => block.includes(cls))) return null;

  const photos = [];
  const photoRe =
    /tgme_widget_message_photo_wrap[^>]*background-image:\s*url\(['"]?([^'")]+)['"]?\)/gi;
  let pm;
  while ((pm = photoRe.exec(block))) photos.push(decodeEntities(pm[1]));
  if (photos.length === 0) return null;

  const timeMatch = block.match(/<time[^>]*datetime="([^"]+)"/);
  if (!timeMatch) return null;
  const publishedAt = timeMatch[1];

  const textIdx = block.search(/<div class="tgme_widget_message_text\b/);
  if (textIdx === -1) return null;
  const textHtml = extractBlock(block, textIdx);

  const parsed = cleanText(textHtml);
  if (!parsed) return null;

  return {
    channelKey: channel.key,
    channelUsername: channel.username,
    channelTitle: channel.title,
    postId,
    postUrl: `https://t.me/${channel.username}/${postId}`,
    image: photos[0],
    publishedAt,
    title: parsed.title,
    lead: parsed.lead,
    paragraphs: parsed.paragraphs,
  };
}

function cleanText(textHtml) {
  const boldMatch = textHtml.match(/<b>([\s\S]*?)<\/b>/i);
  const boldRaw = boldMatch ? htmlToPlain(boldMatch[1]) : "";

  const hrefs = [];
  const hrefRe = /<a\b[^>]*href="([^"]+)"/gi;
  let hm;
  while ((hm = hrefRe.exec(textHtml))) hrefs.push(decodeEntities(hm[1]));

  const plain = htmlToPlain(textHtml);
  const lowerAll = plain.toLowerCase();

  const allText = (plain + " " + hrefs.join(" ")).toLowerCase();
  if (AD_MARKERS.some((m) => allText.includes(m))) return null;
  if (AD_PHRASES.some((p) => lowerAll.includes(p))) return null;

  const hasExternal = hrefs.some((h) => {
    try {
      const host = new URL(h, "https://t.me").hostname.replace(/^www\./, "");
      return !SERVICE_HOSTS.includes(host);
    } catch {
      return true;
    }
  });
  if (hasExternal) return null;

  const lines = plain
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((l) => !SERVICE_LINE_PATTERNS.some((re) => re.test(l)))
    .filter((l) => !isDecorativeLine(l))
    .map(stripEmoji)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  let title;
  let body;
  const boldClean = stripEmoji(boldRaw).replace(/\s+/g, " ").trim();

  if (boldClean.length >= 20 && boldClean.length <= 160) {
    title = boldClean;
    body = lines.filter((l) => l !== boldClean);
  } else {
    title = makeTitle(lines[0]);
    body = lines[0].length > title.length + 5 ? lines : lines.slice(1);
  }

  title = title.replace(/[\s.,;:!?—–-]+$/, "").trim();
  if (title.length < 12) return null;

  const paragraphs = body.filter((l) => l.length > 1);
  const lead = paragraphs.join(" ").trim() || title;

  if (title.length < 20 && paragraphs.length === 0) return null;

  return { title, lead, paragraphs };
}

function htmlToPlain(html) {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|blockquote)>/gi, "\n")
      .replace(/<[^>]+>/g, "")
  ).replace(/ /g, " ");
}

function stripEmoji(str) {
  return str
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Первое предложение как заголовок, максимум ~110 символов. */
function makeTitle(line) {
  const sentence = line.split(/(?<=[.!?])\s+/)[0] || line;
  if (sentence.length <= 110) return sentence;
  const cut = sentence.slice(0, 110);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + "…";
}

/* ------------------------------------------------------------------ */
/* Загрузка канала                                                     */
/* ------------------------------------------------------------------ */

async function fetchPage(username, before) {
  const url = before
    ? `https://t.me/s/${username}?before=${before}`
    : `https://t.me/s/${username}`;
  const res = await fetch(url, {
    headers: { "User-Agent": UA, "Accept-Language": "ru,en;q=0.8" },
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`t.me ${username} HTTP ${res.status}`);
  return res.text();
}

function splitMessages(html) {
  return html
    .split(/(?=<div class="tgme_widget_message_wrap)/)
    .filter((b) => b.includes("tgme_widget_message_wrap"));
}

export async function fetchChannelPosts(channel, { limit = 10, maxPages = 4 } = {}) {
  const out = [];
  const seen = new Set();
  let before;

  for (let page = 0; page < maxPages && out.length < limit; page += 1) {
    let html;
    try {
      html = await fetchPage(channel.username, before);
    } catch {
      break;
    }

    const blocks = splitMessages(html);
    if (blocks.length === 0) break;

    let oldestId = null;
    for (const block of blocks) {
      const idMatch = block.match(/data-post="[^"\/]+\/(\d+)"/);
      if (idMatch) {
        const n = Number(idMatch[1]);
        if (oldestId === null || n < oldestId) oldestId = n;
      }
      const post = parseMessage(block, channel);
      if (post && !seen.has(post.postId)) {
        seen.add(post.postId);
        out.push(post);
      }
    }

    if (oldestId === null) break;
    before = oldestId;
  }

  return out.sort((a, b) => b.postId - a.postId);
}

/** Не больше N постов в календарный день (по МСК). */
function limitPerDay(posts, perDay) {
  const byDay = new Map();
  const kept = [];
  for (const post of posts) {
    const day = new Date(post.publishedAt).toLocaleDateString("ru-RU", {
      timeZone: "Europe/Moscow",
    });
    const used = byDay.get(day) || 0;
    if (used >= perDay) continue;
    byDay.set(day, used + 1);
    kept.push(post);
  }
  return kept;
}

export async function getTelegramNews({ perChannel = 12 } = {}) {
  const results = await Promise.all(
    CHANNELS.map(async (channel) => {
      try {
        const posts = await fetchChannelPosts(channel, { limit: perChannel * 2 });
        return limitPerDay(posts, POSTS_PER_CHANNEL_PER_DAY).slice(0, perChannel);
      } catch {
        return [];
      }
    })
  );

  const byChannel = {};
  CHANNELS.forEach((c, i) => {
    byChannel[c.key] = results[i].map(toNewsItem);
  });

  const all = Object.values(byChannel)
    .flat()
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return { byChannel, all };
}

/** Находит один конкретный пост (для страницы-статьи). */
export async function getTelegramPost(channelKey, postId) {
  const channel = CHANNELS.find((c) => c.key === channelKey);
  if (!channel) return null;

  const id = Number(postId);
  if (!Number.isFinite(id)) return null;

  for (const before of [id + 1, id + 6, id + 21]) {
    let html;
    try {
      html = await fetchPage(channel.username, before);
    } catch {
      return null;
    }
    for (const block of splitMessages(html)) {
      if (!block.includes(`data-post="${channel.username}/${id}"`)) continue;
      const post = parseMessage(block, channel);
      return post ? toNewsItem(post) : null;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Превращение поста в новость сайта                                   */
/* ------------------------------------------------------------------ */

const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh",
  щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function translit(str) {
  return str
    .toLowerCase()
    .split("")
    .map((ch) => (TRANSLIT[ch] !== undefined ? TRANSLIT[ch] : ch))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .filter(Boolean)
    .slice(0, 8)
    .join("-");
}

function guessTag(text) {
  const t = text.toLowerCase();
  if (/(развод|расстал|измен|ссор|скандал|конфликт|унижен|наехал)/.test(t)) return "Скандал";
  if (/(отношени|свидани|роман|влюб|поцелу|пара|женит|свадьб|помолв)/.test(t)) return "Отношения";
  if (/(беремен|родила|дочь|сын|ребён|ребен|семь|мама|папа)/.test(t)) return "Семья";
  if (/(конкурс|победа|итоги|голосован|номинаци)/.test(t)) return "Конкурс";
  if (/(считает|призналась|признался|рассказал|мнение|заявил)/.test(t)) return "Мнение";
  if (/(обсужда|зрители|подписчик|спорят)/.test(t)) return "Обсуждения";
  return "Участники";
}

const ARTICLE_OVERRIDES = {
  "c1-19703": {
    text: "В социальных сетях обсуждают ролик, который пользователи приписывают фитнес-блогеру Андрею Смаеву. Достоверных подтверждений подлинности записи и обстоятельств её появления на момент публикации нет.",
    paragraphs: [
      "В социальных сетях обсуждают ролик, который пользователи приписывают фитнес-блогеру Андрею Смаеву. Достоверных подтверждений подлинности записи и обстоятельств её появления на момент публикации нет.",
      "В тематических сообществах высказываются разные версии — от утечки личных материалов до возможного использования нейросетей для создания подделки. Ни одна из этих версий официально не подтверждена.",
      "Публичного комментария от самого блогера или его представителей на момент публикации не было. Редакция не публикует и не распространяет материалы интимного характера.",
      "Просим не делать поспешных выводов: если появится проверенная информация или официальный комментарий, этот материал будет дополнен."
    ],
  },
};

function toNewsItem(post) {
  const base = translit(post.title) || "novost";
  const slug = `${base}-${post.channelKey}-${post.postId}`;
  const date = new Date(post.publishedAt);

  const item = {
    source: "telegram",
    slug,
    href: `/news/${slug}`,
    channelKey: post.channelKey,
    channelUsername: post.channelUsername,
    channelTitle: post.channelTitle,
    postId: post.postId,
    postUrl: post.postUrl,
    publishedAt: post.publishedAt,
    date: date.toLocaleDateString("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    image: proxyImage(post.image),
    rawImage: post.image,
    title: post.title,
    text: post.lead,
    paragraphs: post.paragraphs.length ? post.paragraphs : [post.lead],
    tag: guessTag(post.title + " " + post.lead),
  };

  return { ...item, ...(ARTICLE_OVERRIDES[`${post.channelKey}-${post.postId}`] || {}) };
}

/** Картинки Telegram отдаём через свой прокси: токены в CDN-ссылках протухают. */
export function proxyImage(url) {
  return `/api/tg-image?u=${encodeURIComponent(url)}`;
}

/** Разбирает slug вида "zagolovok-c1-19597". */
export function parseSlug(slug) {
  const m = /-(c[123])-(\d+)$/.exec(slug || "");
  if (!m) return null;
  return { channelKey: m[1], postId: Number(m[2]) };
}

/**
 * Единый источник новостей для сайта:
 * свежие из Telegram-каналов + старые ручные новости.
 */

import { getTelegramNews, CHANNELS, translit } from "./telegram.js";
import { manualNews } from "./manual-news.js";

function manualSlug(item) {
  const fromHref = (item.href || "").replace(/^\/news\//, "");
  return fromHref && fromHref !== "/news" ? fromHref : `manual-${translit(item.title || "novost")}`;
}

/** Ручные новости приводим к тому же виду, что и телеграмные. */
function normalizeManual(item) {
  const slug = manualSlug(item);
  return {
    source: "manual",
    slug,
    href: `/news/${slug}`,
    date: item.date,
    publishedAt: toIso(item.date),
    image: item.image,
    title: item.title,
    text: item.text,
    paragraphs: [item.text],
    tag: item.tag,
  };
}

function toIso(ddmmyyyy) {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(ddmmyyyy || "");
  if (!m) return new Date(0).toISOString();
  return new Date(`${m[3]}-${m[2]}-${m[1]}T12:00:00+03:00`).toISOString();
}

/** Лента новостей. Сначала свежее из Telegram, затем ручной архив. */
export async function getNews() {
  let byChannel = {};
  let telegram = [];

  try {
    const tg = await getTelegramNews({ perChannel: 12 });
    byChannel = tg.byChannel;
    telegram = tg.all;
  } catch {
    CHANNELS.forEach((c) => {
      byChannel[c.key] = [];
    });
  }

  const manual = manualNews.map(normalizeManual);
  return { byChannel, telegram, manual, all: [...telegram, ...manual] };
}

/** Три карточки для главной: по одной свежей с каждого канала. */
export function pickHomeCards({ byChannel, all }) {
  const cards = [];
  const used = new Set();

  for (const channel of CHANNELS) {
    const first = (byChannel[channel.key] || [])[0];
    if (first) {
      cards.push(first);
      used.add(first.slug);
    }
  }

  for (const item of all) {
    if (cards.length >= 3) break;
    if (used.has(item.slug)) continue;
    cards.push(item);
    used.add(item.slug);
  }

  return cards.slice(0, 3);
}

/** Находит ручную статью по slug, включая старые записи без отдельного URL. */
export function findManual(slug) {
  return manualNews.map(normalizeManual).find((item) => item.slug === slug) || null;
}

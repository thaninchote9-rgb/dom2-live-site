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
  const all = [...telegram, ...manual].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  return { byChannel, telegram, manual, all };
}

/**
 * Главная страница: единая лента из авто- и ручных новостей.
 * Показываем только 12 самых свежих; старые остаются в разделе /news.
 */
export function pickHomeCards({ all }) {
  return all.slice(0, 12);
}

/** Находит ручную статью по slug, включая старые записи без отдельного URL. */
export function findManual(slug) {
  return manualNews.map(normalizeManual).find((item) => item.slug === slug) || null;
}

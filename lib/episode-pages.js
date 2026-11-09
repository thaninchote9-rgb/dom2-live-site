import { cache } from "react";
import { formatAdminVideo, getSiteVideos } from "./site-videos.js";

export const siteOrigin = "https://dom2-live.ru";
export const todayPath = "/dom-2-segodnyashniy-vypusk";

export const getEpisodeFeed = cache(async () => {
  const { current, recent } = await getSiteVideos();
  const seen = new Set();
  const episodes = [current, ...recent].filter((item) => {
    if (!item || seen.has(item.videoId)) return false;
    seen.add(item.videoId);
    return true;
  }).map(formatAdminVideo);
  return { current: episodes[0] ?? null, episodes };
});

export function moscowDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Moscow",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function todayEpisodeInfo(episode, now = new Date()) {
  const isToday = Boolean(episode?.episodeDate && episode.episodeDate === moscowDate(now));
  const title = isToday
    ? `Дом 2 сегодняшний выпуск от ${episode.date} — смотреть онлайн бесплатно`
    : "Дом 2 сегодняшний выпуск — смотреть онлайн бесплатно";
  const description = isToday
    ? `Смотри сегодняшний выпуск Дома-2 от ${episode.date} бесплатно в плеере. Предыдущие выпуски собраны в архиве.`
    : episode?.episodeDate
      ? `Смотри последний доступный выпуск Дома-2 от ${episode.date} бесплатно. Новый выпуск появится здесь после публикации.`
      : "Смотри выпуски Дома-2 бесплатно. Новый выпуск появится на этой странице после публикации.";
  return { isToday, title, description };
}

const SITE_YOUTUBE_API = process.env.SITE_YOUTUBE_API_URL || 'https://bot.rpl-live.ru/api/site-youtube';

function validVideo(item) {
  return item && typeof item.videoId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(item.videoId);
}

export async function getSiteVideos() {
  try {
    const response = await fetch(SITE_YOUTUBE_API, { next: { revalidate: 30 }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`YouTube admin API returned ${response.status}`);
    const data = await response.json();
    return {
      current: validVideo(data.current) ? data.current : null,
      recent: Array.isArray(data.recent) ? data.recent.filter(validVideo).slice(0, 3) : [],
    };
  } catch (error) {
    console.error('Не удалось получить видео из админки:', error);
    return { current: null, recent: [] };
  }
}

export function formatAdminVideo(item) {
  const dateSource = typeof item.episodeDate === 'string'
    ? item.episodeDate.match(/^\d{4}-\d{2}-\d{2}(?=T|$)/)?.[0]
    : null;
  const parsedDate = dateSource ? new Date(dateSource) : null;
  const episodeDate = parsedDate && Number.isFinite(parsedDate.valueOf())
    && parsedDate.toISOString().slice(0, 10) === dateSource ? dateSource : null;
  const date = episodeDate ? episodeDate.split('-').reverse().join('.') : null;
  const addedAt = item.addedAt ? new Date(item.addedAt) : null;

  return {
    videoId: item.videoId,
    episodeDate,
    date,
    addedAt: addedAt && Number.isFinite(addedAt.valueOf()) ? addedAt.toISOString() : null,
    title: date ? `Дом 2 — выпуск от ${date}` : 'Дом 2 — запись эфира',
    videoUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
    image: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
  };
}

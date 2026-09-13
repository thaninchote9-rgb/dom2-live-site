const SITE_YOUTUBE_API = process.env.SITE_YOUTUBE_API_URL || 'https://photo-track-bot.vercel.app/api/site-youtube';

function validVideo(item) {
  return item && typeof item.videoId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(item.videoId);
}

export async function getSiteVideos() {
  try {
    const response = await fetch(SITE_YOUTUBE_API, { next: { revalidate: 30 } });
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
  const dateSource = item.episodeDate || item.addedAt;
  const date = dateSource
    ? new Intl.DateTimeFormat('ru-RU', { timeZone: item.episodeDate ? 'UTC' : 'Europe/Moscow', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateSource))
    : 'Ранее';
  return {
    videoId: item.videoId,
    date,
    title: item.title || 'Дом-2. Выпуск',
    videoUrl: item.url || `https://www.youtube.com/watch?v=${item.videoId}`,
    image: item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
  };
}

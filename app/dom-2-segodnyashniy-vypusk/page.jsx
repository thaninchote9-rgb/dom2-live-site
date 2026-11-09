import { getEpisodeFeed, siteOrigin, todayEpisodeInfo, todayPath } from "../../lib/episode-pages.js";

export const revalidate = 0;

export async function generateMetadata() {
  const { current } = await getEpisodeFeed();
  const { title, description } = todayEpisodeInfo(current);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: todayPath },
    openGraph: {
      title, description, url: `${siteOrigin}${todayPath}`, type: "website",
      images: [current?.image || "/og-cover.jpg"],
    },
    twitter: { card: "summary_large_image", title, description, images: [current?.image || "/og-cover.jpg"] },
  };
}

export default async function TodayEpisodePage() {
  const { current, episodes } = await getEpisodeFeed();
  const { isToday } = todayEpisodeInfo(current);
  const embedUrl = current ? `https://www.youtube.com/embed/${current.videoId}?rel=0` : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        <nav aria-label="Разделы сайта" className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-700">
          <a className="hover:underline" href="/">Дом 2 Live</a>
          <a className="hover:underline" href="/archive">Все выпуски</a>
          <a className="hover:underline" href="/news">Новости</a>
        </nav>
        <h1 className="mb-3 text-3xl font-black leading-tight sm:text-5xl">
          Дом 2 — сегодняшний выпуск{isToday && <> от <time dateTime={current.episodeDate}>{current.date}</time></>}
        </h1>
        {current ? (
          <>
            <p className="mb-5 text-base text-slate-700">
              {isToday ? "Смотри выпуск онлайн бесплатно." : (
                <>Сегодняшний выпуск пока не опубликован. Смотри последний доступный выпуск{current.episodeDate && <> от <time dateTime={current.episodeDate}>{current.date}</time></>}.</>
              )}
            </p>
            <iframe
              className="aspect-video w-full rounded-2xl bg-black"
              src={embedUrl}
              title={current.episodeDate ? `Дом 2 — выпуск от ${current.date}` : "Дом 2 — последний доступный выпуск"}
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
            <a className="mt-4 inline-block text-sm font-bold text-slate-700 underline" href={current.videoUrl} target="_blank" rel="noreferrer">Открыть выпуск на YouTube ↗</a>
          </>
        ) : (
          <p className="mb-5 text-slate-700">Видео пока недоступно. Предыдущие эфиры можно найти в архиве.</p>
        )}
        <section className="mt-10 border-t border-slate-200 pt-6" aria-labelledby="previous-episodes">
          <h2 id="previous-episodes" className="mb-4 text-2xl font-black">Предыдущие выпуски Дом 2</h2>
          {episodes.length > 1 && <ul className="mb-5 grid gap-3 sm:grid-cols-3">
            {episodes.slice(1).map((episode) => (
              <li key={episode.videoId}>
                <a className="block rounded-xl bg-white p-4 font-bold shadow-sm hover:underline" href={episode.videoUrl} target="_blank" rel="noreferrer">
                  {episode.episodeDate ? <>Выпуск от <time dateTime={episode.episodeDate}>{episode.date}</time></> : episode.title} ↗
                </a>
              </li>
            ))}
          </ul>}
          <a className="font-bold text-sky-800 underline" href="/archive">Все свежие выпуски и архив</a>
        </section>
      </div>
    </main>
  );
}

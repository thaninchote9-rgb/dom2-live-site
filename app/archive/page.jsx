import { getEpisodeFeed } from "../../lib/episode-pages.js";
import { archiveItems, siteConfig } from "../../lib/home-media.js";

export const revalidate = 0;

export const metadata = {
  title: "Дом 2: свежие выпуски и архив по датам",
  description: "Свежие выпуски и архив Дома-2 по датам. Выбери серию и смотри запись онлайн бесплатно.",
  alternates: {
    canonical: "https://dom2-live.ru/archive",
  },
};

export default async function ArchivePage() {
  const { episodes } = await getEpisodeFeed();
  const seen = new Set();
  const items = [...episodes, ...archiveItems].filter((item) => {
    const key = item.videoId || item.videoUrl.match(/live\/([A-Za-z0-9_-]{11})/)?.[1] || item.videoUrl;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(219,234,254,0.95),transparent_34%),radial-gradient(circle_at_top_right,rgba(243,232,255,0.90),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(224,242,254,0.92),transparent_38%),linear-gradient(135deg,#eef6ff_0%,#f8fbff_48%,#f4efff_100%)] text-slate-950">
      <div className="fixed inset-0 bg-white/10" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/65 bg-white/86 shadow-lg backdrop-blur-3xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/80 text-xl shadow-lg backdrop-blur-xl">▶️</span>
            <span>
              <span className="block text-lg font-black leading-5 text-slate-950">Дом 2 Live</span>
              <span className="block text-xs font-bold text-slate-600">стримы • эфиры • архив</span>
            </span>
          </a>

          <nav className="hidden rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-500 p-[2px] shadow-[0_0_26px_rgba(56,189,248,0.45),0_0_38px_rgba(139,92,246,0.28)] md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/64 px-3 py-2 text-sm font-black text-slate-900 backdrop-blur-2xl">
              <a href="/dom-2-segodnyashniy-vypusk" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-sky-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-sky-700 hover:shadow-[0_0_18px_rgba(56,189,248,0.45)]">Смотреть эфир</a>
              <a href="/archive" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-cyan-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-cyan-700 hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-violet-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-violet-700 hover:shadow-[0_0_18px_rgba(139,92,246,0.45)]">Новости</a>
              <a href="/#about" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-fuchsia-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-fuchsia-700 hover:shadow-[0_0_18px_rgba(217,70,239,0.42)]">О проекте</a>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-black text-slate-800/90 drop-shadow-sm sm:inline">Подписывайтесь на</span>
            <a href="https://www.youtube.com/@MaxBrabusRPL" target="_blank" rel="noreferrer" className="rounded-full border border-red-500/50 bg-white/84 px-4 py-2 text-sm font-black text-red-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-red-500/80 hover:bg-red-50/90 hover:text-red-700">
              YouTube
            </a>
            <a href={siteConfig.telegramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-sky-500/55 bg-white/84 px-4 py-2 text-sm font-black text-sky-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-500/85 hover:bg-sky-50/90 hover:text-sky-700">
              Telegram
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pb-14 md:pt-32">
        <a href="/" className="mb-6 inline-flex rounded-full border border-white/80 bg-white/86 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← На главную</a>

        <section className="mb-7 rounded-[2rem] border border-white/80 bg-white/86 p-7 shadow-[0_24px_90px_rgba(15,23,42,0.38)] backdrop-blur-3xl md:p-10">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-700">архив выпусков</div>
          <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-6xl">Дом 2: свежие выпуски и архив</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-800">Выбери выпуск по дате и смотри запись бесплатно. Самые новые выпуски идут первыми.</p>
          <a href="/dom-2-segodnyashniy-vypusk" className="mt-4 inline-block font-bold text-sky-800 underline">Сегодняшний выпуск</a>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <a key={`${item.date}-${item.videoUrl}`} href={item.videoUrl} target={item.videoUrl === "#" ? undefined : "_blank"} rel={item.videoUrl === "#" ? undefined : "noreferrer"} className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/86 p-4 shadow-xl backdrop-blur-3xl transition hover:-translate-y-1 hover:bg-white/86">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-lg">
                <img loading="lazy" src={item.image} alt={item.title} className="aspect-video w-full object-cover object-center transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/10">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-xl">▶</span>
                </div>
                <div className="absolute left-4 top-4 rounded-full bg-white/86 px-4 py-2 text-sm font-black text-slate-800 shadow-lg backdrop-blur-xl">{item.episodeDate ? <time dateTime={item.episodeDate}>{item.date}</time> : (item.date || "Запись")}</div>
                <div className="absolute right-4 top-4 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg">{item.tag || "Выпуск"}</div>
              </div>
              <div className="p-3">
                <h2 className="mb-2 text-2xl font-black leading-snug text-slate-950">{item.title}</h2>
                <p className="text-sm leading-6 text-slate-800">Открыть выпуск или архивный эфир Дом 2.</p>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}

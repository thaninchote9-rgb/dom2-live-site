export const metadata = {
  title: "Смотреть выпуски Дома-2 онлайн бесплатно",
  description:
    "Где смотреть свежие выпуски Дома-2 онлайн бесплатно: каждый день в 18:00 по Москве на YouTube-канале и в Telegram-канале Max Brabus.",
  alternates: {
    canonical: "https://dom2-live.ru/news/dom-2-vypuski-online-besplatno",
  },
  openGraph: {
    title: "Смотреть выпуски Дома-2 онлайн бесплатно",
    description:
      "Свежие выпуски Дома-2, стримы, обсуждения, споры и прямой эфир каждый день в 18:00 по Москве.",
    url: "https://dom2-live.ru/news/dom-2-vypuski-online-besplatno",
    siteName: "Дом 2 Live",
    locale: "ru_RU",
    type: "article",
    images: ["/news/news-dom2-online-free.jpg"],
  },
};

const youtubeUrl = "https://www.youtube.com/@ThomasKing4771";
const telegramUrl = "https://t.me/maxbrabusstrim";

export default function NewsArticlePage() {
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
              <a href="/#watch" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-sky-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95">Смотреть эфир</a>
              <a href="/archive" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-cyan-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-violet-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95">Новости</a>
              <a href="/#about" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-fuchsia-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95">О проекте</a>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <a href={youtubeUrl} target="_blank" rel="noreferrer" className="rounded-full border border-red-500/50 bg-white/84 px-4 py-2 text-sm font-black text-red-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-red-50/90">YouTube</a>
            <a href={telegramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-sky-500/55 bg-white/84 px-4 py-2 text-sm font-black text-sky-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-sky-50/90">Telegram</a>
          </div>
        </div>
      </header>

      <article className="relative z-10 mx-auto max-w-5xl px-4 pb-12 pt-28 md:px-6 md:pt-32">
        <div className="mb-5">
          <a href="/news" className="inline-flex rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-black text-slate-800 shadow-md backdrop-blur-xl transition hover:bg-white">
            ← Все новости
          </a>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 shadow-[0_24px_90px_rgba(15,23,42,0.25)] backdrop-blur-3xl">
          <div className="relative">
            <img
              src="/news/news-dom2-online-free.jpg"
              alt="Смотреть выпуски Дома-2 онлайн бесплатно"
              className="aspect-[16/9] w-full object-cover object-center"
            />
            <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/88 px-4 py-2 text-sm font-black text-slate-800 shadow-lg backdrop-blur-xl">
              Эфиры
            </div>
            <div className="absolute right-4 top-4 rounded-full border border-white/80 bg-slate-950/85 px-4 py-2 text-sm font-black text-white shadow-lg backdrop-blur-xl">
              04.06.2026
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-700">
              Дом 2 Live • Max Brabus
            </div>

            <h1 className="mb-5 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Смотреть выпуски Дома-2 онлайн бесплатно
            </h1>

            <p className="text-lg leading-8 text-slate-800 md:text-xl md:leading-9">
              Все, кто ищет свежие выпуски Дома-2 и хочет смотреть их онлайн бесплатно из любой точки мира, могут делать это каждый день без выходных в 18:00 по Москве на YouTube-канале и в Telegram-канале Max Brabus.
            </p>

            <div className="my-8 rounded-[1.6rem] border border-sky-200/80 bg-sky-50/80 p-5 shadow-md">
              <h2 className="mb-3 text-2xl font-black text-slate-950">Что выходит каждый день</h2>
              <p className="text-base leading-8 text-slate-800">
                На канале проходят стримы-шоу с обсуждениями участников Дома-2, спорами, эмоциями, скандалами и разбором самых громких ситуаций проекта. Также зрители могут смотреть прямой эфир нового свежего выпуска.
              </p>
            </div>

            <h2 className="mb-3 text-2xl font-black text-slate-950">Где искать эфиры</h2>
            <p className="mb-5 text-base leading-8 text-slate-800">
              YouTube-канал Max Brabus можно найти через поиск YouTube. Подписывайтесь на канал, чтобы не пропускать ежедневные стримы и свежие выпуски Дома-2 в 18:00 по московскому времени.
            </p>

            <p className="text-base leading-8 text-slate-800">
              Для удобства также доступен Telegram-канал Max Brabus: там можно следить за обновлениями, анонсами, обсуждениями и переходить к актуальным эфирам.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={youtubeUrl} target="_blank" rel="noreferrer" className="rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white shadow-[0_10px_30px_rgba(220,38,38,0.32)] transition hover:-translate-y-0.5 hover:bg-red-700">
                Найти Max Brabus на YouTube
              </a>
              <a href={telegramUrl} target="_blank" rel="noreferrer" className="rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-[0_10px_30px_rgba(14,165,233,0.32)] transition hover:-translate-y-0.5 hover:bg-sky-600">
                Перейти в Telegram
              </a>
              <a href="/#watch" className="rounded-full border border-white/80 bg-white/86 px-5 py-3 text-sm font-black text-slate-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-white">
                Смотреть эфир на сайте
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

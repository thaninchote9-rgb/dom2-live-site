import { getNews, pickHomeCards } from "../lib/news.js";

// Новости тянутся из Telegram-каналов, страница пересобирается раз в 10 минут.
export const revalidate = 600;

const siteConfig = {
  siteName: "Дом 2 Live",
  brandName: "Max Brabus",
    youtubeChannelUrl: "https://www.youtube.com/@dancedoll11",
    telegramUrl: "https://t.me/maxbrabusstrim",

  // Чтобы обновить главный плеер, меняйте только этот ID.
  // Пример: https://www.youtube.com/watch?v=K5WMKVN1f48
  // ID здесь: K5WMKVN1f48
  currentVideoId: "6413sxsmaII",
};

const archiveItems = [
  {
    date: "16.08",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/ngyxRk63xbE?feature=share",
    image: "https://img.youtube.com/vi/ngyxRk63xbE/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "16.08",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/6413sxsmaII?feature=share",
    image: "https://img.youtube.com/vi/6413sxsmaII/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "16.08",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/eH7D4dvknzI?feature=share",
    image: "https://img.youtube.com/vi/eH7D4dvknzI/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "15.08",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/6413sxsmaII?feature=share",
    image: "https://img.youtube.com/vi/6413sxsmaII/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "15.08",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/_l9zSYxRd7c?feature=share",
    image: "https://img.youtube.com/vi/_l9zSYxRd7c/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "14.08",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/mpYYZhZc_bk?feature=share",
    image: "https://img.youtube.com/vi/mpYYZhZc_bk/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "14.08",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/K5WMKVN1f48?feature=share",
    image: "https://img.youtube.com/vi/K5WMKVN1f48/hqdefault.jpg",
    tag: "Архив",
  },
];

const shortVideoItems = [
  {
    title: "Макс Брабус смотрит Кто уб#л модель из ДОМА 2",
    date: "15.08.2026",
    videoId: "6413sxsmaII",
  },
  {
    title: "Дом 2 сегодняшний выпуск от 14.08.2026",
    date: "14.08.2026",
    videoId: "_l9zSYxRd7c",
  },
  {
    title: "Макс Брабус сегодняшний выпуск стрим смотрим Ютуб",
    date: "14.08.2026",
    videoId: "mpYYZhZc_bk",
  },
  {
    title: "Макс Брабус стрим (НЕ ДОМ 2)",
    date: "12.08.2026",
    videoId: "DkB3Llqtqyk",
  },
  {
    title: "Макс Брабус стрим (НЕ ДОМ 2)",
    date: "12.08.2026",
    videoId: "K5WMKVN1f48",
  },
];

function Icon({ children, label }) {
  return (
    <span aria-label={label} role="img" className="inline-flex items-center justify-center">
      {children}
    </span>
  );
}

function getYouTubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function getYouTubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function getYouTubeShortEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function getYouTubeShortUrl(videoId) {
  return `https://www.youtube.com/shorts/${videoId}`;
}

function getTagStyle(tag) {
  switch (tag) {
    case "Отношения": return {
      glow: "shadow-[0_0_0_2px_rgba(236,72,153,0.7),0_0_18px_rgba(236,72,153,0.45)]",
      badge: "bg-pink-500 text-white",
    };
    case "Участники": return {
      glow: "shadow-[0_0_0_2px_rgba(56,189,248,0.7),0_0_18px_rgba(56,189,248,0.45)]",
      badge: "bg-sky-500 text-white",
    };
    case "Скандал": return {
      glow: "shadow-[0_0_0_2px_rgba(239,68,68,0.7),0_0_18px_rgba(239,68,68,0.45)]",
      badge: "bg-red-500 text-white",
    };
    case "Семья": return {
      glow: "shadow-[0_0_0_2px_rgba(34,197,94,0.7),0_0_18px_rgba(34,197,94,0.45)]",
      badge: "bg-green-500 text-white",
    };
    case "Конкурс": return {
      glow: "shadow-[0_0_0_2px_rgba(234,179,8,0.7),0_0_18px_rgba(234,179,8,0.45)]",
      badge: "bg-yellow-400 text-slate-900",
    };
    case "Мнение": return {
      glow: "shadow-[0_0_0_2px_rgba(139,92,246,0.7),0_0_18px_rgba(139,92,246,0.45)]",
      badge: "bg-violet-500 text-white",
    };
    case "Обсуждения": return {
      glow: "shadow-[0_0_0_2px_rgba(249,115,22,0.7),0_0_18px_rgba(249,115,22,0.45)]",
      badge: "bg-orange-500 text-white",
    };
    default: return {
      glow: "shadow-[0_0_0_2px_rgba(148,163,184,0.5),0_0_12px_rgba(148,163,184,0.3)]",
      badge: "bg-slate-700 text-white",
    };
  }
}

function GlassCard({ children, className = "", id }) {
  return (
    <div
      id={id}
      className={`rounded-[2rem] border border-white/80 bg-white/86 shadow-[0_24px_90px_rgba(15,23,42,0.38)] backdrop-blur-3xl ${className}`}
    >
      {children}
    </div>
  );
}

export default async function HomePage() {
  const embedUrl = getYouTubeEmbedUrl(siteConfig.currentVideoId);
  const currentWatchUrl = getYouTubeWatchUrl(siteConfig.currentVideoId);

  const news = await getNews();
  const homeCards = pickHomeCards(news);
  const lastUpdated = homeCards[0]?.date || "";

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 bg-[url('/backgrounds/rain-window.jpg')] bg-cover bg-center bg-fixed text-slate-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(219,234,254,0.95),transparent_34%),radial-gradient(circle_at_top_right,rgba(243,232,255,0.90),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(224,242,254,0.92),transparent_38%),linear-gradient(135deg,#eef6ff_0%,#f8fbff_48%,#f4efff_100%)]" />
        <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-200/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-blue-200/35 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/35 bg-white/86 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/60 bg-white/74 text-xl shadow-xl backdrop-blur-xl">
                <Icon label="play">▶</Icon>
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-slate-950">
                  {siteConfig.siteName}
                </div>
                <div className="text-xs font-medium text-slate-700">
                  стримы • эфиры • архив
                </div>
              </div>
            </a>
            <a href="/vpn" className="rounded-full border border-violet-300 bg-white px-4 py-2 text-sm font-black text-violet-800 shadow-md transition hover:-translate-y-0.5 hover:border-violet-500 hover:bg-violet-50">
              VPN
            </a>
          </div>

          <nav className="hidden rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-500 p-[2px] shadow-[0_0_26px_rgba(56,189,248,0.45),0_0_38px_rgba(139,92,246,0.28)] md:flex">
            <div className="flex items-center gap-1.5 rounded-full bg-white/64 px-2 py-2 text-[13px] font-black text-slate-900 backdrop-blur-2xl">
              <a href="#watch" className="rounded-full border border-white/70 bg-white/72 px-3 py-2 text-sky-800 whitespace-nowrap shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-sky-700 hover:shadow-[0_0_18px_rgba(56,189,248,0.45)]">Смотреть эфир</a>
              <a href="/archive" className="rounded-full border border-white/70 bg-white/72 px-3 py-2 text-cyan-800 whitespace-nowrap shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-cyan-700 hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full border border-white/70 bg-white/72 px-3 py-2 text-violet-800 whitespace-nowrap shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-violet-700 hover:shadow-[0_0_18px_rgba(139,92,246,0.45)]">Новости</a>
              <a href="#shorts" className="rounded-full border border-white/70 bg-white/72 px-3 py-2 text-pink-800 whitespace-nowrap shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-pink-700 hover:shadow-[0_0_18px_rgba(236,72,153,0.42)]">Короткие видео</a>
              <a href="#about" className="rounded-full border border-white/70 bg-white/72 px-3 py-2 text-fuchsia-800 whitespace-nowrap shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-fuchsia-700 hover:shadow-[0_0_18px_rgba(217,70,239,0.42)]">О проекте</a>
            </div>
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="hidden whitespace-nowrap text-sm font-black text-slate-800/90 drop-shadow-sm xl:inline">
              Подписывайтесь на
            </span>
            <a href={siteConfig.youtubeChannelUrl} target="_blank" rel="noreferrer" className="rounded-full border border-red-500/50 bg-white/84 px-4 py-2 text-sm font-black text-red-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-red-500/80 hover:bg-red-50/90 hover:text-red-700">
              YouTube
            </a>
            <a href={siteConfig.telegramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-sky-500/55 bg-white/84 px-4 py-2 text-sm font-black text-sky-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-500/85 hover:bg-sky-50/90 hover:text-sky-700">
              Telegram
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 pb-8 pt-28 md:px-6 md:pb-12 md:pt-32">
        <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <GlassCard className="relative overflow-hidden p-5 md:p-8">
            <div className="absolute inset-0 bg-[url('/backgrounds/hero-rain-window.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-white/72 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.70),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(219,234,254,0.58),transparent_44%)]" />

            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/80 bg-white/86 px-4 py-2 text-sm font-black text-slate-900 shadow-[0_0_22px_rgba(249,115,22,0.45)] backdrop-blur-xl ring-2 ring-orange-400/35">
                <span className="text-base drop-shadow-[0_0_8px_rgba(249,115,22,0.95)]">🔥</span>
                Новые выпуски каждый день в 18:00 по Москве
              </div>

              <h1 className="w-full max-w-[720px] rounded-[1.7rem] border border-orange-300/80 bg-white/90 px-5 py-5 text-left font-black tracking-tight text-slate-950 shadow-[0_0_28px_rgba(249,115,22,0.38)] backdrop-blur-xl ring-2 ring-orange-400/25 md:px-6 md:py-5">
                <span className="block whitespace-nowrap text-[clamp(1.75rem,3.35vw,3rem)] leading-[1.04]">Дом-2 смотреть онлайн</span>
                <span className="mt-2 block whitespace-nowrap text-[clamp(1.28rem,2.6vw,2.22rem)] leading-[1.05]">Каждый день свежие выпуски</span>
                <span className="mt-2 block whitespace-nowrap text-[clamp(1.75rem,3.35vw,3rem)] leading-[1.04]">Смотри стримы</span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-800 md:text-lg">
                Смотрите актуальный эфир дом 2, свежие выпуски, архив стримов и новости участников.
                Если новый прямой эфир ещё не начался, на сайте отображается последний доступный выпуск.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
                <span className="rounded-full border border-white/80 bg-white/82 px-4 py-2 text-slate-800 shadow-md backdrop-blur-xl">дом 2 смотреть</span>
                <span className="rounded-full border border-white/80 bg-white/82 px-4 py-2 text-slate-800 shadow-md backdrop-blur-xl">дом 2 сегодняшний выпуск</span>
                <span className="rounded-full border border-white/80 bg-white/82 px-4 py-2 text-slate-800 shadow-md backdrop-blur-xl">дом 2 стримы</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard id="shorts" className="overflow-hidden p-3">
            {shortVideoItems.length > 0 ? (
              <div className="grid gap-3">
                {shortVideoItems.slice(0, 3).map((item) => (
                  <div key={item.videoId} className="overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/86 p-2 shadow-lg backdrop-blur-xl">
                    <div className="overflow-hidden rounded-[1rem] bg-slate-950 shadow-xl">
                      <div className="aspect-[9/16] w-full">
                        <iframe
                          className="h-full w-full"
                          src={getYouTubeShortEmbedUrl(item.videoId)}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 px-2 py-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-black text-slate-950">{item.title}</div>
                        <div className="mt-1 text-xs font-bold text-slate-600">{item.date}</div>
                      </div>
                      <a
                        href={getYouTubeShortUrl(item.videoId)}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 rounded-full bg-red-600 px-3 py-2 text-xs font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-red-700"
                      >
                        YouTube
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[1.65rem] border border-dashed border-pink-300/80 bg-white/74 p-6 text-center shadow-inner backdrop-blur-xl md:min-h-[430px]">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-600 text-2xl text-white shadow-xl">
                  ▶
                </div>
                <div className="text-xl font-black text-slate-950">Скоро появятся Shorts</div>
                <p className="mt-3 max-w-[18rem] text-sm leading-6 text-slate-700">
                  Пришлите ссылку на YouTube Shorts — добавим сюда встроенный плеер без загрузки видео на сайт.
                </p>
              </div>
            )}
          </GlassCard>
        </section>

        <section id="watch" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <GlassCard className="overflow-hidden p-3">
            <div className="overflow-hidden rounded-[1.65rem] bg-slate-950 shadow-2xl">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={embedUrl}
                  title="Дом 2 смотреть онлайн — свежий выпуск"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-black text-slate-950">Актуальный эфир / последний выпуск</div>
                <div className="text-sm text-slate-700">
                  Смотрите свежий выпуск и прямой эфир на сайте или откройте видео на YouTube.
                </div>
              </div>
              <a href={currentWatchUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-3xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-[0_10px_30px_rgba(220,38,38,0.38)] transition hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_12px_34px_rgba(220,38,38,0.52)]">
                <span className="flex h-6 w-8 items-center justify-center rounded-lg bg-white text-[11px] text-red-600 shadow-sm">▶</span>
                Открыть YouTube
              </a>
            </div>
          </GlassCard>

          <GlassCard id="archive" className="p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-slate-950">Архив выпусков</h2>
            </div>

            <div className="space-y-3">
              {archiveItems.length === 0 ? (
                <div className="rounded-3xl border border-white/70 bg-white/74 p-5 text-sm leading-6 text-slate-700 shadow-md backdrop-blur-xl">
                  Архив нового YouTube-канала пока пуст. Следующий эфир автоматически появится здесь после публикации.
                </div>
              ) : archiveItems.slice(0, 5).map((item) => (
                <a
                  key={`${item.date}-${item.videoUrl}`}
                  href={item.videoUrl}
                  target={item.videoUrl === "#" ? undefined : "_blank"}
                  rel={item.videoUrl === "#" ? undefined : "noreferrer"}
                  className="group block overflow-hidden rounded-3xl border border-white/60 bg-white/86 p-2 shadow-md backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/86 hover:shadow-xl"
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/10">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs text-white shadow-lg">▶</span>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 py-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-slate-700">{item.date}</span>
                        <span className="rounded-full bg-slate-950 px-2 py-1 text-[10px] font-black text-white">{item.tag}</span>
                      </div>
                      <div className="line-clamp-2 text-sm font-black leading-snug text-slate-900">{item.title}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </section>


        


        <section id="news" className="mt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-slate-700">новости проекта</div>
              <h2 className="text-3xl font-black text-white drop-shadow-lg">Свежие новости дом 2</h2>
            </div>
            {lastUpdated ? (
              <div className="rounded-full border border-white/60 bg-white/74 px-4 py-2 text-xs font-black text-slate-800 shadow-md backdrop-blur-xl">
                обновлено {lastUpdated}
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {homeCards.map((item) => {
              const tagStyle = getTagStyle(item.tag);
              return (
                <a key={item.slug} href={item.href} className="block text-inherit no-underline">
                  <GlassCard className={`group overflow-hidden p-3 transition-all duration-300 md:hover:-translate-y-2 md:hover:scale-[1.025] ${tagStyle.glow}`}>
                    <div className="relative overflow-hidden rounded-[1.4rem] bg-white/86 shadow-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover object-center transition-transform duration-300 md:group-hover:scale-105"
                      />
                      <div className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-black shadow-lg backdrop-blur-xl ${tagStyle.badge}`}>
                        {item.tag}
                      </div>
                      <div className="absolute right-3 top-3 rounded-full border border-white/80 bg-slate-950/85 px-3 py-1 text-xs font-black text-white shadow-lg backdrop-blur-xl">
                        {item.date}
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="text-lg font-black leading-snug text-slate-950">{item.title}</h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-sky-700">
                        Читать полностью →
                      </span>
                    </div>
                  </GlassCard>
                </a>
              );
            })}
          </div>

          <div className="mt-5 flex justify-center">
            <a href="/news" className="rounded-full border border-white/70 bg-white/86 px-6 py-3 text-sm font-black text-slate-900 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white">
              Все новости Дом 2 →
            </a>
          </div>
        </section>

        <GlassCard id="about" className="mt-8 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <h2 className="text-2xl font-black text-slate-950">О проекте</h2>
          </div>
          <p className="max-w-4xl text-sm leading-7 text-slate-800 md:text-base">
            Сайт создан для удобного просмотра стримов, свежих выпусков, архива эфиров и новостей,
            связанных с проектом дом 2. Видео воспроизводятся через официальный встроенный плеер YouTube.
          </p>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-slate-700">
            Дисклеймер: видеоматериалы встроены с YouTube. Все права на видео, изображения,
            товарные знаки и материалы принадлежат их законным правообладателям. Сайт не претендует
            на авторские права и размещает материалы исключительно в информационно-развлекательных целях.
          </p>
        </GlassCard>
      </div>

      <footer id="contacts" className="relative z-10 border-t border-white/40 bg-white/20 px-4 py-8 text-center text-sm text-slate-700 backdrop-blur-2xl md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 font-black text-slate-800">
            {siteConfig.siteName} • {siteConfig.brandName}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 font-bold">
            <a href={siteConfig.youtubeChannelUrl} target="_blank" rel="noreferrer" className="hover:text-slate-950">
              YouTube
            </a>
            <a href={siteConfig.telegramUrl} target="_blank" rel="noreferrer" className="hover:text-slate-950">
              Telegram
            </a>
          </div>
        </div>
      </footer>
    
        <section className="mt-8 rounded-[2rem] border border-white/80 bg-white/86 p-6 shadow-xl backdrop-blur-3xl md:p-8">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-slate-700">разделы сайта</div>
          <h2 className="mb-5 text-3xl font-black text-slate-950">Быстрые SEO-разделы</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <a href="/dom-2-smotret-online" className="rounded-3xl border border-white/80 bg-white/86 p-5 font-black text-slate-800 shadow-md hover:bg-white">Дом 2 смотреть онлайн</a>
            <a href="/dom-2-svezhie-serii" className="rounded-3xl border border-white/80 bg-white/86 p-5 font-black text-slate-800 shadow-md hover:bg-white">Дом 2 свежие серии</a>
            <a href="/dom-2-segodnya" className="rounded-3xl border border-white/80 bg-white/86 p-5 font-black text-slate-800 shadow-md hover:bg-white">Дом 2 сегодня</a>
            <a href="/dom-2-efir" className="rounded-3xl border border-white/80 bg-white/86 p-5 font-black text-slate-800 shadow-md hover:bg-white">Дом 2 эфир</a>
            <a href="/dom-2-arhiv" className="rounded-3xl border border-white/80 bg-white/86 p-5 font-black text-slate-800 shadow-md hover:bg-white">Дом 2 архив</a>
            <a href="/novosti" className="rounded-3xl border border-white/80 bg-white/86 p-5 font-black text-slate-800 shadow-md hover:bg-white">Новости Дом 2</a>
          
            <a href="/dom-2-segodnyashniy-vypusk" className="rounded-3xl border border-white/80 bg-white/72 p-5 font-black text-slate-800 shadow-md hover:bg-white">Сегодняшний выпуск</a>
            <a href="/dom-2-smotret-online-besplatno" className="rounded-3xl border border-white/80 bg-white/72 p-5 font-black text-slate-800 shadow-md hover:bg-white">Смотреть онлайн бесплатно</a>
            <a href="/dom-2-svezhie-serii-smotret-besplatno" className="rounded-3xl border border-white/80 bg-white/72 p-5 font-black text-slate-800 shadow-md hover:bg-white">Свежие серии бесплатно</a>
            <a href="/dom-2-efir-smotret-online" className="rounded-3xl border border-white/80 bg-white/72 p-5 font-black text-slate-800 shadow-md hover:bg-white">Эфир смотреть онлайн</a>
            <a href="/dom-2-smotret-2026" className="rounded-3xl border border-white/80 bg-white/72 p-5 font-black text-slate-800 shadow-md hover:bg-white">Дом 2 смотреть 2026</a>
            <a href="/dom-2-smotret-v-horoshem-kachestve" className="rounded-3xl border border-white/80 bg-white/72 p-5 font-black text-slate-800 shadow-md hover:bg-white">В хорошем качестве</a>
</div>
        </section>

</main>
  );
}

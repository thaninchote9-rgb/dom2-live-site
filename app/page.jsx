const siteConfig = {
  siteName: "Дом 2 Live",
  brandName: "Max Brabus",
  youtubeChannelUrl: "https://www.youtube.com/@ThomasKing4771",
  telegramUrl: "https://t.me/maxbrabusstrim",

  // Чтобы обновить главный плеер, меняйте только этот ID.
  // Пример: https://www.youtube.com/watch?v=r6JvpOAPlG4
  // ID здесь: r6JvpOAPlG4
  currentVideoId: "r6JvpOAPlG4",
};

const archiveItems = [
  {
    date: "28.05",
    title: "Дом 2 сегодняшний выпуск — свежий стрим",
    videoUrl: "https://www.youtube.com/live/r6JvpOAPlG4",
    image: "https://img.youtube.com/vi/r6JvpOAPlG4/hqdefault.jpg",
    tag: "Новый эфир",
  },
  {
    date: "27.05",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtu.be/j-jxUE1EYUg",
    image: "https://img.youtube.com/vi/j-jxUE1EYUg/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "26.05",
    title: "Дом 2 свежий выпуск — вечерний стрим",
    videoUrl: "#",
    image: "https://img.youtube.com/vi/r6JvpOAPlG4/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "25.05",
    title: "Дом 2 стрим — участники, новости, обсуждение",
    videoUrl: "#",
    image: "https://img.youtube.com/vi/j-jxUE1EYUg/hqdefault.jpg",
    tag: "Архив",
  },
];

const newsItems = [
  {
    date: "29.05.2026",
    image: "/news/news-chelovek-goda.jpg",
    title: "Итоги второго этапа конкурса «Человек года»",
    text: "Света Прель подвела итоги нового этапа конкурса. Победу одержала Элина Рахимова, второе место заняла Кристина Лясковец, а третье место стало неожиданностью для зрителей.",
    tag: "Конкурс",
  },
  {
    date: "29.05.2026",
    image: "/news/news-romashovy.jpg",
    title: "Женя и Настя Ромашовы поделились радостной новостью",
    text: "Ромашовы сообщили поклонникам, что теперь их трое. Пара поделилась трогательной новостью и получила много поздравлений от зрителей проекта.",
    tag: "Семья",
  },
  {
    date: "29.05.2026",
    image: "/news/news-salibekovy.jpg",
    title: "Салибековы покинули проект",
    text: "Кристина Лясковец подтвердила уход семейства: они решили строить любовь за периметром. Перед уходом у Салибековых произошёл серьёзный конфликт с Галей.",
    tag: "Участники",
  },
];


const streamerPhotos = [
  {
    src: "/photos/streamers-main.jpg",
    title: "Фото стримеров",
    text: "Свежие фото, настроение эфира и закулисье стримов.",
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

function GlassCard({ children, className = "", id }) {
  return (
    <div
      id={id}
      className={`rounded-[2rem] border border-white/55 bg-white/58 shadow-[0_24px_90px_rgba(15,23,42,0.26)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const embedUrl = getYouTubeEmbedUrl(siteConfig.currentVideoId);
  const currentWatchUrl = getYouTubeWatchUrl(siteConfig.currentVideoId);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 bg-[url('/backgrounds/rain-window.jpg')] bg-cover bg-center bg-fixed text-slate-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.48),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.34),transparent_42%)]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/35 bg-white/48 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/60 bg-white/55 text-xl shadow-xl backdrop-blur-xl">
              <Icon label="play">▶</Icon>
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-slate-950">
                {siteConfig.siteName}
              </div>
              <div className="text-xs font-medium text-slate-500">
                стримы • эфиры • архив
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-2 rounded-full border border-white/60 bg-white/35 px-3 py-2 text-sm font-semibold text-slate-600 shadow-lg backdrop-blur-2xl md:flex">
            <a href="#watch" className="rounded-full px-4 py-2 hover:bg-white/70 hover:text-slate-950">Смотреть эфир</a>
            <a href="#archive" className="rounded-full px-4 py-2 hover:bg-white/70 hover:text-slate-950">Архив</a>
            <a href="#news" className="rounded-full px-4 py-2 hover:bg-white/70 hover:text-slate-950">Новости</a>
            <a href="#about" className="rounded-full px-4 py-2 hover:bg-white/70 hover:text-slate-950">О проекте</a>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-black text-slate-700/90 drop-shadow-sm sm:inline">
              Подписывайтесь на
            </span>
            <a href={siteConfig.youtubeChannelUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-black text-slate-800 shadow-lg backdrop-blur-xl hover:bg-white/75">
              YouTube
            </a>
            <a href={siteConfig.telegramUrl} target="_blank" rel="noreferrer" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-xl hover:bg-slate-800">
              Telegram
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <GlassCard className="relative overflow-hidden p-6 md:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg backdrop-blur-xl">
              <Icon label="calendar">📅</Icon>
              Каждый день в 18:00 по Москве
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-6xl">
              Дом 2 смотреть онлайн — свежий выпуск и стрим сегодня
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Смотрите актуальный эфир дом 2, свежие выпуски, архив стримов и новости участников.
              Если новый прямой эфир ещё не начался, на сайте отображается последний доступный выпуск.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
              <span className="rounded-full border border-white/70 bg-white/55 px-4 py-2 text-slate-700 shadow-md backdrop-blur-xl">дом 2 смотреть</span>
              <span className="rounded-full border border-white/70 bg-white/55 px-4 py-2 text-slate-700 shadow-md backdrop-blur-xl">дом 2 сегодняшний выпуск</span>
              <span className="rounded-full border border-white/70 bg-white/55 px-4 py-2 text-slate-700 shadow-md backdrop-blur-xl">дом 2 стримы</span>
            </div>
          </GlassCard>

          <GlassCard className="overflow-hidden p-3">
            <div className="relative min-h-[360px] overflow-hidden rounded-[1.65rem] bg-slate-950/20 shadow-xl md:min-h-[430px]">
              <img
                src={streamerPhotos[0].src}
                alt="Фото стримеров дом 2"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/12 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-black text-slate-800 shadow-lg backdrop-blur-xl">
                фото
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-2 flex items-center gap-2 text-lg font-black text-white drop-shadow">
                  <Icon label="camera">📸</Icon>
                  {streamerPhotos[0].title}
                </div>
                <p className="max-w-[18rem] text-sm leading-6 text-white/85 drop-shadow">
                  {streamerPhotos[0].text}
                </p>
              </div>
            </div>
          </GlassCard>
        </section>

        <section id="watch" className="grid gap-6 lg:grid-cols-[1fr_360px]">
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
                <div className="text-sm text-slate-500">
                  Смотрите свежий выпуск и прямой эфир на сайте или откройте видео на YouTube.
                </div>
              </div>
              <a href={currentWatchUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-3xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-xl hover:bg-slate-800">
                <Icon label="youtube">▶</Icon>
                Открыть YouTube
              </a>
            </div>
          </GlassCard>

          <GlassCard id="archive" className="p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-slate-950">Архив выпусков</h2>
            </div>

            <div className="space-y-3">
              {archiveItems.map((item) => (
                <a
                  key={`${item.date}-${item.title}`}
                  href={item.videoUrl}
                  target={item.videoUrl === "#" ? undefined : "_blank"}
                  rel={item.videoUrl === "#" ? undefined : "noreferrer"}
                  className="group block overflow-hidden rounded-3xl border border-white/60 bg-white/48 p-2 shadow-md backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-xl"
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
                        <span className="text-xs font-black text-slate-500">{item.date}</span>
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
              <div className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-slate-500">новости проекта</div>
              <h2 className="text-3xl font-black text-slate-950">Свежие новости дом 2</h2>
            </div>
            <div className="rounded-full border border-white/60 bg-white/55 px-4 py-2 text-xs font-black text-slate-600 shadow-md backdrop-blur-xl">
              публикации от 29.05.2026
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {newsItems.map((item) => (
              <GlassCard key={item.title} className="overflow-hidden p-3">
                <div className="relative overflow-hidden rounded-[1.4rem] bg-white/60 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/5] w-full object-cover object-center"
                  />
                  <div className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-black text-slate-800 shadow-lg backdrop-blur-xl">
                    {item.tag}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full border border-white/70 bg-slate-950/85 px-3 py-1 text-xs font-black text-white shadow-lg backdrop-blur-xl">
                    {item.date}
                  </div>
                </div>

                <div className="p-3">
                  <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    публикация от {item.date}
                  </div>
                  <h3 className="mb-3 text-lg font-black leading-snug text-slate-950">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <GlassCard id="about" className="mt-8 p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <h2 className="text-2xl font-black text-slate-950">О проекте</h2>
          </div>
          <p className="max-w-4xl text-sm leading-7 text-slate-600 md:text-base">
            Сайт создан для удобного просмотра стримов, свежих выпусков, архива эфиров и новостей,
            связанных с проектом дом 2. Видео воспроизводятся через официальный встроенный плеер YouTube.
          </p>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-slate-500">
            Дисклеймер: видеоматериалы встроены с YouTube. Все права на видео, изображения,
            товарные знаки и материалы принадлежат их законным правообладателям. Сайт не претендует
            на авторские права и размещает материалы исключительно в информационно-развлекательных целях.
          </p>
        </GlassCard>
      </div>

      <footer id="contacts" className="relative z-10 border-t border-white/40 bg-white/20 px-4 py-8 text-center text-sm text-slate-500 backdrop-blur-2xl md:px-6">
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
    </main>
  );
}

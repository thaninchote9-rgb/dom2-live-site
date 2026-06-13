export const metadata = {
  title: "Архив выпусков Дом 2 — смотреть прошлые эфиры",
  description: "Архив выпусков Дом 2: свежие эфиры, прошлые стримы, выпуски по датам и удобная навигация.",
  alternates: {
    canonical: "https://dom2-live.ru/archive",
  },
};

const archiveItems = [
  {
    date: "10.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/Z07UcKQ6aFQ?feature=share",
    image: "https://img.youtube.com/vi/Z07UcKQ6aFQ/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "09.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/FwnyRl_l1Fs?feature=share",
    image: "https://img.youtube.com/vi/FwnyRl_l1Fs/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "08.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/WuxfLiWWHcE?feature=share",
    image: "https://img.youtube.com/vi/WuxfLiWWHcE/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "07.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/xyctdh3_Ad8?feature=share",
    image: "https://img.youtube.com/vi/xyctdh3_Ad8/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "06.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/jx_2MRa5Kn8?feature=share",
    image: "https://img.youtube.com/vi/jx_2MRa5Kn8/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "05.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/yyq7qy3DLQ0?feature=share",
    image: "https://img.youtube.com/vi/yyq7qy3DLQ0/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "04.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/q0MIQp6TBgE?feature=share",
    image: "https://img.youtube.com/vi/q0MIQp6TBgE/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "03.06",
    title: "Дом 2 сегодняшний выпуск — свежий стрим",
    videoUrl: "https://youtube.com/live/FQQA_0O5blA?feature=share",
    image: "https://img.youtube.com/vi/FQQA_0O5blA/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "02.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/udLhhalRvKk?feature=share",
    image: "https://img.youtube.com/vi/udLhhalRvKk/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "01.06",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/XuAjJREmJnA?feature=share",
    image: "https://img.youtube.com/vi/XuAjJREmJnA/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "31.05",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtu.be/LcWHS-tVwpg",
    image: "https://img.youtube.com/vi/LcWHS-tVwpg/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "30.05",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtu.be/0Rh6JCfb7kY",
    image: "https://img.youtube.com/vi/0Rh6JCfb7kY/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "29.05",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtube.com/live/cC49cINpf_s?feature=share",
    image: "https://img.youtube.com/vi/cC49cINpf_s/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "28.05",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://www.youtube.com/live/r6JvpOAPlG4",
    image: "https://img.youtube.com/vi/r6JvpOAPlG4/hqdefault.jpg",
    tag: "Архив",
  },
  {
    date: "27.05",
    title: "Дом 2 смотреть онлайн — архив эфира",
    videoUrl: "https://youtu.be/j-jxUE1EYUg",
    image: "https://img.youtube.com/vi/j-jxUE1EYUg/hqdefault.jpg",
    tag: "Архив",
  },
];

export default function ArchivePage() {
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

          <nav className="hidden md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/72 px-2 py-2 text-sm font-black text-slate-900 shadow-lg backdrop-blur-2xl">
              <a href="/#watch" className="rounded-full bg-white/90 px-4 py-2 text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:bg-white">Эфир</a>
              <a href="/archive" className="rounded-full bg-white/90 px-4 py-2 text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:bg-white">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Новости</a>
              <a href="https://www.youtube.com/@ThomasKing4771/shorts" target="_blank" rel="noreferrer" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Видео участников</a>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-black text-slate-800/90 drop-shadow-sm sm:inline">Подписывайтесь на</span>
            <a href="https://www.youtube.com/@MaxBrabus" target="_blank" rel="noreferrer" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-700 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            <a href="https://t.me/maxbrabusstrim" target="_blank" rel="noreferrer" className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-sky-600 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.365-1.417.155-.479-.148-1.448-.464-2.082-.896-.822-.549-.13-.846.164-1.222.086-.096 1.409-1.292 2.734-2.98.172-.184.282-.428.282-.672V8.94c0-.272-.113-.537-.311-.729l-.034-.035A1.028 1.028 0 0 0 8.9 7.8c-.244.026-.456.126-.628.271-.293.249-.566.585-.756 1.037-.066.16-.108.315-.11.468-.04.923-.1 2.267-.12 3.22-.017.945-.05 2.156-.064 3.08v.382c0 .277.116.543.315.734l.035.035c.278.24.66.318 1.027.259.24-.04.46-.14.628-.271.293-.249.566-.585.757-1.037.065-.16.107-.315.11-.468.04-.923.099-2.267.12-3.22.016-.945.05-2.157.064-3.08z"/></svg>
              Telegram
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pb-14 md:pt-32">
        <a href="/" className="mb-6 inline-flex rounded-full border border-white/80 bg-white/86 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← На главную</a>

        <section className="mb-7 rounded-[2rem] border border-white/80 bg-white/86 p-7 shadow-[0_24px_90px_rgba(15,23,42,0.38)] backdrop-blur-3xl md:p-10">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-700">архив выпусков</div>
          <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-6xl">Архив Дом 2</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-800">Здесь собраны архивные эфиры и выпуски Дом 2. Новые видео добавляются в начало списка, а предыдущие выпуски остаются доступными по датам.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {archiveItems.map((item) => (
            <a key={`${item.date}-${item.title}`} href={item.videoUrl} target={item.videoUrl === "#" ? undefined : "_blank"} rel={item.videoUrl === "#" ? undefined : "noreferrer"} className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/86 p-4 shadow-xl backdrop-blur-3xl transition hover:-translate-y-1 hover:bg-white/86">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-lg">
                <img src={item.image} alt={item.title} className="aspect-video w-full object-cover object-center transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/10">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-xl">▶</span>
                </div>
                <div className="absolute left-4 top-4 rounded-full bg-white/86 px-4 py-2 text-sm font-black text-slate-800 shadow-lg backdrop-blur-xl">{item.date}</div>
                <div className="absolute right-4 top-4 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg">{item.tag}</div>
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

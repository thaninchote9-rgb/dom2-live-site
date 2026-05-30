export const metadata = {
  title: "Архив выпусков Дом 2 — смотреть прошлые эфиры",
  description: "Архив выпусков Дом 2: свежие эфиры, прошлые стримы, выпуски по датам и удобная навигация.",
  alternates: {
    canonical: "https://dom2-live.ru/archive",
  },
};

const archiveItems = [
  {
    date: "29.05",
    title: "Дом 2 сегодняшний выпуск — свежий стрим",
    videoUrl: "https://youtube.com/live/cC49cINpf_s?feature=share",
    image: "https://img.youtube.com/vi/cC49cINpf_s/hqdefault.jpg",
    tag: "Новый эфир",
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

          <nav className="hidden items-center gap-2 rounded-full border border-white/60 bg-white/64 px-3 py-2 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur-2xl md:flex">
            <a href="/#watch" className="rounded-full px-4 py-2 hover:bg-white/84 hover:text-slate-950">Смотреть эфир</a>
            <a href="/archive" className="rounded-full px-4 py-2 hover:bg-white/84 hover:text-slate-950">Архив</a>
            <a href="/news" className="rounded-full px-4 py-2 hover:bg-white/84 hover:text-slate-950">Новости</a>
            <a href="/#about" className="rounded-full px-4 py-2 hover:bg-white/84 hover:text-slate-950">О проекте</a>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-black text-slate-800/90 drop-shadow-sm sm:inline">Подписывайтесь на</span>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="rounded-full border border-red-500/50 bg-white/84 px-4 py-2 text-sm font-black text-red-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-red-500/80 hover:bg-red-50/90 hover:text-red-700">
              YouTube
            </a>
            <a href="https://t.me/" target="_blank" rel="noreferrer" className="rounded-full border border-sky-500/55 bg-white/84 px-4 py-2 text-sm font-black text-sky-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-500/85 hover:bg-sky-50/90 hover:text-sky-700">
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

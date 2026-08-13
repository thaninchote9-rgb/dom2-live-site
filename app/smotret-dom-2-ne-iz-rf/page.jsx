const platforms = [
  {
    name: "Наш Дом-2",
    description: "Свежие эфиры и архив выпусков",
    href: "https://nash-dom2.su/efiry/",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    name: "Официальный сайт Дом-2",
    description: "Эфиры проекта на dom2.ru",
    href: "https://dom2.ru/",
    accent: "from-violet-600 to-fuchsia-500",
  },
  {
    name: "Дом-2 во ВКонтакте",
    description: "Официальное сообщество проекта",
    href: "https://vk.ru/dom2on",
    accent: "from-blue-600 to-sky-500",
  },
];

export const metadata = {
  title: "Рекомендация для просмотра Дом-2 вне России",
  description:
    "Короткая рекомендация по настройке защищённого соединения для просмотра Дом-2 за пределами России.",
  alternates: { canonical: "/smotret-dom-2-ne-iz-rf" },
};

function Step({ number, title, children }) {
  return (
    <li className="relative rounded-[1.75rem] border border-white/80 bg-white/90 p-5 pl-20 shadow-xl backdrop-blur-xl sm:p-6 sm:pl-24">
      <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-sky-500 text-lg font-black text-white shadow-lg sm:left-6 sm:top-6 sm:h-12 sm:w-12">
        {number}
      </span>
      <h2 className="text-lg font-black text-slate-950 sm:text-xl">{title}</h2>
      <div className="mt-2 leading-7 text-slate-700">{children}</div>
    </li>
  );
}

export default function WatchOutsideRussiaPage() {
  return (
    <main className="min-h-screen bg-slate-950 bg-[url('/backgrounds/rain-window.jpg')] bg-cover bg-center bg-fixed text-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(219,234,254,0.96),transparent_38%),radial-gradient(circle_at_top_right,rgba(243,232,255,0.94),transparent_42%),linear-gradient(135deg,#eef6ff_0%,#fbfdff_50%,#f5efff_100%)]" />

      <header className="relative z-10 border-b border-white/70 bg-white/86 shadow-sm backdrop-blur-2xl">
        <div className="border-b border-violet-200/70 bg-gradient-to-r from-sky-100 via-white to-violet-100">
          <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-3 py-2 text-xs font-black sm:gap-4 sm:text-sm">
            <a href="/smotret-dom-2-ne-iz-rf" className="rounded-full bg-violet-600 px-4 py-1.5 text-center text-white shadow-md">
              🌍 Смотреть Дом-2 не из РФ
            </a>
            <a href="/vpn" className="rounded-full border border-violet-300 bg-white px-4 py-1.5 text-violet-800 shadow-sm hover:bg-violet-50">
              VPN
            </a>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-3 font-black text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg shadow-lg">▶</span>
            <span>Дом 2 Live</span>
          </a>
          <a href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm hover:border-violet-300 hover:text-violet-700">
            На главную
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/86 p-6 shadow-[0_28px_100px_rgba(76,29,149,0.22)] backdrop-blur-3xl sm:p-10">
          <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-black text-violet-800">
            Рекомендация для зрителей за пределами России
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Настройка просмотра Дом-2 вне РФ
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
            Если вы находитесь не в России и хотите проверить доступность свежих выпусков Дом-2 на российских площадках, настройте защищённое соединение по этой короткой инструкции.
          </p>

          <ol className="mt-8 grid gap-4">
            <Step number="1" title="Рекомендуем установить VPN">
              <p>Откройте нашу VPN-страницу, выберите подходящий тариф и установите приложение на телефон или компьютер.</p>
              <a href="/vpn" className="mt-4 inline-flex rounded-full bg-violet-600 px-5 py-3 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-700">
                Установить или приобрести VPN →
              </a>
            </Step>
            <Step number="2" title="Выберите локацию Россия">
              <p>После подключения откройте список доступных локаций в VPN и выберите <strong>«Россия» или «РФ»</strong>.</p>
            </Step>
            <Step number="3" title="Проверьте соединение">
              <p>Включите VPN и дождитесь статуса «Подключено» перед переходом на площадку.</p>
            </Step>
            <Step number="4" title="Перейдите на площадку">
              <p>Выберите один из сайтов ниже и проверьте доступные на нём свежие выпуски.</p>
            </Step>
          </ol>

          <aside className="mt-6 rounded-2xl border border-sky-200 bg-sky-50/90 p-4 text-sm leading-6 text-slate-700">
            Доступность контента определяется самой площадкой и может зависеть от её правил, вашего региона и законодательства страны пребывания. Используйте VPN только законным способом и соблюдайте условия выбранного сервиса.
          </aside>
        </section>

        <section className="mt-8 rounded-[2.25rem] border border-white/80 bg-white/86 p-6 shadow-2xl backdrop-blur-3xl sm:p-10">
          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">Где смотреть выпуски Дом-2</h2>
          <p className="mt-3 leading-7 text-slate-700">После настройки защищённого соединения выберите подходящую площадку.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {platforms.map((platform) => (
              <a
                key={platform.href}
                href={platform.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className={`block h-2 bg-gradient-to-r ${platform.accent}`} />
                <span className="block p-5">
                  <strong className="block text-lg font-black text-slate-950 group-hover:text-violet-700">{platform.name} ↗</strong>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{platform.description}</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

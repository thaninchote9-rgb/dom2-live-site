import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './VpnLegalPage.module.css';

const SUPPORT_URL = 'https://t.me/brabushub_support_bot';

interface VpnLegalPageProps {
  title: string;
  children: ReactNode;
}

export function VpnLegalPage({ title, children }: VpnLegalPageProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/vpn">
          <img src="/icon-192.png" alt="Дом 2 Live" width="46" height="46" />
          <span><b>ДОМ 2 LIVE</b><small>VPN · MAX BRABUS</small></span>
        </Link>
        <Link className={styles.back} href="/vpn">← Вернуться к VPN</Link>
      </header>

      <article className={styles.document}>
        <p className={styles.eyebrow}>BRABUS HUB · ДОКУМЕНТЫ</p>
        <h1>{title}</h1>
        <p className={styles.updated}>Редакция от 13 августа 2026 г.</p>
        <div className={styles.content}>{children}</div>
      </article>

      <nav className={styles.documents} aria-label="Документы VPN">
        <Link href="/vpn/terms">Пользовательское соглашение</Link>
        <Link href="/vpn/privacy">Политика конфиденциальности</Link>
        <Link href="/vpn/offer">Публичная оферта</Link>
        <Link href="/vpn/refund">Условия возврата</Link>
      </nav>

      <aside className={styles.support}>
        <div>
          <strong>Остались вопросы?</strong>
          <span>Напишите в официальный бот поддержки. Ответ обычно приходит в течение дня.</span>
        </div>
        <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">Написать в поддержку ↗</a>
      </aside>
    </main>
  );
}

export function SupportLink() {
  return <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">@brabushub_support_bot</a>;
}

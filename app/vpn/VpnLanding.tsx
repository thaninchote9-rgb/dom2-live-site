import Link from 'next/link';
import VpnPage from './VpnPage';
import styles from './VpnLanding.module.css';

const SUPPORT_URL = 'https://t.me/brabushub_support_bot';
const VPN_BOT_URL = 'https://t.me/maxbrabus_bot';

export default function VpnLanding() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <img src="/icon-192.png" alt="Дом 2 Live" width="52" height="52" />
          <span><b>ДОМ 2 LIVE</b><small>VPN · MAX BRABUS</small></span>
        </Link>
        <nav aria-label="Навигация VPN">
          <a className={styles.active} href="#top">Главная</a>
          <a href="#my-vpn">Мои VPN</a>
          <a href="#plans">Тарифы</a>
          <a href="#setup">Инструкция</a>
          <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">Поддержка</a>
        </nav>
        <a className={styles.login} href="#my-vpn"><span>♙</span> Войти</a>
      </header>
      <div id="top"><VpnPage /></div>
      <footer className={styles.footer} id="support">
        <Link className={styles.footerBrand} href="/"><img src="/icon-192.png" alt="Дом 2 Live" width="46" height="46" /><span><b>ДОМ 2 LIVE</b><small>VPN · MAX BRABUS</small></span></Link>
        <div>
          <b>Сервис</b>
          <a href="#my-vpn">Мои VPN</a>
          <a href="#plans">Тарифы</a>
          <a href="#setup">Инструкция</a>
          <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">Поддержка</a>
        </div>
        <div>
          <b>Информация</b>
          <Link href="/vpn/terms">Пользовательское соглашение</Link>
          <Link href="/vpn/privacy">Политика конфиденциальности</Link>
          <Link href="/vpn/offer">Публичная оферта</Link>
          <Link href="/vpn/refund">Условия возврата</Link>
        </div>
        <div>
          <b>Поддержка</b>
          <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">@brabushub_support_bot</a>
          <a href={VPN_BOT_URL} target="_blank" rel="noopener noreferrer">VPN в боте @maxbrabus_bot</a>
          <span className={styles.supportNote}>Ответ обычно в течение дня</span>
        </div>
        <small className={styles.copyright}>© 2026 Max Brabus. Все права защищены.</small>
      </footer>
    </div>
  );
}

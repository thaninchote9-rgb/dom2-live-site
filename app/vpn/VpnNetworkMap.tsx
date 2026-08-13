import styles from './VpnNetworkMap.module.css';

export function VpnNetworkMap() {
  return (
    <div className={styles.globe} aria-label="Сеть VPN-соединений по городам России">
      <img className={styles.globeImage} src="/vpn-globe-network-v2.png" alt="Защищённая сеть из России в Европу" />
      <svg className={styles.flowLayer} viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="vpn-exit-gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#875cff" />
            <stop offset="0.55" stopColor="#367dff" />
            <stop offset="1" stopColor="#20d6ff" />
          </linearGradient>
          <filter id="vpn-route-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="vpn-europe-exit" d="M540 259 C455 315 360 390 180 535" />
        </defs>
        <path className={styles.feederRoute} d="M260 133 C355 170 445 210 540 259" />
        <path className={styles.feederRoute} d="M480 217 C505 225 525 240 540 259" />
        <path className={styles.feederRoute} d="M680 245 C630 245 585 250 540 259" />
        <path className={styles.feederRoute} d="M660 371 C620 330 580 290 540 259" />
        <path className={styles.feederRoute} d="M310 399 C390 355 465 305 540 259" />
        <use href="#vpn-europe-exit" className={styles.exitRouteGlow} />
        <use href="#vpn-europe-exit" className={styles.exitRoute} />
        <circle className={styles.packet} r="6"><animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#vpn-europe-exit" /></animateMotion></circle>
        <circle className={styles.packet} r="4"><animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite"><mpath href="#vpn-europe-exit" /></animateMotion></circle>
      </svg>
      <span className={styles.hub} />
      <div className={styles.routeBadge}><span>🇪🇺</span><div><small>Европа · защищённый выход</small><b>🌍 Глобальный интернет</b></div><i>→</i></div>
      <div className={styles.statusCard}><span>♢</span><div><small>VPN подключён</small><b>🇳🇱 Нидерланды</b><strong>▥ &nbsp; 24 мс</strong></div><i>⌄</i></div>
    </div>
  );
}

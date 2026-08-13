'use client';

import { useState } from 'react';
import styles from './VpnSetupGuide.module.css';
import actionStyles from './VpnSetupGuideActions.module.css';
import { VpnAppDownloads, type VpnAppLinks } from './VpnAppDownloads';

interface VpnSetupGuideProps {
  apps: VpnAppLinks;
  subscriptionUrl: string;
}

const platforms = [
  {
    id: 'ios',
    app: 'ios',
    icon: '',
    name: 'iPhone и iPad',
    download: 'Скачать в App Store',
    permission: 'Разрешите добавление VPN-конфигурации, когда iOS покажет системный запрос.',
  },
  {
    id: 'android',
    app: 'android',
    icon: '◆',
    name: 'Android',
    download: 'Скачать в Google Play',
    permission: 'Подтвердите запрос Android на создание VPN-подключения.',
  },
  {
    id: 'windows',
    app: 'windows',
    icon: '⊞',
    name: 'Windows',
    download: 'Скачать установщик',
    permission: 'Если Windows спросит разрешение на изменение сети, подтвердите его.',
  },
  {
    id: 'macos',
    app: 'macos',
    icon: '⌘',
    name: 'macOS',
    download: 'Скачать для Mac',
    permission: 'Разрешите Hiddify добавить VPN-конфигурацию в настройках macOS.',
  },
] as const;

export function VpnSetupGuide({ apps, subscriptionUrl }: VpnSetupGuideProps) {
  const [copied, setCopied] = useState(false);

  async function copyKey() {
    await navigator.clipboard.writeText(subscriptionUrl);
    setCopied(true);
  }

  return (
    <section className={styles.guide} aria-labelledby="vpn-setup-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>КЛЮЧ ГОТОВ</span>
          <h2 id="vpn-setup-title">Как подключить VPN</h2>
          <p>Установите Hiddify, скопируйте ключ-подписку и добавьте его в приложение.</p>
        </div>
        <div className={actionStyles.headerActions}>
          <button className={styles.copyButton} onClick={copyKey} type="button">
            {copied ? '✓ Ключ скопирован' : 'Скопировать ключ'}
          </button>
          <VpnAppDownloads apps={apps} align="right" />
        </div>
      </header>

      <div className={styles.visualSteps} aria-label="Три шага подключения">
        <article>
          <div className={styles.phoneVisual}><span>↓</span></div>
          <b><i>1</i> Установите</b>
          <p>Выберите своё устройство и скачайте Hiddify.</p>
        </article>
        <article>
          <div className={styles.clipboardVisual}><span>⌁</span></div>
          <b><i>2</i> Импортируйте</b>
          <p>Нажмите «+» и выберите «Добавить из буфера».</p>
        </article>
        <article>
          <div className={styles.powerVisual}><span>⌁</span></div>
          <b><i>3</i> Подключитесь</b>
          <p>Выберите профиль и нажмите большую кнопку подключения.</p>
        </article>
      </div>

      <div className={styles.platforms}>
        {platforms.map((platform) => (
          <article className={styles.platform} key={platform.id}>
            <div className={styles.platformHead}>
              <span className={styles.platformIcon} aria-hidden="true">{platform.icon}</span>
              <div><small>ИНСТРУКЦИЯ</small><h3>{platform.name}</h3></div>
            </div>
            <a className={styles.download} href={apps[platform.app]} target="_blank" rel="noreferrer">
              {platform.download} ↗
            </a>
            <ol>
              <li>Установите и откройте приложение Hiddify.</li>
              <li>Скопируйте ключ на этой странице.</li>
              <li>В Hiddify нажмите <strong>«+»</strong> и выберите <strong>«Добавить из буфера»</strong>.</li>
              <li>{platform.permission}</li>
              <li>Нажмите кнопку подключения. Статус должен измениться на «Подключено».</li>
            </ol>
          </article>
        ))}
      </div>

      <aside className={styles.tip}>
        <span aria-hidden="true">i</span>
        <p><strong>Если профиль не добавился автоматически:</strong> выберите ручное добавление, вставьте ключ в поле URL или «Ссылка» и сохраните. Названия пунктов могут немного отличаться в разных версиях Hiddify.</p>
        <a href="https://hiddify.com/app/How-to-use-Hiddify-app/" target="_blank" rel="noreferrer">Официальная инструкция ↗</a>
      </aside>
    </section>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './vpn.module.css';
import contrast from './vpnContrast.module.css';
import workflow from './VpnWorkflow.module.css';
import { VpnAppDownloads } from './VpnAppDownloads';
import { VpnNetworkMap } from './VpnNetworkMap';
import { VpnSetupGuide } from './VpnSetupGuide';
import { VpnEmailVerification, type VerificationPurpose } from './VpnEmailVerification';

type Plan = '1m' | '3m';
type Region = 'ru' | 'eu';
type Subscription = {
  id: number;
  plan: string;
  status: string;
  expiryTime: string;
  subscriptionUrl: string | null;
  locations: number;
};
type HomeData = {
  prices: Record<Plan, { rub: number; usd: number }>;
  apps: Record<'android' | 'ios' | 'windows' | 'macos', string>;
  subscriptions: Subscription[];
  auth: { verified: boolean; email: string | null };
};

const DEFAULT_APPS: HomeData['apps'] = {
  android: 'https://play.google.com/store/apps/details?id=app.hiddify.com',
  ios: 'https://apps.apple.com/app/hiddify-proxy-vpn/id6596777532',
  windows: 'https://github.com/hiddify/hiddify-app/releases/latest',
  macos: 'https://github.com/hiddify/hiddify-app/releases/latest',
};

async function api(body?: Record<string, unknown>) {
  const response = await fetch('/api/vpn', {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'content-type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.status || 'request_failed');
  return data;
}

function planLabel(plan: string) {
  if (plan === 'trial') return 'Пробные 24 часа';
  if (plan === '1m') return 'Подписка на 1 месяц';
  return 'Подписка на 3 месяца';
}

function scrollToAccount() {
  window.setTimeout(() => {
    document.getElementById('my-vpn')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

export default function VpnPage() {
  const [home, setHome] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [checkout, setCheckout] = useState<Plan | null>(null);
  const [result, setResult] = useState<Subscription | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [verificationPurpose, setVerificationPurpose] = useState<VerificationPurpose>('account');
  const [verificationError, setVerificationError] = useState('');
  const [verificationBusy, setVerificationBusy] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<Plan | null>(null);
  const pollTimer = useRef<number | null>(null);

  const stopPolling = useCallback(() => {
    if (pollTimer.current !== null) {
      window.clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const data: HomeData = await api();
      setHome(data);
      const active = data.subscriptions?.find((item) => item.status === 'active') ?? null;
      setResult(active);
      return data;
    } catch {
      setError('Сервис временно недоступен. Попробуйте ещё раз чуть позже.');
      return null;
    }
  }, []);

  const checkOrder = useCallback(async (orderId: number) => {
    try {
      const order = await api({ action: 'status', orderId });
      if (order.status === 'paid' && order.subscription) {
        localStorage.removeItem('vpnOrderId');
        setResult(order.subscription);
        setCheckout(null);
        setLoading(null);
        await refresh();
        scrollToAccount();
        return true;
      }
    } catch {}
    return false;
  }, [refresh]);

  useEffect(() => {
    const bootstrapTimer = window.setTimeout(() => {
      void refresh();
      const saved = Number(localStorage.getItem('vpnOrderId'));
      if (!Number.isInteger(saved) || saved < 1) return;
      setLoading('payment');
      let attempts = 0;
      pollTimer.current = window.setInterval(async () => {
        attempts++;
        const done = await checkOrder(saved);
        if (done || attempts >= 100) {
          stopPolling();
          if (!done) setLoading(null);
        }
      }, 3000);
      void checkOrder(saved);
    }, 0);
    return () => {
      window.clearTimeout(bootstrapTimer);
      stopPolling();
    };
  }, [checkOrder, refresh, stopPolling]);

  useEffect(() => {
    if (!checkout) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCheckout(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [checkout]);

  function openVerification(purpose: VerificationPurpose, plan: Plan | null = null) {
    setVerificationPurpose(purpose);
    setPendingPlan(plan);
    setVerificationError('');
    setVerificationOpen(true);
  }

  function openAccount() {
    setError('');
    if (home?.auth?.verified) {
      scrollToAccount();
      return;
    }
    openVerification('account');
  }

  async function logout() {
    setError('');
    setLoading('logout');
    stopPolling();
    try {
      await api({ action: 'logout' });
      localStorage.removeItem('vpnOrderId');
      setCheckout(null);
      setResult(null);
      await refresh();
      scrollToAccount();
    } catch {
      setError('Не удалось выйти. Попробуйте ещё раз.');
    } finally {
      setLoading(null);
    }
  }

  async function activateTrial() {
    setError('');
    setLoading('trial');
    try {
      const data = await api({ action: 'trial' });
      if (data.status === 'used') {
        setError('Пробный период уже использован. Выберите подходящий платный тариф.');
      } else if (data.status === 'ip_limit') {
        setError('С этого подключения уже активировали несколько пробных периодов. Выберите платный тариф.');
      } else if (data.status === 'email_required') {
        openVerification('trial');
      } else if (data.status === 'ok') {
        setResult({
          id: 0,
          plan: 'trial',
          status: 'active',
          expiryTime: data.expiryTime,
          subscriptionUrl: data.subscriptionUrl,
          locations: 1,
        });
        await refresh();
        scrollToAccount();
      }
    } catch {
      setError('Не удалось активировать пробный доступ. Попробуйте ещё раз.');
    } finally {
      setLoading(null);
    }
  }

  async function startTrial() {
    if (!home?.auth?.verified) {
      openVerification('trial');
      return;
    }
    await activateTrial();
  }

  function startCheckout(plan: Plan) {
    setError('');
    if (!home?.auth?.verified) {
      openVerification('purchase', plan);
      return;
    }
    setCheckout(plan);
  }

  async function requestEmailCode(email: string) {
    setVerificationBusy(true);
    setVerificationError('');
    try {
      const data = await api({ action: 'request_email_code', email });
      if (data.status === 'code_sent') return true;
      if (data.status === 'invalid_email') setVerificationError('Проверьте правильность email.');
      else if (data.status === 'cooldown') setVerificationError('Код уже отправлен. Подождите минуту перед повторной отправкой.');
      else setVerificationError('Слишком много запросов. Попробуйте снова через час.');
    } catch (requestError) {
      const errorCode = requestError instanceof Error ? requestError.message : '';
      setVerificationError(
        errorCode === 'rate_limited'
          ? 'Слишком много запросов. Попробуйте снова через час.'
          : 'Не удалось отправить письмо. Попробуйте немного позже.',
      );
    } finally {
      setVerificationBusy(false);
    }
    return false;
  }

  async function verifyEmail(email: string, code: string) {
    setVerificationBusy(true);
    setVerificationError('');
    try {
      const data = await api({ action: 'verify_email', email, code });
      if (data.status !== 'verified') {
        setVerificationError('Неверный или просроченный код.');
        return;
      }
      const nextPurpose = verificationPurpose;
      const nextPlan = pendingPlan;
      setVerificationOpen(false);
      setPendingPlan(null);
      await refresh();
      if (nextPurpose === 'trial') {
        await activateTrial();
      } else if (nextPurpose === 'purchase' && nextPlan) {
        setCheckout(nextPlan);
      } else {
        scrollToAccount();
      }
    } catch {
      setVerificationError('Не удалось проверить код. Попробуйте ещё раз.');
    } finally {
      setVerificationBusy(false);
    }
  }

  async function createPayment(plan: Plan, region: Region) {
    setError('');
    setLoading('order');
    const paymentWindow = window.open('', 'vpn-payment');
    if (paymentWindow) paymentWindow.opener = null;
    try {
      const data = await api({ action: 'order', plan, region });
      localStorage.setItem('vpnOrderId', String(data.orderId));
      if (paymentWindow) paymentWindow.location.href = data.payUrl;
      else window.location.href = data.payUrl;
      setCheckout(null);
      setLoading('payment');
      stopPolling();
      let attempts = 0;
      pollTimer.current = window.setInterval(async () => {
        attempts++;
        const done = await checkOrder(data.orderId);
        if (done || attempts >= 100) {
          stopPolling();
          if (!done) setLoading(null);
        }
      }, 3000);
    } catch (paymentError) {
      paymentWindow?.close();
      setLoading(null);
      const errorCode = paymentError instanceof Error ? paymentError.message : '';
      if (errorCode === 'email_required') {
        setCheckout(null);
        openVerification('purchase', plan);
      } else {
        setError('Не удалось создать платёж. Попробуйте ещё раз.');
      }
    }
  }

  async function copy(subscription: Subscription) {
    if (!subscription.subscriptionUrl) return;
    await navigator.clipboard.writeText(subscription.subscriptionUrl);
    setCopiedId(subscription.id);
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  const price1 = home?.prices?.['1m']?.rub ?? 350;
  const price3 = home?.prices?.['3m']?.rub ?? 900;
  const appLinks = home?.apps ?? DEFAULT_APPS;
  const subscriptions = home?.subscriptions ?? (result ? [result] : []);
  const activeSubscriptions = subscriptions.filter((item) => item.status === 'active' && item.subscriptionUrl);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.status}><span /> Сервис работает стабильно</div>
          <h1>Безопасный VPN.<br />Каждый день.</h1>
          <p>Защищённое VPN-соединение для телефона и компьютера. Высокая скорость, стабильная работа и подключение за несколько минут.</p>
          <div className={styles.actions}>
            <button className={styles.primary} onClick={startTrial} disabled={!!loading}>
              {loading === 'trial' ? 'Подключаем…' : 'Попробовать 24 часа бесплатно'}
            </button>
            <button className={styles.secondary} type="button" onClick={openAccount}>Мои VPN</button>
            <a className={styles.secondary} href="#plans">Тарифы</a>
          </div>
          <div className={styles.trust}><span>✓ Защищённый трафик</span><span>✓ Высокая скорость</span><span>✓ Без лимита трафика</span></div>
        </div>
        <div className={styles.visual}><VpnNetworkMap /></div>
      </section>

      {error && <div className={styles.error} role="alert">{error}</div>}
      {loading === 'payment' && <div className={styles.notice}>Платёж открыт в новой вкладке. Эта страница автоматически покажет ключ после оплаты.</div>}

      <section className={styles.section} id="my-vpn">
        <div className={styles.heading}>
          <span className={styles.kicker}>МОИ VPN</span>
          <h2>{home?.auth?.verified ? 'Ваши ключи' : 'Ключ всегда под рукой'}</h2>
          <p>
            {home?.auth?.verified
              ? `Вы вошли как ${home.auth.email}. Здесь хранятся VPN-подписки, оформленные на эту почту.`
              : 'Введите email, который указывали при покупке, получите код и откройте свои VPN-ключи на любом устройстве.'}
          </p>
          <div className={styles.accountActions}>
            {!home?.auth?.verified && <button className={styles.primary} type="button" onClick={openAccount}>Войти по email</button>}
            {home?.auth?.verified && <button className={styles.secondary} type="button" onClick={logout} disabled={loading === 'logout'}>{loading === 'logout' ? 'Выходим…' : 'Выйти'}</button>}
          </div>
        </div>

        {home?.auth?.verified && subscriptions.length === 0 && (
          <div className={styles.notice}>На этой почте пока нет VPN-подписок. Если вы только что оплатили, подождите несколько секунд и обновите страницу.</div>
        )}

        {home?.auth?.verified && subscriptions.map((subscription) => {
          const active = subscription.status === 'active';
          return (
          <div className={`${styles.keyPanel} ${active ? '' : styles.expiredKeyPanel}`} key={subscription.id}>
            <div>
              <span className={active ? styles.kicker : styles.expiredKicker}>{active ? 'АКТИВНАЯ ПОДПИСКА' : 'ИСТЕКШАЯ ПОДПИСКА'}</span>
              <h2>{planLabel(subscription.plan)}</h2>
              <p>{active ? 'Действует' : 'Действовала'} до {new Date(subscription.expiryTime).toLocaleString('ru-RU')}. Локаций: {subscription.locations}.</p>
            </div>
            {subscription.subscriptionUrl && <div className={styles.keyBox}>
              <code>{subscription.subscriptionUrl}</code>
              <button onClick={() => copy(subscription)}>{copiedId === subscription.id ? 'Скопировано ✓' : active ? 'Скопировать ключ' : 'Скопировать старый ключ'}</button>
            </div>}
          </div>
          );
        })}
      </section>

      {home?.auth?.verified && activeSubscriptions[0]?.subscriptionUrl && (
        <VpnSetupGuide apps={appLinks} subscriptionUrl={activeSubscriptions[0].subscriptionUrl} />
      )}

      <section className={styles.section} id="plans">
        <div className={styles.heading}><span className={styles.kicker}>ТАРИФЫ</span><h2>Выберите срок подписки</h2><p>Без автоматического продления и скрытых списаний.</p></div>
        <div className={styles.plans}>
          <article><h3>Пробный доступ</h3><p>Проверьте скорость и стабильность сервиса.</p><strong>0 ₽</strong><small>24 часа</small><ul><li>Полный функционал</li><li>Без привязки карты</li><li>Одна активация</li></ul><button onClick={startTrial} disabled={!!loading}>Попробовать бесплатно</button></article>
          <article><h3>1 месяц</h3><p>Для регулярного использования на ваших устройствах.</p><strong>{price1} ₽</strong><small>за месяц</small><ul><li>Телефон и компьютер</li><li>Безлимитный трафик</li><li>Поддержка при настройке</li></ul><button onClick={() => startCheckout('1m')}>Выбрать</button></article>
          <article className={`${styles.featured} ${contrast.featured}`}><em>ВЫГОДНО</em><h3>3 месяца</h3><p>Стабильное подключение по выгодной цене.</p><strong>{price3} ₽</strong><small>за 3 месяца</small><ul><li>Экономия по тарифу</li><li>Телефон и компьютер</li><li>Поддержка при настройке</li></ul><button onClick={() => startCheckout('3m')}>Выбрать</button></article>
        </div>
      </section>

      <section className={styles.section} id="setup">
        <div className={styles.heading}><span className={styles.kicker}>ПОДКЛЮЧЕНИЕ</span><h2>Три простых шага</h2></div>
        <div className={`${styles.steps} ${workflow.steps}`}>
          <article>
            <b>01</b><h3>Подтвердите email</h3><p>Так ключ не потеряется при смене телефона или компьютера.</p>
            <button className={workflow.stepAction} type="button" onClick={openAccount}>Войти по email</button>
          </article>
          <article><b>02</b><h3>Получите ключ</h3><p>После оформления ключ появится в разделе «Мои VPN».</p></article>
          <article>
            <b>03</b><h3>Добавьте в приложение</h3><p>Импортируйте ключ в Hiddify и включите защищённое соединение.</p>
            <VpnAppDownloads apps={appLinks} align="right" />
          </article>
        </div>
      </section>

      <aside className={styles.legal} id="legal"><strong>Правовая информация.</strong> Сервис предназначен исключительно для обеспечения безопасности и конфиденциальности интернет-соединения. Пользователь обязан соблюдать применимое законодательство и не использовать сервис для доступа к ресурсам, доступ к которым запрещён, либо для совершения иных противоправных действий.</aside>

      {checkout && (
        <div className={styles.modal} role="dialog" aria-modal="true" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckout(null); }}>
          <div className={styles.modalCard} aria-labelledby="vpn-checkout-title"><button className={styles.close} onClick={() => setCheckout(null)} aria-label="Закрыть">×</button><span className={styles.kicker}>ОФОРМЛЕНИЕ</span><h2 id="vpn-checkout-title">{checkout === '1m' ? '1 месяц' : '3 месяца'}</h2><p>Покупка будет привязана к подтверждённой почте. Платёж откроется в новой вкладке, а ключ появится в разделе «Мои VPN».</p><button className={styles.pay} onClick={() => createPayment(checkout, 'ru')} disabled={loading === 'order'}>Карта МИР или СБП · {checkout === '1m' ? price1 : price3} ₽</button><button className={styles.payAlt} onClick={() => createPayment(checkout, 'eu')} disabled={loading === 'order'}>Visa / Mastercard / криптовалюта</button></div>
        </div>
      )}
      <VpnEmailVerification
        key={verificationOpen ? verificationPurpose : 'closed'}
        open={verificationOpen}
        purpose={verificationPurpose}
        busy={verificationBusy}
        error={verificationError}
        onClose={() => { setVerificationOpen(false); setPendingPlan(null); }}
        onRequestCode={requestEmailCode}
        onVerify={verifyEmail}
      />
    </main>
  );
}

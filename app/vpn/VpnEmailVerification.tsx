'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './VpnEmailVerification.module.css';

export type VerificationPurpose = 'account' | 'purchase' | 'trial';

type Props = {
  open: boolean;
  purpose: VerificationPurpose;
  busy: boolean;
  error: string;
  onClose: () => void;
  onRequestCode: (email: string) => Promise<boolean>;
  onVerify: (email: string, code: string) => Promise<void>;
};

const COPY: Record<VerificationPurpose, { kicker: string; title: string; text: string; submit: string }> = {
  account: {
    kicker: 'МОИ VPN',
    title: 'Войдите по email',
    text: 'Введите почту, которую указывали при покупке. После подтверждения мы покажем все ваши VPN-ключи.',
    submit: 'Подтвердить и показать ключи',
  },
  purchase: {
    kicker: 'СОХРАНЕНИЕ ДОСТУПА',
    title: 'Привяжите покупку к email',
    text: 'На эту почту придёт код. В дальнейшем по ней вы сможете открыть ключ на любом устройстве.',
    submit: 'Подтвердить и продолжить',
  },
  trial: {
    kicker: 'ЗАЩИТА ПРОБНОГО ДОСТУПА',
    title: 'Подтвердите email',
    text: 'Мы отправим шестизначный код. После подтверждения сразу активируем бесплатный доступ.',
    submit: 'Подтвердить и получить VPN',
  },
};

export function VpnEmailVerification({
  open,
  purpose,
  busy,
  error,
  onClose,
  onRequestCode,
  onVerify,
}: Props) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const copy = COPY[purpose];

  if (!open) return null;

  function close() {
    setCode('');
    setStep('email');
    onClose();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (step === 'email') {
      const sent = await onRequestCode(email);
      if (sent) setStep('code');
      return;
    }
    await onVerify(email, code);
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="vpn-email-title" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <form className={styles.card} onSubmit={submit}>
        <button className={styles.close} type="button" onClick={close} aria-label="Закрыть">×</button>
        <span className={styles.kicker}>{copy.kicker}</span>
        <h2 id="vpn-email-title">{copy.title}</h2>
        <p>{copy.text}</p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            disabled={busy || step === 'code'}
            autoFocus={step === 'email'}
            required
          />
        </label>

        {step === 'code' && (
          <label>
            Код из письма
            <input
              className={styles.code}
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              autoComplete="one-time-code"
              autoFocus
              disabled={busy}
              required
            />
          </label>
        )}

        {error && <div className={styles.error} role="alert">{error}</div>}

        <button className={styles.submit} type="submit" disabled={busy}>
          {busy ? 'Проверяем…' : step === 'email' ? 'Получить код' : copy.submit}
        </button>
        {step === 'code' && (
          <button className={styles.change} type="button" onClick={() => { setStep('email'); setCode(''); }} disabled={busy}>
            Изменить email
          </button>
        )}
        <small>Код действует 10 минут. Не сообщайте его другим людям.</small>
      </form>
    </div>
  );
}

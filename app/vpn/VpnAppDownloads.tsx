'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VpnAppDownloads.module.css';

export type VpnAppLinks = Record<'android' | 'ios' | 'windows' | 'macos', string>;

interface VpnAppDownloadsProps {
  apps: VpnAppLinks;
  label?: string;
  align?: 'left' | 'right';
}

const options = [
  { id: 'android', label: 'Android', icon: '◆' },
  { id: 'ios', label: 'iPhone', icon: '' },
  { id: 'windows', label: 'ПК', icon: '⊞' },
] as const;

export function VpnAppDownloads({ apps, label = 'Скачать приложение', align = 'left' }: VpnAppDownloadsProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function close(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">↓</span>
        {label}
        <i aria-hidden="true">⌄</i>
      </button>

      {open && (
        <div className={`${styles.menu} ${align === 'right' ? styles.alignRight : ''}`} role="menu" aria-label="Выберите платформу">
          <strong>Выберите платформу</strong>
          {options.map((option) => (
            <a
              href={apps[option.id]}
              key={option.id}
              role="menuitem"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">{option.icon}</span>
              {option.label}
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

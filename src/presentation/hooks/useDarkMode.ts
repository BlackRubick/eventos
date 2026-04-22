import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(dark));
  }, [dark]);

  useEffect(() => {
    // Sincronizar con cambios externos (por ejemplo, otra pestaña)
    const handler = () => {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) setDark(stored === 'true');
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return [dark, setDark] as const;
}

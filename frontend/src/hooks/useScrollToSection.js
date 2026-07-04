import { useCallback } from 'react';

export function useScrollToSection() {
  const scrollTo = useCallback((href) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return scrollTo;
}

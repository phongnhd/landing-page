import { useState, useEffect } from 'react';
import { Menu, MoonStar, Search, SunMedium, User, X, ChevronLeft, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const scrollTo = useScrollToSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleNavClick = (href) => {
    scrollTo(href);
    setIsOpen(false);
  };

  const fg = scrolled ? 'text-slate-800 dark:text-white/90' : 'text-white';
  const fgHover = scrolled ? 'hover:text-slate-400 dark:hover:text-white/70' : 'hover:text-white/70';
  const iconBtn = scrolled
    ? 'text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:text-white/75 dark:hover:border-white/20 dark:hover:bg-white/5'
    : 'text-white hover:border-white/30 hover:bg-white/10';

  const mainMenuItems = [
    { label: "Máy bay", href: "#drones" },
    { label: "Handheld", href: "#handheld" },
    { label: "Công nghệ sống", href: "#lifestyle" },
    { label: "Chuyên dụng", href: "#specialized" },
    { label: "Khám phá", href: "#explore" },
    { label: "Hỗ trợ", href: "#support" },
    { label: "Nơi mua", href: "#where-to-buy" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-lg shadow-slate-950/10 dark:shadow-black/20' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }} className="flex items-center">
            <img src="/logo.png" alt="NextTech" className={`h-10 w-auto object-contain transition-all duration-300 ${
              scrolled ? '' : 'brightness-0 invert'
            }`} />
          </a>
          <ul className="hidden md:flex items-center gap-9 ml-10">
            {mainMenuItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`text-[14px] font-medium tracking-wide transition-colors duration-300 ${fg} ${fgHover}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button type="button" className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-transparent transition-all duration-300 ${iconBtn}`} aria-label="Tìm kiếm">
            <Search className="h-5 w-5" />
          </button>
          <button type="button" className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-transparent transition-all duration-300 ${iconBtn}`} aria-label="Tài khoản">
            <User className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => setIsDark((value) => !value)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
              scrolled ? 'glass text-slate-700 hover:text-slate-950 dark:text-white/75 dark:hover:text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`} aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}>
            {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>
          <Button size="sm" onClick={() => handleNavClick('#newsletter')}>Đặt trước ngay</Button>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <button type="button" className={`p-2 transition-colors duration-300 ${
            scrolled ? 'text-slate-700 hover:text-slate-950 dark:text-white/80 dark:hover:text-white' : 'text-white hover:text-white/70'
          }`} aria-label="Tìm kiếm">
            <Search className="w-5 h-5" />
          </button>
          <button type="button" className={`p-2 transition-colors duration-300 ${
            scrolled ? 'text-slate-700 hover:text-slate-950 dark:text-white/80 dark:hover:text-white' : 'text-white hover:text-white/70'
          }`} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div id="mobile-menu" initial={{ y: '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 md:hidden bg-white dark:bg-[#1c1c1e] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-white/5">
                <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }} className="flex items-center">
                  <img src="/logo.png" alt="NextTech" className="h-8 w-auto object-contain" />
                </a>
                <button type="button" className="p-2 text-slate-700 hover:text-slate-950 dark:text-white/80 dark:hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)} aria-label="Đóng menu">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 px-4 py-6">
                <ul className="space-y-1">
                  {mainMenuItems.map((item, index) => (
                    <motion.li key={item.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
                      <a href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                        className="flex items-center justify-between px-4 py-4 text-lg font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors dark:text-white/80 dark:hover:text-white dark:hover:bg-white/5 group">
                        <span>{item.label}</span>
                        <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:text-white/40 dark:group-hover:text-white/60 transition-colors" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div className="px-4 pb-6 pt-2 border-t border-slate-200 dark:border-white/5 space-y-3"
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: mainMenuItems.length * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="space-y-1">
                  <button onClick={() => setIsDark((value) => !value)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5">
                    <span>{isDark ? 'Chế độ sáng' : 'Chế độ tối'}</span>
                    {isDark ? <SunMedium className="w-4 h-4 text-slate-400 dark:text-white/30" /> : <MoonStar className="w-4 h-4 text-slate-400 dark:text-white/30" />}
                  </button>
                  <a href="#" className="flex items-center justify-between px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5">
                    <span>Đăng nhập DJI</span>
                    <LogIn className="w-4 h-4 text-slate-400 dark:text-white/30" />
                  </a>
                </div>
                <Button className="w-full text-base py-3.5" onClick={() => handleNavClick('#newsletter')}>
                  Đặt trước ngay
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
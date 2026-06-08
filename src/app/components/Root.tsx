import { Outlet, Link, useLocation } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LABELS = {
  en: ['HOME', 'INFO', 'GALLERY', 'CONTACT'],
  th: ['หน้าแรก', 'ข้อมูล', 'แกลเลอรี', 'ติดต่อ'],
};
const NAV_PATHS = ['/', '/info', '/gallery', '/contact'];

export function Root() {
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLight = !scrolled && isHome;
  const textColor = navLight ? 'text-white' : 'text-[#0a0a0a]';
  const borderColor = navLight ? 'border-white/30' : 'border-[#0a0a0a]/20';

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Fixed navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navLight ? '' : 'bg-white/96 backdrop-blur-sm border-b border-[#e5e5e5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`tracking-[0.35em] text-sm uppercase transition-colors duration-500 ${textColor}`}
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.35em' }}
          >
            PODERA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LABELS[lang].map((label, i) => {
              const active = location.pathname === NAV_PATHS[i];
              return (
                <Link
                  key={NAV_PATHS[i]}
                  to={NAV_PATHS[i]}
                  className={`text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:opacity-50 ${textColor} ${active ? 'opacity-40' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className={`text-[10px] tracking-[0.2em] uppercase border px-3 py-1.5 transition-all duration-300 hover:opacity-60 ${textColor} ${borderColor}`}
            >
              {lang === 'en' ? 'ไทย' : 'EN'}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[1px] w-5 transition-all duration-300 origin-center ${navLight ? 'bg-white' : 'bg-[#0a0a0a]'} ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block h-[1px] w-5 transition-all duration-300 ${navLight ? 'bg-white' : 'bg-[#0a0a0a]'} ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white border-t border-[#e5e5e5] overflow-hidden"
            >
              {NAV_LABELS[lang].map((label, i) => (
                <Link
                  key={NAV_PATHS[i]}
                  to={NAV_PATHS[i]}
                  className="block px-6 py-5 text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a] border-b border-[#e5e5e5] hover:bg-[#f8f8f8] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-16">
            <div>
              <div
                className="text-3xl tracking-[0.35em] uppercase mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                PODERA
              </div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40">
                {lang === 'en' ? 'Luxury Movable Sauna · Crafted in Thailand' : 'เซาน่าหรูเคลื่อนที่ · สร้างในประเทศไทย'}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                {lang === 'en' ? 'Navigation' : 'ลิงก์'}
              </div>
              <div className="flex flex-col gap-2">
                {NAV_LABELS[lang].map((label, i) => (
                  <Link
                    key={NAV_PATHS[i]}
                    to={NAV_PATHS[i]}
                    className="text-[10px] tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-[10px] tracking-widest text-white/25 uppercase">© PODERA. ALL RIGHTS RESERVED.</p>
            <p className="text-[10px] tracking-widest text-white/25 uppercase">Thailand</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

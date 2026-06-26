import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes, FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const NAVBAR_H = 72; // px — keep in sync with Herosections NAVBAR_H

const navLinks = [
  { title: 'Início',      id: 'home',           path: '#home'           },
  { title: 'Sobre',       id: 'about',          path: '#about'          },
  { title: 'Formação',    id: 'education',      path: '#education'      },
  { title: 'Experiência', id: 'experiencia',    path: '#experiencia'    },
  { title: 'Projetos',    id: 'projects',       path: '#projects'       },
];

const socialLinks = [
  { href: 'https://linkedin.com/in/danilo-lira-82b17516b',     icon: <FaLinkedin size={18} />, label: 'LinkedIn'  },
  { href: 'https://github.com/danilohenriquesilvalira',         icon: <FaGithub   size={18} />, label: 'GitHub'    },
  { href: 'mailto:danilosilvalira@hotmail.com',                 icon: <FaEnvelope size={18} />, label: 'Email'     },
  { href: 'https://wa.me/351935479757',                         icon: <FaWhatsapp size={18} />, label: 'WhatsApp'  },
];

const LogoSVG = () => (
  <svg viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 flex-shrink-0">
    <g filter="url(#nb_f2)">
      <path d="M12.8699 1H11.0343C11.0343 2.15566 11.0343 2.8329 11.0343 3.98856M12.8699 1H14.7449M12.8699 1V3.95926M12.8699 17.2524V3.95926M11.0343 17.2524C11.0343 12.092 11.0343 9.14899 11.0343 3.98856M11.0343 3.98856L6.80469 3.95926C6.80469 9.94354 6.80469 13.2987 6.80469 19.283V19.7517M12.8699 3.95926L15.0086 3.98856" stroke="#111827" strokeWidth="1.3"/>
      <path d="M15.0156 16.7668C18.5432 16.7668 21.4029 13.9071 21.4029 10.3795C21.4029 6.85189 18.5432 3.99219 15.0156 3.99219" stroke="#2563eb" strokeWidth="1.3"/>
      <path d="M14.7483 1H15.012C20.1902 1 24.3879 5.19772 24.3879 10.3759C24.3879 15.554 20.1902 19.7517 15.012 19.7517H6.80812H5V3.5438" stroke="#111827" strokeWidth="1.3"/>
    </g>
    <defs>
      <filter id="nb_f2" x="0.5" y="0.5" width="28.4" height="27.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="bg"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="alpha"/>
        <feOffset dy="1"/><feGaussianBlur stdDeviation="1"/>
        <feComposite in2="alpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
        <feBlend in2="bg" result="shadow"/><feBlend in="SourceGraphic" in2="shadow"/>
      </filter>
    </defs>
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [active, setActive]           = useState('home');
  const [toggle, setToggle]           = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      if (isNavigating) return;
      const threshold = NAVBAR_H + 16;
      let current: string | null = null;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= threshold && bottom > 0) { current = navLinks[i].id; break; }
        }
      }
      if (window.scrollY < 200) setActive('home');
      else if (current && current !== active) setActive(current);
    };
    const throttle = () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(handleScroll, 50);
    };
    window.addEventListener('scroll', throttle);
    handleScroll();
    return () => { window.removeEventListener('scroll', throttle); if (timeoutId.current) clearTimeout(timeoutId.current); };
  }, [isNavigating, active, isHome]);

  // Fecha o drawer mobile automaticamente se o utilizador tentar rolar a página com o menu aberto
  useEffect(() => {
    if (!toggle) return;
    const closeOnScroll = () => setToggle(false);
    window.addEventListener('scroll', closeOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', closeOnScroll);
  }, [toggle]);

  const go = (id: string) => {
    setToggle(false);

    // Se estivermos numa página diferente (ex: /projetos), navega para o
    // Início e só depois rola até à secção pedida.
    if (!isHome) {
      navigate('/', { state: id === 'home' ? null : { scrollTo: id } });
      setActive(id);
      return;
    }

    setActive(id); setIsNavigating(true);
    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        const el = document.getElementById(id);
        if (el) {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_H, behavior: 'smooth' });
          window.history.pushState(null, '', `#${id}`);
        }
      }
      setTimeout(() => setIsNavigating(false), 1000);
    }, 80);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200"
      style={{ height: NAVBAR_H }}
    >
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 h-full flex items-center justify-between">

        {/* Logo */}
        <a href="#home" onClick={e => { e.preventDefault(); go('home'); }}
           className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <LogoSVG />
          <div>
            <p className="text-[15px] font-bold text-slate-900 leading-none tracking-tight">Danilo Lira</p>
            <p className="text-[10px] text-slate-400 leading-none mt-1 tracking-wide">Automação Industrial · IT/OT</p>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => (
            <a key={link.id} href={link.path}
               onClick={e => { e.preventDefault(); go(link.id); }}
               className={`relative px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                 active === link.id
                   ? 'text-blue-600 font-semibold'
                   : 'text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50'
               }`}
            >
              {link.title}
              {/* Active underline */}
              {active === link.id && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop social */}
        <div className="hidden md:flex items-center gap-1.5 border-l border-slate-200 ml-4 pl-4">
          {socialLinks.map(s => (
            <a key={s.label} href={s.href}
               target={s.href.startsWith('http') ? '_blank' : undefined}
               rel="noopener noreferrer" aria-label={s.label}
               className="p-2.5 text-slate-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150">
              {s.icon}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setToggle(!toggle)} aria-label="Menu"
                className="md:hidden w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center">
          <div className="flex flex-col gap-[5px] w-5">
            <span className={`h-px w-5 bg-slate-800 transition-all duration-300 ${toggle ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`h-px w-5 bg-slate-800 transition-all duration-300 ${toggle ? 'opacity-0' : ''}`} />
            <span className={`h-px w-5 bg-slate-800 transition-all duration-300 ${toggle ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </div>
        </button>

      </div>

      {/* Mobile drawer */}
      {toggle && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 md:hidden z-40" onClick={() => setToggle(false)} />
          <div className="fixed top-0 right-0 w-72 h-full bg-white border-l border-slate-200 z-50 flex flex-col">
            <div className="flex items-center justify-between px-5 border-b border-slate-100" style={{ height: NAVBAR_H }}>
              <a href="#home" onClick={e => { e.preventDefault(); go('home'); }}
                 className="flex items-center gap-2.5">
                <LogoSVG />
                <p className="text-[15px] font-bold text-slate-900">Danilo Lira</p>
              </a>
              <button onClick={() => setToggle(false)}
                      className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <FaTimes size={13} />
              </button>
            </div>
            <div className="flex-1 px-4 py-4 flex flex-col gap-0.5">
              {navLinks.map(link => (
                <a key={link.id} href={link.path}
                   onClick={e => { e.preventDefault(); go(link.id); }}
                   className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                     active === link.id
                       ? 'text-blue-600 font-semibold bg-blue-50'
                       : 'text-slate-700 font-medium hover:bg-slate-50'
                   }`}>
                  {link.title}
                </a>
              ))}
            </div>
            <div className="px-5 py-5 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Conectar</p>
              <div className="flex gap-2">
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href}
                     target={s.href.startsWith('http') ? '_blank' : undefined}
                     rel="noopener noreferrer" aria-label={s.label}
                     className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600
                                flex items-center justify-center text-slate-600 transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

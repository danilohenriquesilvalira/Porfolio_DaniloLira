import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaTimes, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

interface NavLink {
  title: string;
  id: string;
  path: string;
}

const navLinks: NavLink[] = [
  { title: 'Início', id: 'home', path: '#home' },
  { title: 'Tech Stack', id: 'tech-expertise', path: '#tech-expertise' },
  { title: 'Experiência', id: 'experiencia', path: '#experiencia' },
  { title: 'Projetos', id: 'projects', path: '#projects' },
  { title: 'Contatos', id: 'contact', path: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState<string>('home');
  const [toggle, setToggle] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const timeoutId = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating) return;

      const scrollThreshold = 50;

      let currentActiveSection: string | null = null;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= scrollThreshold && rect.bottom > 0) {
            currentActiveSection = link.id;
            break;
          }
        }
      }

      if (window.scrollY < 200 && active !== 'home') {
          setActive('home');
      } else if (currentActiveSection && currentActiveSection !== active) {
        setActive(currentActiveSection);
      }
    };

    const throttledScroll = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current as number);
      }
      timeoutId.current = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current as number);
      }
    };
  }, [isNavigating, active]);

  const handleLinkClick = (id: string) => {
    setActive(id);
    setToggle(false);
    setIsNavigating(true);

    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          const elementPosition = targetElement.offsetTop; 
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
          window.history.pushState(null, '', `#${id}`);
        } else {
          console.warn(`Element with id '${id}' not found`);
        }
      }

      setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
    }, 100);
  };

  const LogoSVG = () => (
    <svg
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 translate-y-[10px]" // Adicionado translate-y-[2px] aqui
    >
      <g filter="url(#filter0_d_2905_557)">
        <path d="M12.8699 1H11.0343C11.0343 2.15566 11.0343 2.8329 11.0343 3.98856M12.8699 1H14.7449M12.8699 1V3.95926M12.8699 17.2524V3.95926M11.0343 17.2524C11.0343 12.092 11.0343 9.14899 11.0343 3.98856M11.0343 3.98856L6.80469 3.95926C6.80469 9.94354 6.80469 13.2987 6.80469 19.283V19.7517M12.8699 3.95926L15.0086 3.98856" stroke="white"/>
        <path d="M15.0156 16.7668C18.5432 16.7668 21.4029 13.9071 21.4029 10.3795C21.4029 6.85189 18.5432 3.99219 15.0156 3.99219" stroke="#2563eb"/>
        <path d="M14.7483 1H15.012C20.1902 1 24.3879 5.19772 24.3879 10.3759C24.3879 15.554 20.1902 19.7517 15.012 19.7517H6.80812H5V3.5438" stroke="white"/>
      </g>
      <defs>
        <filter id="filter0_d_2905_557" x="0.5" y="0.5" width="28.3906" height="27.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2905_557"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2905_557" result="shape"/>
        </filter>
      </defs>
    </svg>
  );

  return (
    <nav className="relative z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 py-2">

          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
          >
            <LogoSVG />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  active === link.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
              >
                {link.title}
                {active === link.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-sm" />
                )}
              </Link>
            ))}

            {/* Social Links for Desktop */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-blue-600/30">
              <a
                href="https://linkedin.com/in/danilo-lira-82b17516b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:bg-blue-600/10 p-2 rounded-lg transition-all"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="https://github.com/danilohenriquesilvalira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:bg-blue-600/10 p-2 rounded-lg transition-all"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="mailto:contato@danilolira.com"
                className="text-gray-300 hover:text-white hover:bg-blue-600/10 p-2 rounded-lg transition-all"
              >
                <FaEnvelope size={16} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setToggle(!toggle)}
            className="md:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 backdrop-blur-sm flex items-center justify-center hover:from-blue-600/30 hover:to-blue-800/30 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${toggle ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 my-1.5 ${toggle ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${toggle ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

      {/* Mobile Menu Overlay and Panel */}
      {toggle && (
        <>
          {/* Overlay to dim content and close menu on click outside */}
          <div
            className="fixed inset-0 bg-black/70 md:hidden z-40 transition-opacity duration-300"
            onClick={() => setToggle(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 w-80 min-h-screen bg-black/95 backdrop-blur-sm border-l border-blue-600/30 shadow-2xl md:hidden z-50 transform translate-x-0 transition-transform duration-300 ease-out flex flex-col">
            
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-blue-600/20">
              <Link
                href="#home"
                className="flex items-center text-white font-semibold text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('home');
                }}
              >
                <LogoSVG />
              </Link>
              <button
                onClick={() => setToggle(false)}
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Navigation Links and Social Links Container */}
            <div className="flex-1 px-6 py-8 flex flex-col justify-between">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.id}
                    href={link.path}
                    className={`relative py-4 px-3 font-medium transition-colors duration-300 w-full text-base ${
                      active === link.id
                        ? 'text-white border-l-4 border-blue-600 pl-4'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* Social Links (now pushed to the bottom by justify-between) */}
              <div className="mt-auto p-6 border-t border-blue-600/20">
                <p className="text-gray-300 text-sm text-center font-medium mb-6">Conecte-se comigo</p>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://linkedin.com/in/danilo-lira-82b17516b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-600 transition-colors duration-300 p-2"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href="https://github.com/danilohenriquesilvalira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-300 p-2"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href="mailto:contato@danilolira.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 p-2"
                  >
                    <FaEnvelope size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
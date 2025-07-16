'use client';  // ✅ ADICIONE ESTA LINHA

import { useState, useEffect } from 'react';
import { FaTimes, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

// Definindo types para melhor organização
interface NavLink {
  title: string;
  id: string;
  path: string;
}

interface ScreenSize {
  width: number;
  height: number;
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const navLinks: NavLink[] = [
  { title: 'Início', id: 'home', path: '#home' },
  { title: 'Experiência', id: 'experiencia', path: '#experiencia' },
  { title: 'Projetos', id: 'projects', path: '#projects' },
  { title: 'Tech Stack', id: 'tech-expertise', path: '#tech-expertise' },
  { title: 'Contatos', id: 'contact', path: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [toggle, setToggle] = useState(false);
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
    breakpoint: 'xs'
  });

  // Detecta seção ativa baseada no scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;

      // Se estiver no topo da página (primeiros 200px), marcar como 'home'
      if (window.scrollY <= 200) {
        setActive('home');
        return;
      }

      // Procurar pela seção ativa
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);

        if (element) {
          const offsetTop = element.offsetTop;

          if (scrollPosition >= offsetTop - 150) {
            setActive(sectionId);
            break;
          }
        }
      }
    };

    // Detecta hash inicial
    const hash = window.location.hash.replace('#', '');
    if (hash && navLinks.find(link => link.id === hash)) {
      setActive(hash);
    } else if (window.scrollY <= 200) {
      setActive('home');
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez no carregamento

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hook personalizado para detectar tamanho da tela
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      let breakpoint: ScreenSize['breakpoint'] = 'xs';
      if (width >= 2560) breakpoint = '4xl';
      else if (width >= 1921) breakpoint = '3xl';
      else if (width >= 1441) breakpoint = '2xl';
      else if (width >= 1200) breakpoint = 'xl';
      else if (width >= 1024) breakpoint = 'lg';
      else if (width >= 768) breakpoint = 'md';
      else if (width >= 480) breakpoint = 'sm';

      setScreenSize({ width, height, breakpoint });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Função para obter estilos do logo baseado no breakpoint
  const getLogoStyles = () => {
    const baseStyles = "flex items-start text-decoration-none transition-all duration-300 relative z-10";

    switch (screenSize.breakpoint) {
      case '4xl':
        return {
          container: baseStyles,
          icon: "w-32 h-32 flex items-center justify-center bg-transparent border-none transition-all duration-300 p-1 relative flex-shrink-0",
          transform: "transform -translate-x-8 -translate-y-4"
        };
      case '3xl':
        return {
          container: baseStyles,
          icon: "w-36 h-36 flex items-center justify-center bg-transparent border-none transition-all duration-300 p-1 relative flex-shrink-0",
          transform: "transform -translate-x-24 -translate-y-3"
        };
      case '2xl':
        return {
          container: baseStyles,
          icon: "w-24 h-24 flex items-center justify-center bg-transparent border-none transition-all duration-300 p-1 relative flex-shrink-0",
          transform: "transform translate-y-[-15px]"
        };
      case 'xl':
        return {
          container: baseStyles,
          icon: "w-20 h-20 flex items-center justify-center bg-transparent border-none transition-all duration-300 p-1 relative flex-shrink-0",
          transform: "transform translate-y-[-8px]"
        };
      case 'lg':
        return {
          container: baseStyles,
          icon: "w-16 h-16 flex items-center justify-center bg-transparent border-none transition-all duration-300 p-1 relative flex-shrink-0",
          transform: "transform translate-y-[-5px]"
        };
      default: // xs, sm, md (mobile and tablet)
        return {
          container: baseStyles,
          icon: "w-16 h-16 flex items-center justify-center bg-transparent border-none transition-all duration-300 p-1 relative flex-shrink-0",
          // Ajustado: Move o logo um pouco para baixo no mobile
          transform: "transform -translate-y-2"
        };
    }
  };

  // Função para obter estilos do desktop navigation
  const getDesktopNavStyles = () => {
    const isDesktop = screenSize.breakpoint === 'lg' || screenSize.breakpoint === 'xl' ||
                       screenSize.breakpoint === '2xl' || screenSize.breakpoint === '3xl' ||
                       screenSize.breakpoint === '4xl';

    if (!isDesktop) return { display: 'none' };

    switch (screenSize.breakpoint) {
      case '4xl':
        return {
          container: "flex flex-row gap-12 items-start m-0 p-0 pt-4 h-auto justify-center transform translate-x-8 translate-y-[-16px]",
          linkText: "text-xl",
          gap: "gap-12"
        };
      case '3xl':
        return {
          container: "flex flex-row gap-12 items-center m-0 p-0 pt-4 h-auto justify-center transform translate-x-40 translate-y-2",
          linkText: "text-lg",
          gap: "gap-12"
        };
      case '2xl':
        return {
          container: "flex flex-row gap-8 items-center m-0 p-0 pt-4 h-auto justify-center transform translate-y-[-12px]",
          linkText: "text-lg",
          gap: "gap-8"
        };
      case 'xl':
        return {
          container: "flex flex-row gap-6 items-start m-0 p-0 pt-4 h-auto justify-center transform translate-y-[-8px]",
          linkText: "text-base",
          gap: "gap-6"
        };
      case 'lg':
        return {
          container: "flex flex-row gap-5 items-start m-0 p-0 pt-4 h-auto justify-center transform translate-y-[-5px]",
          linkText: "text-sm",
          gap: "gap-5"
        };
      default:
        return {
          container: "flex flex-row gap-8 items-start m-0 p-0 pt-4 h-auto justify-center",
          linkText: "text-base",
          gap: "gap-8"
        };
    }
  };

  const handleLinkClick = (id: string) => {
    setActive(id);
    setToggle(false);

    if (id === 'home') {
      // Se for home, volta ao topo
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '/');
    } else {
      // Para outras seções, busca pelo ID
      const targetElement = document.getElementById(id);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fixed
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        // Atualiza hash na URL
        window.history.pushState(null, '', `#${id}`);
      } else {
        console.log(`Seção '${id}' não encontrada. Verifique se o ID existe no Home.tsx`);
      }
    }
  };

  const logoStyles = getLogoStyles();
  const desktopStyles = getDesktopNavStyles();
  const isDesktop = screenSize.breakpoint === 'lg' || screenSize.breakpoint === 'xl' ||
                       screenSize.breakpoint === '2xl' || screenSize.breakpoint === '3xl' ||
                       screenSize.breakpoint === '4xl';

  const LogoSVG = ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${className}`}
    >
      <g filter="url(#filter0_d_2905_557)">
        <path d="M12.8699 1H11.0343C11.0343 2.15566 11.0343 2.8329 11.0343 3.98856M12.8699 1H14.7449M12.8699 1V3.95926M12.8699 17.2524V3.95926M11.0343 17.2524C11.0343 12.092 11.0343 9.14899 11.0343 3.98856M11.0343 3.98856L6.80469 3.95926C6.80469 9.94354 6.80469 13.2987 6.80469 19.283V19.7517M12.8699 3.95926L15.0086 3.98856" stroke="white"/>
        <path d="M15.0156 16.7668C18.5432 16.7668 21.4029 13.9071 21.4029 10.3795C21.4029 6.85189 18.5432 3.99219 15.0156 3.99219" stroke="white"/>
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
    <nav className="absolute top-0 left-0 right-0 z-50 w-full flex items-center py-4 bg-transparent font-['Poppins']">
      <div
        className="w-full flex justify-between items-start max-w-screen-xl mx-auto min-h-16 pt-4"
        style={{
          padding: screenSize.breakpoint === 'xs' ? '0 0.5rem' :
                   screenSize.breakpoint === 'sm' ? '0 1rem' :
                   screenSize.breakpoint === 'md' ? '0 1.5rem' :
                   screenSize.breakpoint === 'lg' ? '0 1.5rem' :
                   screenSize.breakpoint === 'xl' ? '0 1.5rem' :
                   screenSize.breakpoint === '2xl' ? '0 0rem' :
                   screenSize.breakpoint === '3xl' ? '0 0rem' : '0 3rem'
        }}
      >

        {/* Logo */}
        <a
          href="#home"
          className={`${logoStyles.container} hover:opacity-80 pt-2`}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
        >
          <div className={`${logoStyles.icon} ${logoStyles.transform}`}>
            <LogoSVG />
          </div>
        </a>

        {/* Desktop Navigation */}
        {isDesktop && (
          <ul className={desktopStyles.container} style={{ display: 'flex' }}>
            {navLinks.map((link) => (
              <li key={link.id} className="relative flex items-center">
                <a
                  href={link.path}
                  className={`text-gray-300 no-underline font-medium transition-all duration-300 relative flex items-center leading-none hover:text-white ${desktopStyles.linkText} ${
                    active === link.id ? 'text-white' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                >
                  {link.title}
                  {active === link.id && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-sm" />
                  )}
                </a>
              </li>
            ))}

            {/* Social Links Desktop */}
            <div
              className={`ml-6 flex ${desktopStyles.gap} items-start border-l border-gray-600 pl-6 pt-4 h-auto justify-center ${
                screenSize.breakpoint === '2xl' || screenSize.breakpoint === '3xl' || screenSize.breakpoint === '4xl'
                  ? 'transform translate-y-[-12px]' : 'transform translate-y-[-8px]'
              }`}
            >
              <a
                href="https://linkedin.com/in/danilo-lira-82b17516b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 no-underline transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 hover:text-white hover:bg-white hover:bg-opacity-10"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/danilohenriquesilvalira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 no-underline transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 hover:text-white hover:bg-white hover:bg-opacity-10"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:contato@danilolira.com"
                className="text-gray-300 no-underline transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 hover:text-white hover:bg-white hover:bg-opacity-10"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </ul>
        )}

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <div className="flex flex-1 justify-end items-center">
            <button
              onClick={() => setToggle(!toggle)}
              className={`relative w-12 h-12 rounded-2xl flex justify-center items-center bg-white bg-opacity-10 border border-white border-opacity-20 cursor-pointer transition-all duration-300 hover:bg-white hover:bg-opacity-20 ${
                toggle ? 'bg-white' : ''
              }`}
              aria-label={toggle ? "Fechar menu" : "Abrir menu"}
            >
              <div className="flex flex-col justify-center items-center w-5 h-5 relative">
                <span
                  className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-300 my-0.5 ${
                    toggle ? 'rotate-45 translate-y-0.5 bg-gray-800' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-300 my-0.5 ${
                    toggle ? 'opacity-0 bg-gray-800' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-300 my-0.5 ${
                    toggle ? '-rotate-45 -translate-y-1.5 bg-gray-800' : ''
                  }`}
                />
              </div>
            </button>

            {toggle && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setToggle(false)}
                />

                {/* Mobile Menu */}
                <div className="fixed top-0 right-0 h-screen w-80 bg-gray-900 bg-opacity-95 backdrop-blur-3xl z-50 border-l border-white border-opacity-10 shadow-2xl"
                     style={{
                       background: 'rgba(17, 24, 39, 0.95)',
                       backdropFilter: 'blur(20px)',
                       borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                     }}>
                  <div className="flex flex-col h-full">

                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10">
                      <div className="flex items-center">
                        <span className="text-white font-semibold text-lg">Menu</span>
                      </div>
                      <button
                        onClick={() => setToggle(false)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 bg-white bg-opacity-10 border border-white border-opacity-20 cursor-pointer transition-all duration-300 hover:text-white hover:bg-white hover:bg-opacity-20"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {/* Mobile Links */}
                    <div className="flex-1 px-6 py-8">
                      <ul className="list-none m-0 p-0 flex flex-col gap-4">
                        {navLinks.map((link, index) => (
                          <li key={link.id} className="w-full">
                            <a
                              href={link.path}
                              className={`w-full flex items-center gap-4 py-4 px-6 rounded-xl font-medium text-base no-underline transition-all duration-300 transform hover:translate-x-1 ${
                                active === link.id 
                                  ? 'text-white bg-white bg-opacity-10 border border-white border-opacity-20 shadow-lg' 
                                  : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(link.id);
                              }}
                              style={{
                                animationDelay: `${index * 0.1}s`,
                                animation: 'slideInRight 0.3s ease-out forwards'
                              }}
                            >
                              <span
                                className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${
                                  active === link.id ? 'bg-white shadow-md' : 'bg-gray-500'
                                }`}
                              />
                              <span className="flex-1">{link.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile Social */}
                    <div className="p-6 border-t border-white border-opacity-10">
                      <p className="text-gray-300 text-sm m-0 mb-6 text-center font-medium">Conecte-se comigo</p>
                      <div className="flex justify-center gap-6">
                        <a
                          href="https://linkedin.com/in/danilo-lira-82b17516b"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 flex items-center justify-center text-gray-300 no-underline text-xl transition-all duration-300 hover:text-white hover:bg-white hover:bg-opacity-20 hover:scale-110"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin />
                        </a>
                        <a
                          href="https://github.com/danilohenriquesilvalira"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 flex items-center justify-center text-gray-300 no-underline text-xl transition-all duration-300 hover:text-white hover:bg-white hover:bg-opacity-20 hover:scale-110"
                          aria-label="GitHub"
                        >
                          <FaGithub />
                        </a>
                        <a
                          href="mailto:contato@danilolira.com"
                          className="w-12 h-12 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 flex items-center justify-center text-gray-300 no-underline text-xl transition-all duration-300 hover:text-white hover:bg-white hover:bg-opacity-20 hover:scale-110"
                          aria-label="Email"
                        >
                          <FaEnvelope />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
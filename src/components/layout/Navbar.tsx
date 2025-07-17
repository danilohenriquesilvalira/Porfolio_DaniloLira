import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import Link from 'next/link';
import { FaTimes, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

// Define a interface para os links de navegação para tipagem explícita
interface NavLink {
  title: string;
  id: string;
  path: string;
}

const navLinks: NavLink[] = [ // Explicitly type navLinks as an array of NavLink
  { title: 'Início', id: 'home', path: '#home' },
  { title: 'Tech Stack', id: 'tech-expertise', path: '#tech-expertise' }, // Reordered
  { title: 'Experiência', id: 'experiencia', path: '#experiencia' },     // Reordered
  { title: 'Projetos', id: 'projects', path: '#projects' },               // Reordered
  { title: 'Contatos', id: 'contact', path: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState<string>('home'); // Explicitly type active as string
  const [toggle, setToggle] = useState<boolean>(false); // Explicitly type toggle as boolean
  const [isNavigating, setIsNavigating] = useState<boolean>(false); // Explicitly type isNavigating as boolean
  
  // Use useRef para timeoutId para que não cause re-renders e mantenha a referência
  const timeoutId = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Se está navegando via clique, não atualiza o estado ativo pela rolagem
      if (isNavigating) return;
      
      // Obter a altura da navbar para ajustar o cálculo da posição
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      // Adicionar um pequeno buffer para garantir que a seção seja reconhecida antes
      const scrollPosition = window.scrollY + navbarHeight + 10; 

      // Array para armazenar as seções encontradas, tipado explicitamente
      const sectionsInView: { id: string; distance: number }[] = [];

      // Procura por todas as seções
      navLinks.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          // Verifica se a seção está visível
          // Ajuste os valores de -200 e +200 conforme necessário para sua layout
          if (scrollPosition >= elementTop - 200 && scrollPosition < elementBottom + 200) {
            sectionsInView.push({
              id: link.id,
              distance: Math.abs(scrollPosition - elementTop)
            });
          }
        }
      });

      // Se encontrou seções, ativa a mais próxima
      if (sectionsInView.length > 0) {
        const closestSection = sectionsInView.reduce((prev, current) => 
          prev.distance < current.distance ? prev : current
        );
        setActive(closestSection.id);
      } else if (window.scrollY <= 300) { // Mantém a lógica para 'home' se não houver seções em vista (ou no topo)
        setActive('home');
      }
    };

    // Throttle para melhor performance
    const throttledScroll = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current as number); // Type assertion for clearTimeout
      }
      timeoutId.current = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Chama imediatamente para definir o estado inicial

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current as number); // Type assertion for clearTimeout
      }
    };
  }, [isNavigating]); // Dependência isNavigating para reexecutar o efeito quando muda

  // Tipagem explícita para o parâmetro 'id'
  const handleLinkClick = (id: string) => { 
    setActive(id);
    setToggle(false);
    setIsNavigating(true);

    // Pequeno delay para garantir que o DOM está atualizado e o scroll suave funcione
    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          const navbar = document.querySelector('nav');
          const headerHeight = navbar ? navbar.offsetHeight : 0; // Use navbar height dynamically
          const elementPosition = targetElement.offsetTop - headerHeight - 10; // Subtrai a altura da navbar e um pequeno buffer
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
          window.history.pushState(null, '', `#${id}`);
        } else {
          console.warn(`Elemento com id '${id}' não encontrado`);
        }
      }
      
      // Reativa o scroll listener após a navegação ter sido concluída
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000); // Ajuste este tempo se a rolagem suave for mais longa
    }, 100);
  };

  const LogoSVG = () => (
    <svg
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 md:w-10 md:h-10"
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
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
            
            {/* Social Links */}
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
            className="md:hidden w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <div className="flex flex-col justify-center items-center w-5 h-5">
              <span className={`block h-0.5 w-full bg-white rounded-sm transition-all ${toggle ? 'rotate-45 translate-y-0.5' : ''}`} />
              <span className={`block h-0.5 w-full bg-white rounded-sm transition-all my-0.5 ${toggle ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-white rounded-sm transition-all ${toggle ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <>
            <div
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={() => setToggle(false)}
            />
            <div className="absolute top-full right-0 w-80 bg-gray-900/95 backdrop-blur-md border-l border-blue-600/20 shadow-xl md:hidden">
              <div className="flex flex-col h-screen max-h-screen">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-blue-600/20">
                  <span className="text-white font-semibold">Menu</span>
                  <button
                    onClick={() => setToggle(false)}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <div className="space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.path}
                        className={`flex items-center gap-4 py-3 px-4 rounded-lg font-medium transition-all ${
                          active === link.id
                            ? 'text-white bg-blue-600/10 border border-blue-600/20'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.id);
                        }}
                      >
                        <span className={`w-2 h-2 rounded-full ${active === link.id ? 'bg-blue-600' : 'bg-gray-600'}`} />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 border-t border-blue-600/20">
                  <p className="text-gray-300 text-sm text-center font-medium mb-4">Conecte-se comigo</p>
                  <div className="flex justify-center space-x-6">
                    <a
                      href="https://linkedin.com/in/danilo-lira-82b17516b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/10 border border-blue-600/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 hover:scale-110 transition-all"
                    >
                      <FaLinkedin size={18} />
                    </a>
                    <a
                      href="https://github.com/danilohenriquesilvalira"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/10 border border-blue-600/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 hover:scale-110 transition-all"
                    >
                      <FaGithub size={18} />
                    </a>
                    <a
                      href="mailto:contato@danilolira.com"
                      className="w-10 h-10 rounded-lg bg-white/10 border border-blue-600/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 hover:scale-110 transition-all"
                    >
                      <FaEnvelope size={18} />
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
'use client'

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavLink {
  id: string;
  title: string;
}

const navLinks: NavLink[] = [
  { id: "home", title: "Início" },
  { id: "about", title: "Sobre" },
  { id: "tech", title: "Tecnologias" },
  { id: "projects", title: "Projetos" },
  { id: "contact", title: "Contato" },
];

interface ScreenSize {
  width: number;
  height: number;
  breakpoint: string;
}

function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
    breakpoint: 'md'
  });

  useEffect(() => {
    function updateScreenSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let breakpoint = 'xs';
      if (width >= 1536) breakpoint = '2xl';
      else if (width >= 1280) breakpoint = 'xl';
      else if (width >= 1024) breakpoint = 'lg';
      else if (width >= 768) breakpoint = 'md';
      else if (width >= 640) breakpoint = 'sm';
      
      setScreenSize({ width, height, breakpoint });
    }

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth <= 768;
}

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLogoStyles = () => {
    const baseClasses = "flex items-center gap-2 cursor-pointer";
    
    switch (screenSize.breakpoint) {
      case '2xl':
      case 'xl':
        return {
          container: `${baseClasses} text-2xl font-bold`,
          text: "text-2xl",
          icon: "w-8 h-8"
        };
      case 'lg':
        return {
          container: `${baseClasses} text-xl font-bold`,
          text: "text-xl",
          icon: "w-7 h-7"
        };
      default:
        return {
          container: `${baseClasses} text-lg font-bold`,
          text: "text-lg",
          icon: "w-6 h-6"
        };
    }
  };

  const getDesktopNavStyles = () => {
    switch (screenSize.breakpoint) {
      case '2xl':
        return {
          container: "flex flex-row gap-12 items-center",
          linkText: "text-lg",
          gap: "gap-12"
        };
      case 'xl':
        return {
          container: "flex flex-row gap-8 items-center",
          linkText: "text-base",
          gap: "gap-8"
        };
      case 'lg':
        return {
          container: "flex flex-row gap-6 items-center",
          linkText: "text-sm",
          gap: "gap-6"
        };
      default:
        return {
          container: "flex flex-row gap-8 items-center",
          linkText: "text-base",
          gap: "gap-8"
        };
    }
  };

  const handleLinkClick = (id: string) => {
    setActive(id);
    setToggle(false);

    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const targetElement = document.getElementById(id);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const logoStyles = getLogoStyles();
  const desktopStyles = getDesktopNavStyles();
  const isDesktop = ['lg', 'xl', '2xl'].includes(screenSize.breakpoint);

  const LogoSVG = ({ className = "" }: { className?: string }) => (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.2L20 8v8l-8 4-8-4V8l8-3.8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  return (
    <nav className={`w-full flex items-center py-5 fixed top-0 z-20 ${
      scrolled ? "bg-primary/95 backdrop-blur-sm" : "bg-transparent"
    }`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6">
        {/* LOGO */}
        <div 
          className={logoStyles.container}
          onClick={() => handleLinkClick('home')}
        >
          <LogoSVG className={`${logoStyles.icon} text-white`} />
          <p className="text-white font-bold cursor-pointer flex">
            Danilo&nbsp;
            <span className="sm:block hidden">| Henrique</span>
          </p>
        </div>

        {/* DESKTOP MENU */}
        {isDesktop && (
          <ul className={desktopStyles.container}>
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.id ? "text-white" : "text-secondary"
                } hover:text-white ${desktopStyles.linkText} font-medium cursor-pointer transition-colors duration-200`}
                onClick={() => handleLinkClick(nav.id)}
              >
                <a href={`#${nav.id}`} onClick={(e) => e.preventDefault()}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* MOBILE MENU */}
        {!isDesktop && (
          <div className="flex flex-1 justify-end items-center">
            <div
              className="w-[28px] h-[28px] object-contain cursor-pointer text-white"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.id ? "text-white" : "text-secondary"
                    } hover:text-white transition-colors duration-200`}
                    onClick={() => handleLinkClick(nav.id)}
                  >
                    <a href={`#${nav.id}`} onClick={(e) => e.preventDefault()}>
                      {nav.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
'use client';

import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12" style={{ backgroundColor: '#191919' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Separator Line - Now at the top */}
        <hr className="my-8" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row mt-8">

          {/* Copyright & Core Info */}
          <div className="text-center md:text-left">
            <p className="text-sm" style={{ color: '#d1d5db' }}>
              &copy; {currentYear} Danilo Lira. Especialista em Automação Industrial.
            </p>
            <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
              Transformando a indústria com tecnologia em Portugal 🇵🇹.
            </p>
          </div>

          {/* Social Links & Call to Connect */}
          <div className="flex items-center space-x-6">
            <span className="text-sm hidden sm:block" style={{ color: '#9ca3af' }}>
              Vamos nos conectar:
            </span>
            <a
              href="https://github.com/danilohenriquelira"
              rel="noreferrer"
              target="_blank"
              aria-label="GitHub"
              className="transition-all duration-300 transform hover:scale-110"
              style={{ color: '#d1d5db' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#d1d5db'}
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/danilo-lira-82b17516b"
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn"
              className="transition-all duration-300 transform hover:scale-110"
              style={{ color: '#d1d5db' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#d1d5db'}
            >
              <FaLinkedinIn size={20} />
            </a>

            <a
              href="mailto:contato@danilolira.com"
              rel="noreferrer"
              aria-label="Email"
              className="transition-all duration-300 transform hover:scale-110"
              style={{ color: '#d1d5db' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#d1d5db'}
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
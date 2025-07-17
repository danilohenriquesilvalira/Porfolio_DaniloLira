'use client';

import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12" style={{ backgroundColor: '#000000' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Separator Line - Agora em azul */}
        <hr className="my-8" style={{ borderColor: 'rgba(37, 99, 235, 0.3)' }} />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row mt-8">
          
          {/* Copyright & Core Info */}
          <div className="text-center md:text-left">
            <p className="text-sm" style={{ color: '#d1d5db' }}>
              &copy; {currentYear} <span style={{ color: '#2563eb', fontWeight: '600' }}>Danilo Lira</span>. Especialista em Automação Industrial.
            </p>
            <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
              Transformando a indústria com <span style={{ color: '#2563eb' }}>tecnologia</span> em Portugal 🇵🇹.
            </p>
          </div>

          {/* Social Links & Call to Connect */}
          <div className="flex items-center space-x-6">
            <span className="text-sm hidden sm:block" style={{ color: '#9ca3af' }}>
              Vamos nos <span style={{ color: '#2563eb' }}>conectar</span>:
            </span>
            
            <a
              href="https://github.com/danilohenriquesilvalira"
              rel="noreferrer"
              target="_blank"
              aria-label="GitHub"
              className="transition-all duration-300 transform hover:scale-110 p-2 rounded-lg"
              style={{ 
                color: '#d1d5db',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#2563eb';
                (e.target as HTMLElement).style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#d1d5db';
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/danilo-lira-82b17516b"
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn"
              className="transition-all duration-300 transform hover:scale-110 p-2 rounded-lg"
              style={{ 
                color: '#d1d5db',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#2563eb';
                (e.target as HTMLElement).style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#d1d5db';
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <FaLinkedinIn size={20} />
            </a>

            <a
              href="mailto:danilosilvalira@hotmail.com"
              rel="noreferrer"
              aria-label="Email"
              className="transition-all duration-300 transform hover:scale-110 p-2 rounded-lg"
              style={{ 
                color: '#d1d5db',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#2563eb';
                (e.target as HTMLElement).style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#d1d5db';
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
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
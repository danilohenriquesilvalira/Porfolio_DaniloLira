import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // State to hold the SVG elements, initially null
  const [svgContent, setSvgContent] = useState<React.ReactNode | null>(null);

  // Use useEffect to ensure this logic only runs on the client after initial render
  useEffect(() => {
    // Helper functions to generate semi-random positions and opacities
    const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

    // Arrays to store dot and line positions
    const dots = [];
    const lines = [];
    const numDots = 100; // Keeping 100 dots for density
    const svgWidth = 100;
    const svgHeight = 100;

    // Generate dots (circles)
    for (let i = 0; i < numDots; i++) {
      const cx = getRandom(5, svgWidth - 5);
      const cy = getRandom(5, svgHeight - 5);
      const r = getRandom(0.3, 0.8);
      const opacity = getRandom(0.2, 0.6);
      dots.push({ cx, cy, r, opacity });
    }

    // Generate lines connecting nearby dots
    const maxDistance = 15;
    for (let i = 0; i < numDots; i++) {
      for (let j = i + 1; j < numDots; j++) {
        const p1 = dots[i];
        const p2 = dots[j];
        const distance = Math.sqrt(
          Math.pow(p2.cx - p1.cx, 2) + Math.pow(p2.cy - p1.cy, 2)
        );
        if (distance < maxDistance) {
          const opacity = getRandom(0.15, 0.4);
          lines.push({ x1: p1.cx, y1: p1.cy, x2: p2.cx, y2: p2.cy, opacity });
        }
      }
    }

    // Set the SVG content into state
    setSvgContent(
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="fadeMask" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="65%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          <mask id="circleMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#fadeMask)" />
          </mask>
        </defs>

        <g mask="url(#circleMask)">
          {lines.map((line, index) => (
            <line
              key={`line-${index}`}
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke="#2563EB"
              strokeWidth="0.25"
              opacity={line.opacity * 2.8}
              filter="url(#glow)"
            />
          ))}

          {dots.map((dot, index) => (
            <circle
              key={`dot-${index}`}
              cx={dot.cx} cy={dot.cy} r={dot.r * 2}
              fill="#2563EB"
              opacity={dot.opacity * 2.5}
              filter="url(#glow)"
            />
          ))}
        </g>
      </svg>
    );
  }, []);

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-100 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-2">
              <p className="text-sm sm:text-base md:text-lg font-medium tracking-wider uppercase text-gray-300 animate-fade-in">
                OLÁ, SOU O DANILO
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in animation-delay-200">
                <span className="block text-white">Especialista</span>
                <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Automação
                </span>
                <span className="block text-white">Industrial</span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in animation-delay-400">
              Profissional com mais de 10 anos de experiência em grandes empresas do setor de bebidas.
              Desenvolvendo soluções de automação e transformando processos industriais para a era da Indústria 4.0.
            </p>
            <div className="pt-4 animate-fade-in animation-delay-600">
              <button
                onClick={scrollToProjects}
                className="group relative inline-flex items-center px-8 py-4 font-semibold text-sm sm:text-base uppercase tracking-wide rounded-lg bg-transparent text-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
              >
                <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10">VEJA MEUS PROJETOS</span>
                <svg className="relative z-10 ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2 animate-fade-in animation-delay-800">
            <div className="relative">
              {/* SVG Network - Tamanho ajustado para mobile */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] sm:w-[140%] sm:h-[140%] lg:w-[160%] lg:h-[160%] z-[1] overflow-visible">
                {svgContent}
              </div>

              {/* Profile Image Container - Tamanhos mais adequados para mobile */}
              <div className="relative z-20 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] flex items-center justify-center p-6 sm:p-8 border-2 border-blue-600/30 bg-gray-900 rounded-full">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                  <div className="text-center">
                    {/* Avatar menor para mobile */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-3 sm:mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    {/* Nome com tamanho responsivo */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">Danilo Lira</h3>
                    {/* Título com tamanho menor para caber no círculo */}
                    <p className="text-xs sm:text-sm md:text-base text-blue-400 font-medium leading-tight">
                      Automation<br className="sm:hidden" />
                      <span className="sm:ml-1">Engineer</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import React, { useState, useEffect } from 'react';
// import Image from 'next/image'; // Não utilizado, pode ser removido se não for usar em outro lugar

const HeroSection = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [svgContent, setSvgContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
    const dots = [];
    const lines = [];
    const numDots = 100;
    const svgWidth = 100;
    const svgHeight = 100;

    for (let i = 0; i < numDots; i++) {
      const cx = getRandom(5, svgWidth - 5);
      const cy = getRandom(5, svgHeight - 5);
      const r = getRandom(0.3, 0.8);
      const opacity = getRandom(0.2, 0.6);
      dots.push({ cx, cy, r, opacity });
    }

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

  const horizontalPaddingClasses = "px-4 sm:px-6 lg:px-8";

  return (
    // Removido min-h-screen do section principal para dar mais controle
    // Adicionado h-screen para que o section ocupe 100% da altura da viewport.
    // Usado items-start para alinhar o conteúdo ao topo, e então controlamos com padding.
    <section id="home" className="relative h-screen bg-black flex flex-col items-center lg:justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-100 z-0"></div>

      {/* Ajustado pt e pb no container principal para mobile, removendo o lg:py-0 que estava resetando */}
      {/* Usamos pt-[15vh] para um padding superior em porcentagem da viewport height para mobile */}
      {/* No desktop (lg), voltamos para centralização normal, se necessário */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto ${horizontalPaddingClasses} pt-[15vh] pb-8 lg:py-0`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center">

          {/* Mantido o padding-y-0 para o conteúdo interno do texto, deixando o controle para o container pai */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left order-2 lg:order-1 pt-0 pb-0 sm:pt-0 sm:pb-0 lg:py-0">
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

          <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2 animate-fade-in animation-delay-800">
            <div className="relative">
              {/* Este div contendo svgContent será hidden em telas pequenas e mostrado em telas grandes */}
              <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-0
                                w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] xl:w-[900px] xl:h-[900px]
                                z-[1] overflow-visible items-center justify-center
                                mr-[-100px] sm:mr-[-150px] md:mr-[-200px] lg:mr-[-250px] xl:mr-[-300px]">
                {svgContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
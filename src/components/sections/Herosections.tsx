import { useState, useEffect } from 'react';
import Image from 'next/image';
import './herosection.css';

const Herosections = () => {
  // Estado para debug da tela - You can remove this useState and useEffect if you only need to hide the display.
  // If you might need this logic for other purposes in the future, you can keep them.
  const [_screenInfo, setScreenInfo] = useState({ // Added underscore here
    width: 0,
    height: 0,
    breakpoint: ''
  });

  // Função para determinar o breakpoint - COM TIPAGEM
  const getBreakpoint = (width: number): string => {
    if (width <= 767) return 'MOBILE';
    if (width >= 768 && width <= 1023) return 'TABLET';
    if (width >= 1024 && width <= 1440) return 'NOTEBOOK';
    if (width >= 1441 && width <= 1920) return 'DESKTOP';
    if (width >= 1921 && width <= 2559) return '4K';
    if (width >= 2560) return 'ULTRA-WIDE';
    return 'UNKNOWN';
  };

  // Hook para monitorar o resize da tela - You can remove this useEffect as well if you're not using screenInfo elsewhere.
  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenInfo({
        width,
        height,
        breakpoint: getBreakpoint(width)
      });
    };

    // Atualiza na primeira renderização
    updateScreenInfo();

    // Adiciona listener para resize
    window.addEventListener('resize', updateScreenInfo);

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  // Função para scroll até a seção de projetos
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* DEBUG SCREEN INFO - Canto superior 
        Para inibir a exibição, comente ou remova o bloco abaixo.
      */}
      {/*
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 9999,
        border: '1px solid #333'
      }}>
        <div><strong>TELA:</strong> {_screenInfo.width} x {_screenInfo.height}</div>
        <div><strong>BREAKPOINT:</strong> <span style={{
          color: _screenInfo.breakpoint === 'MOBILE' ? '#00ff00' : '#ffffff'
        }}>{_screenInfo.breakpoint}</span></div>
        <div><strong>RANGE:</strong> {
          _screenInfo.breakpoint === 'MOBILE' ? '0-767px' :
          _screenInfo.breakpoint === 'TABLET' ? '768-1023px' :
          _screenInfo.breakpoint === 'NOTEBOOK' ? '1024-1440px' :
          _screenInfo.breakpoint === 'DESKTOP' ? '1441-1920px' :
          _screenInfo.breakpoint === '4K' ? '1921-2559px' :
          _screenInfo.breakpoint === 'ULTRA-WIDE' ? '2560px+' : 'N/A'
        }</div>
      </div>
      */}

      {/* ❌ GRADIENTE REMOVIDO COMPLETAMENTE */}
      
      {/* Container principal responsivo */}
      <div className="hero-wrapper">
        
        {/* Layout responsivo - Mobile: coluna, Desktop: grid */}
        <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-center h-full">
          
          {/* Conteúdo de texto - LADO ESQUERDO */}
          <div className="hero-container order-2 md:order-1">
            
            <p className="hero-greeting">
              OLÁ, SOU O DANILO
            </p>
            
            <h1 className="hero-title">
              Especialista<br />
              Automação<br />
              Industrial
            </h1>
            
            <p className="hero-description">
              Profissional com mais de 10 anos de experiência em grandes empresas do setor de bebidas. 
              Desenvolvendo soluções de automação e transformando processos industriais para a era da Indústria 4.0.
            </p>

            {/* BOTÃO VEJA MEUS PROJETOS */}
            <button 
              onClick={scrollToProjects}
              className="hero-button"
            >
              VEJA MEUS PROJETOS
            </button>
            
          </div>
          
          {/* Imagem do Danilo - LADO DIREITO */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end items-center relative">
            
            {/* ❌ CÍRCULOS SVG REMOVIDOS COMPLETAMENTE - ESTAS LINHAS FORAM DELETADAS:
            
            <div className="hero-svg-container">
              <svg 
                width="988" 
                height="1166" 
                viewBox="0 0 988 1166" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="hero-svg-decorative"
              >
                <circle opacity="0.05" cx="653.5" cy="512.5" r="424.5" stroke="white" strokeWidth="96"/>
                <circle opacity="0.03" cx="653.5" cy="512.5" r="605.5" stroke="white" strokeWidth="96"/>
              </svg>
            </div>
            
            */}

            {/* ❌ BACKDROP BLUR TAMBÉM REMOVIDO:
            <div className="hero-image-backdrop"></div>
            */}
            
            {/* Imagem principal - SOZINHA, SEM CÍRCULOS ATRÁS */}
            <Image
              src="/images/Danilo_Herosection.svg"
              alt="Danilo Lira - Especialista em Automação Industrial"
              className="hero-image relative z-10"
              width={500}
              height={600}
              priority
              quality={100}
            />
          </div>
          
        </div>
        
      </div>
      
    </section>
  );
};

export default Herosections;
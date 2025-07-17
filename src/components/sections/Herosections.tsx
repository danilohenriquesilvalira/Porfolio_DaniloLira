import { useState, useEffect } from 'react';
import Image from 'next/image';

const Herosections = () => {
  // Função para scroll até a seção de projetos
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Container principal */}
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Grid responsivo - Mobile: coluna, Desktop: 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Conteúdo de texto - LADO ESQUERDO */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left order-2 lg:order-1">
            
            {/* Saudação */}
            <p className="text-sm sm:text-base md:text-lg font-medium tracking-wider uppercase"
               style={{ color: '#ffffffff' }}> {/* Azul para destaque */}
              OLÁ, SOU O DANILO
            </p>
            
            {/* Título principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white">Especialista</span>
              <span className="block" style={{ color: '#2563eb' }}>Automação</span> {/* Palavra destacada em azul */}
              <span className="block text-white">Industrial</span>
            </h1>
            
            {/* Descrição */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Profissional com mais de 10 anos de experiência em grandes empresas do setor de bebidas. 
              Desenvolvendo soluções de automação e transformando processos industriais para a era da Indústria 4.0.
            </p>

            {/* Botão CTA */}
            <div className="pt-4">
              <button 
                onClick={scrollToProjects}
                className="inline-flex items-center px-8 py-4 font-semibold text-sm sm:text-base uppercase tracking-wide rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: '2px solid #2563eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#2563eb';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
              >
                VEJA MEUS PROJETOS
              </button>
            </div>
            
          </div>
          
          {/* Imagem do Danilo - LADO DIREITO */}
          <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2 relative">
            
            {/* Imagem principal - SEM CÍRCULOS */}
            <div className="relative z-10 w-80 h-96 sm:w-96 sm:h-[480px] lg:w-[500px] lg:h-[600px]">
              <Image
                src="/images/Danilo_Herosection.svg"
                alt="Danilo Lira - Especialista em Automação Industrial"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                quality={100}
              />
            </div>
          </div>
          
        </div>
        
      </div>
      
   
      
    </section>
  );
};

export default Herosections;
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaGraduationCap, FaBriefcase, FaTrophy } from 'react-icons/fa';

const Experiencia = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      // Optional: Load Montserrat font if not already loaded globally (consider adding to _document.tsx or global CSS)
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      const handleTouchDetect = () => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('touchstart', handleTouchDetect, { once: true });
      handleResize(); // Set initial value
      handleTouchDetect(); // Set initial value

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('touchstart', handleTouchDetect);
      };
    }
  }, []);

  // Helper classes for dynamic hover effects based on touch device detection
  const experienceItemHoverClasses = !isTouchDevice ? 'group-hover:border-l-blue-600 group-hover:pl-4 group-hover:translate-x-1 group-hover:bg-blue-600/5' : '';
  const educationItemHoverClasses = !isTouchDevice ? 'group-hover:border-l-blue-600 group-hover:pl-4 group-hover:translate-x-1 group-hover:bg-blue-600/5' : '';


  return (
    <section id="experiencia" className="bg-black py-16 font-['Poppins',_sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 font-['Montserrat',_sans-serif] tracking-[-0.025em]">
          <span className="text-white">Experiência</span>
          <span className="text-blue-600"> & Formação</span>
        </h2>

        <div className="relative max-w-4xl mx-auto p-4">
          {/* Card de fundo azul - Oculto em mobile */}
          <div className="absolute bottom-[-30px] right-[-30px] w-[65%] h-[85%] bg-gradient-to-br from-blue-900 to-blue-800 rounded-tl-xl rounded-br-xl rounded-tr-[50px] rounded-bl-[50px] z-0 hidden md:block" />

          {/* Card Branco Decorativo - Oculto em mobile */}
          <div className="absolute bottom-[-20px] right-[-20px] w-[60%] h-[80%] bg-gradient-to-br from-white to-gray-50 rounded-tl-xl rounded-br-xl rounded-tr-[50px] rounded-bl-[50px] z-0 hidden md:block" />

          {/* Card Preto Principal (frente) */}
          <div className="relative z-10 bg-gradient-to-br from-neutral-900 to-black rounded-tl-xl rounded-br-xl rounded-tr-[50px] rounded-bl-[50px] p-6 sm:p-8 md:p-10 shadow-2xl border border-blue-600/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">

              {/* Coluna Esquerda - Experiências */}
              <div className="flex flex-col gap-4 md:gap-6 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <FaBriefcase className="text-blue-600 text-xl sm:text-2xl opacity-90" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white font-['Montserrat',_sans-serif]">
                    Experiência Profissional
                  </h3>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                  {/* Experiência 1 */}
                  <div className={`group bg-transparent rounded-lg p-4 border-b border-blue-600/20 transition-all duration-300 ease-in-out ${experienceItemHoverClasses}`}>
                    <div className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">Especialista em Automação Industrial & Full-Stack</div>
                    <div className="text-sm sm:text-base text-gray-200 mb-1 font-normal">RLS Automação Industrial • Lisboa, Portugal</div>
                    <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm opacity-70" />
                      jun 2024 - presente (1 ano)
                    </div>
                  </div>

                  {/* Experiência 2 */}
                  <div className={`group bg-transparent rounded-lg p-4 border-b border-blue-600/20 transition-all duration-300 ease-in-out ${experienceItemHoverClasses}`}>
                    <div className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">Técnico de Manutenção Elétrica & Automação</div>
                    <div className="text-sm sm:text-base text-gray-200 mb-1 font-normal">Central de Cervejas (Sagres) • Vialonga, Portugal</div>
                    <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm opacity-70" />
                      dez 2023 - jun 2024 (7 meses)
                    </div>
                  </div>

                  {/* Experiência 3 */}
                  <div className={`group bg-transparent rounded-lg p-4 border-b border-blue-600/20 transition-all duration-300 ease-in-out ${experienceItemHoverClasses}`}>
                    <div className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">Técnico de Automação Industrial</div>
                    <div className="text-sm sm:text-base text-gray-200 mb-1 font-normal">Font Salem (Grupo Damm) • Santarém, Portugal</div>
                    <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm opacity-70" />
                      jul 2023 - dez 2023 (6 meses)
                    </div>
                  </div>

                  {/* Experiência 4 */}
                  <div className={`group bg-transparent rounded-lg p-4 border-b border-blue-600/20 transition-all duration-300 ease-in-out ${experienceItemHoverClasses}`}>
                    <div className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">Técnico de Automação Sênior & Full-Stack</div>
                    <div className="text-sm sm:text-base text-gray-200 mb-1 font-normal">AB InBev • Pernambuco, Brasil</div>
                    <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm opacity-70" />
                      fev 2014 - jan 2023 (9 anos)
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Formação & Resumo */}
              <div className="flex flex-col gap-6 md:gap-8 h-full">

                {/* Formação */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FaGraduationCap className="text-blue-600 text-xl sm:text-2xl opacity-90" />
                    <h4 className="text-lg sm:text-xl font-semibold text-white font-['Montserrat',_sans-serif]">
                      Formação Acadêmica
                    </h4>
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                    {/* Formação 1 */}
                    <div className={`group bg-transparent rounded-lg p-4 border-b border-blue-600/20 transition-all duration-300 ease-in-out ${educationItemHoverClasses}`}>
                      <div className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">Tecnologia da Informação/Sistemas da Informação</div>
                      <div className="text-sm sm:text-base text-gray-200 mb-1 font-normal">Estácio • Pernambuco, Brasil</div>
                      <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm opacity-70" />
                        abr 2021 - dez 2023
                      </div>
                    </div>

                    {/* Formação 2 */}
                    <div className={`group bg-transparent rounded-lg p-4 border-b border-blue-600/20 transition-all duration-300 ease-in-out ${educationItemHoverClasses}`}>
                      <div className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">Técnico em Automação Industrial</div>
                      <div className="text-sm sm:text-base text-gray-200 mb-1 font-normal">SENAI Pernambuco • Pernambuco, Brasil</div>
                      <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm opacity-70" />
                        fev 2012 - dez 2014
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumo */}
                <div className="bg-blue-600/10 rounded-xl p-4 sm:p-6 border border-blue-600/25 mt-4 md:mt-0">
                  <div className="flex items-center gap-3 mb-2">
                    <FaTrophy className="text-blue-600 text-xl sm:text-2xl opacity-90" />
                    <h4 className="text-lg sm:text-xl font-semibold text-white font-['Montserrat',_sans-serif]">
                      Resumo
                    </h4>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                    Especialista em Automação Industrial e Desenvolvedor Full-Stack com **mais de 10 anos de experiência** em projetos industriais complexos. Atuação consolidada em grandes cervejarias como AB InBev, Sagres e Font Salem.
                  </p>

                  <div className="flex justify-around pt-4 border-t border-blue-600/25">
                    <div className="text-center">
                      <span className="block text-2xl sm:text-3xl font-bold text-blue-600">10+</span>
                      <span className="text-xs sm:text-sm text-gray-200 mt-1">Anos</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl sm:text-3xl font-bold text-blue-600">5</span>
                      <span className="text-xs sm:text-sm text-gray-200 mt-1">Empresas</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl sm:text-3xl font-bold text-blue-600">2</span>
                      <span className="text-xs sm:text-sm text-gray-200 mt-1">Países</span>
                    </div>
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

export default Experiencia;
import React, { useState, useEffect } from "react";
import { BsGithub, BsArrowRightShort, BsArrowUpRightSquare } from "react-icons/bs";
import Image from "next/image";
import { ProjectType, projects } from "../../data/projects";
import SlideUp from "../SlideUp"; // Certifique-se de que SlideUp é compatível com SSR ou é um "use client" próprio

function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>(projects);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timeoutId = setTimeout(() => {
      const newFilteredProjects = projects.filter((project: ProjectType) =>
        selectedFilter === "All" ? true : project.filter.includes(selectedFilter)
      );
      setFilteredProjects(newFilteredProjects);
      setIsTransitioning(false);
    }, 150); // 150ms de delay para suavizar
    return () => clearTimeout(timeoutId);
  }, [selectedFilter]);

  // Carrega a fonte Poppins
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, []);

  return (
    <section id="projects" className="bg-black py-16 font-poppins">
      {/* Adicionar aqui os keyframes para a animação de piscar */}
      <style jsx global>{`
        @keyframes pulse-once {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pulse-once {
          animation: pulse-once 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in animation-delay-200">
        {/* TÍTULO COM PADRÃO AZUL */}
        <h2 className="relative text-center mb-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-white">Meus</span>
          <span className="text-blue-600"> Projetos</span>
        </h2>

        {/* FILTRO MODERNO COM SUBLINHADO ESTILO NAVBAR E ÍCONES SVG INLINE */}
        <div className="flex justify-center mb-12 flex-wrap gap-x-8 gap-y-4 px-4 sm:px-0">
          {[
            { name: 'All', label: 'Todos', icon: (
              // Ícone para "Todos" - Estrela/Lançamento (SVG inline)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" clipRule="evenodd" />
              </svg>
            )},
            { name: 'Automação', label: 'Automação', icon: (
              // Ícone para "Automação" - Imagem de PLC (conforme solicitado, com filtro para cor)
              <Image src="/images/Icon_PLC.svg" alt="Automação" width={20} height={20} className="filter brightness-0 invert" /> // Ajustado para w-5 h-5
            )},
            { name: 'Front-end', label: 'Front-end', icon: (
              // Ícone para "Front-end" - Representa UI/Código (SVG inline)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M17.25 6.75H6.75A2.25 2.25 0 0 0 4.5 9v6a2.25 2.25 0 0 0 2.25 2.25h10.5A2.25 2.25 0 0 0 19.5 15V9a2.25 2.25 0 0 0-2.25-2.25Zm-1.65 3.9a.75.75 0 0 0-1.1-1.025l-3.25 3.5c-.172.186-.407.28-.65.28s-.478-.094-.65-.28l-3.25-3.5a.75.75 0 0 0-1.1 1.025l3.25 3.5a1.5 1.5 0 0 0 2.299 0l3.25-3.5Z" clipRule="evenodd" />
              </svg>
            )},
            { name: 'Backend', label: 'Backend', icon: (
              // Ícone para "Backend" - Servidor/Nuvem (SVG inline)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1.5 9a3 3 0 0 0 3 3h1.372c.86 0 1.63.531 1.954 1.332.128.32.29.618.474.897a6.724 6.724 0 0 0 1.947 1.947c.279.183.577.345.897.474.801.324 1.332 1.094 1.332 1.954V21a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-9a3 3 0 0 0-3 3Z" clipRule="evenodd" />
              </svg>
            )},
          ].map((filter) => (
            <div
              key={filter.name}
              onClick={() => setSelectedFilter(filter.name)}
              className={`
                flex items-center gap-2 cursor-pointer relative py-2 px-3 rounded-lg
                text-sm font-medium transition-all duration-300 ease-in-out
                ${selectedFilter === filter.name ? 'text-blue-500 bg-blue-900/30 font-semibold' : 'text-gray-400 hover:text-blue-400 hover:bg-gray-700/50'}
              `}
            >
              <div className={`flex items-center transition-filter duration-300 ${selectedFilter === filter.name ? 'filter brightness-100' : 'filter brightness-75'}`}>
                {filter.icon}
              </div>
              <span>{filter.label}</span>
              {selectedFilter === filter.name && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-sm animate-slide-in shadow-blue-500/50"></div>
              )}
            </div>
          ))}
        </div>

        {/* GRID DE PROJETOS */}
        <div
          className={`
            grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3
            gap-6 sm:gap-8 lg:gap-10
            justify-items-center w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px]
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-70' : 'opacity-100'}
          `}
        >
          {filteredProjects.map(
            (project: ProjectType, index: number) =>
              (selectedFilter === "All" || project.filter.includes(selectedFilter)) && (
                <SlideUp
                  key={project.id}
                  offset="-100px 0px -100px 0px"
                  className="group relative w-full h-[450px] sm:h-[480px] md:h-[500px] lg:h-[520px] 
                             rounded-xl overflow-hidden shadow-lg transform
                             transition-all duration-400 ease-in-out
                             bg-gray-800 border border-gray-700
                             hover:scale-[1.02] hover:shadow-2xl hover:border-blue-600
                             flex flex-col cursor-pointer"
                >
                  {/* PROJECT IMAGE THUMBNAIL or PLACEHOLDER - ALWAYS VISIBLE AT THE TOP, NO ANGLE */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden
                                  bg-gradient-to-br from-gray-900 to-gray-800">
                    {project.thumbnail.includes('placeholder') ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center
                                      text-white text-lg font-semibold bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.02)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm z-10 flex flex-col items-center gap-2">
                          <Image src="/images/Projeto_Desenvolvimento.svg" alt="Projeto em Desenvolvimento" width={50} height={50} className="filter brightness-0 invert opacity-90" />
                          <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                            Em Desenvolvimento
                          </p>
                          <p className="text-sm text-gray-200 opacity-90">Será lançado em breve</p>
                          <div className="w-2/3 h-1.5 bg-white/20 rounded-full overflow-hidden mt-2">
                            <div className="w-2/3 h-full bg-blue-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Otimização para Next/Image
                      />
                    )}
                  </div>

                  {/* MAIN CARD CONTENT - ALWAYS VISIBLE */}
                  <div className="p-4 flex flex-col flex-grow text-left">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-4 mb-4"> 
                      {project.about}
                    </p>

                    {/* LINKS SECTION - AT THE BOTTOM */}
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <div className="flex gap-4">
                          {/* GitHub Link (if available) - Added animate-pulse-once class */}
                          {project.github && project.github !== "#" && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                              className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-300 animate-pulse-once"
                              title="Ver no GitHub"
                            >
                              <BsGithub size={28} />
                              <span className="sr-only sm:not-sr-only">GitHub</span>
                            </a>
                          )}

                          {/* Live Demo Link (if available) */}
                          {project.link && project.link !== "#" && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                              className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                              title="Ver Live Demo"
                            >
                              <BsArrowUpRightSquare size={28} />
                              <span className="sr-only sm:not-sr-only">Demo</span>
                            </a>
                          )}
                      </div>

                      {/* Primary Call to Action Button (Blue Arrow without circle) */}
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          const targetLink = project.link && project.link !== "#" ? project.link : project.github;
                          if (targetLink && targetLink !== "#") {
                            window.open(targetLink, "_blank");
                          }
                        }}
                        className="text-blue-600 transition-colors duration-300 hover:text-blue-500"
                        title="Ver Mais Detalhes"
                      >
                        <BsArrowRightShort size={40} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </SlideUp>
              )
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;
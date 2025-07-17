import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const TechExpertise = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Array com todas as tecnologias reorganizado para melhor distribuição
  const technologies = [
    { name: "TIA Portal", src: "/techExpertise/Tia_portal.svg", color: "#0066cc" },
    { name: "Rockwell", src: "/techExpertise/Rockewell.svg", color: "#ff6b35" },
    { name: "CODESYS", src: "/techExpertise/codasystem.svg", color: "#00a86b" },
    { name: "React", src: "/techExpertise/react.svg", color: "#61dafb" },
    { name: "TypeScript", src: "/techExpertise/typescript.svg", color: "#3178c6" },
    { name: "JavaScript", src: "/techExpertise/javascript.svg", color: "#f7df1e" },
    { name: "Python", src: "/techExpertise/python.svg", color: "#3776ab" },
    { name: "Figma", src: "/techExpertise/Figma.svg", color: "#f24e1e" },
    { name: "PostgreSQL", src: "/techExpertise/postgresql.svg", color: "#336791" },
    { name: "MySQL", src: "/techExpertise/Mysql.svg", color: "#4479a1" },
    { name: "Go", src: "/techExpertise/go.svg", color: "#00add8" },
    { name: "Node-RED", src: "/techExpertise/node-red.svg", color: "#8f0000" },
    { name: "VS Code", src: "/techExpertise/vsclde.svg", color: "#007acc" },
    { name: "GitHub", src: "/techExpertise/github.svg", color: "#ffffff" }
  ];

  return (
    <section id="tech-expertise" className="bg-black py-16 font-['Poppins',_sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 tracking-[-0.03em]">
            <span className="text-white">Tech</span>
            <span className="text-blue-600"> Stack</span>
          </h2>
        </div>

        {/* Grid de Tecnologias */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-y-12 gap-x-6 justify-items-center items-start">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-400 ease-in-out hover:-translate-y-2 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Efeito de brilho */}
              <div
                className="absolute top-1/2 left-1/2 w-[120%] h-[120%] rounded-full -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none transition-opacity duration-400 ease-in-out"
                style={{
                  background: `radial-gradient(circle, ${tech.color}40 0%, ${tech.color}20 30%, transparent 70%)`,
                  opacity: hoveredIndex === index ? 0.6 : 0,
                }}
              ></div>

              <Image
                src={tech.src}
                alt={tech.name}
                width={70} // Base size
                height={70} // Base size
                className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] transition-all duration-400 ease-in-out object-contain drop-shadow-md z-20 group-hover:scale-110 group-hover:brightness-110"
                style={hoveredIndex === index ? { filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) brightness(1.1)' } : {}}
                priority={index < 7} // Carrega as primeiras 7 imagens com prioridade
              />
              <p
                className="font-semibold text-sm sm:text-base text-white text-center leading-tight tracking-wide z-20 transition-colors duration-300 ease-in-out"
                style={{ color: hoveredIndex === index ? tech.color : '#ffffff' }}
              >
                {tech.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechExpertise;
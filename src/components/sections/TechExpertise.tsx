'use client';

import { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';

const TechExpertise = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Carrega a fonte Montserrat
  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        // Verificar se o link ainda existe antes de remover
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, []);

  // Array com todas as tecnologias reorganizado para melhor distribuição
  const technologies = [
    { name: "TIA Portal", src: "/images/techExpertise/Tia_portal.svg", color: "#0066cc" },
    { name: "Rockwell", src: "/images/techExpertise/Rockewell.svg", color: "#ff6b35" },
    { name: "CODESYS", src: "/images/techExpertise/codasystem.svg", color: "#00a86b" },
    { name: "React", src: "/images/techExpertise/react.svg", color: "#61dafb" },
    { name: "TypeScript", src: "/images/techExpertise/typescript.svg", color: "#3178c6" },
    { name: "JavaScript", src: "/images/techExpertise/javascript.svg", color: "#f7df1e" },
    { name: "Python", src: "/images/techExpertise/python.svg", color: "#3776ab" },
    { name: "Figma", src: "/images/techExpertise/Figma.svg", color: "#f24e1e" },
    { name: "PostgreSQL", src: "/images/techExpertise/postgresql.svg", color: "#336791" },
    { name: "MySQL", src: "/images/techExpertise/Mysql.svg", color: "#4479a1" },
    { name: "Go", src: "/images/techExpertise/go.svg", color: "#00add8" },
    { name: "Node-RED", src: "/images/techExpertise/node-red.svg", color: "#8f0000" },
    { name: "VS Code", src: "/images/techExpertise/vsclde.svg", color: "#007acc" },
    { name: "GitHub", src: "/images/techExpertise/github.svg", color: "#ffffff" }
  ];

  const styles: { [key: string]: CSSProperties } = {
    section: {
      backgroundColor: '#191919',
      padding: '4rem 0',
      fontFamily: "'Poppins', sans-serif"
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0 0 1rem 0',
      letterSpacing: '-0.03em',
      textShadow: '0 4px 20px rgba(255,255,255,0.1)'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#9ca3af',
      margin: 0,
      fontWeight: '400',
      letterSpacing: '0.5px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '3rem 2rem',
      justifyItems: 'center',
      alignItems: 'start'
    },
    techItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      gap: '1.2rem',
      cursor: 'pointer',
      position: 'relative'
    },
    techItemHover: {
      transform: 'translateY(-10px) scale(1.05)'
    },
    techIcon: {
      width: '70px',
      height: '70px',
      transition: 'all 0.4s ease',
      objectFit: 'contain',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
      zIndex: 2
    },
    techIconHover: {
      transform: 'scale(1.1)',
      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) brightness(1.1)'
    },
    techName: {
      fontFamily: "'Montserrat', 'Inter', 'Segoe UI', sans-serif",
      fontWeight: '600',
      fontSize: '0.9rem',
      color: '#ffffff',
      textAlign: 'center',
      margin: 0,
      lineHeight: '1.3',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease',
      zIndex: 2
    },
    glowEffect: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '120%',
      height: '120%',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      zIndex: 1,
      pointerEvents: 'none'
    }
  };

  // Responsividade melhorada - MOBILE MAIS COMPACTO
  const getGridColumns = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 480) return 'repeat(3, 1fr)';    // MOBILE: 3 colunas
      if (width <= 768) return 'repeat(4, 1fr)';    // TABLET PEQUENO: 4 colunas
      if (width <= 1024) return 'repeat(5, 1fr)';   // TABLET: 5 colunas
      if (width <= 1200) return 'repeat(5, 1fr)';   // Mantido
      if (width <= 1440) return 'repeat(6, 1fr)';   // Mantido
    }
    return 'repeat(7, 1fr)';
  };

  const getIconSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 480) return { width: 45, height: 45 };  // MOBILE: menor para compactar
      if (width <= 768) return { width: 55, height: 55 };  // TABLET PEQUENO: reduzido
      if (width <= 1024) return { width: 65, height: 65 }; // TABLET: reduzido
      if (width <= 1440) return { width: 80, height: 80 }; // Mantido
      if (width <= 1920) return { width: 90, height: 90 }; // Mantido
      if (width <= 2560) return { width: 110, height: 110 }; // 2K
      if (width <= 3840) return { width: 130, height: 130 }; // 4K
      return { width: 150, height: 150 }; // 5K+
    }
    return { width: 70, height: 70 };
  };

  const getGap = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 480) return '1.5rem 0.8rem';     // MOBILE: gap muito reduzido
      if (width <= 768) return '2rem 1rem';         // TABLET PEQUENO: gap reduzido
      if (width <= 1440) return '3rem 2rem';        // Mantido
      if (width <= 1920) return '3.5rem 2.5rem';    // Full HD
      if (width <= 2560) return '4rem 3rem';        // 2K
      if (width <= 3840) return '4.5rem 3.5rem';    // 4K
      return '5rem 4rem';                            // 5K+
    }
    return '3rem 2rem';
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            Tech Stack
          </h2>
        </div>

        {/* Grid de Tecnologias */}
        <div style={{
          ...styles.grid,
          gridTemplateColumns: getGridColumns(),
          gap: getGap()
        }}>
          {technologies.map((tech, index) => {
            const iconSize = getIconSize();
            
            return (
              <div
                key={index}
                style={{
                  ...styles.techItem,
                  ...(hoveredIndex === index ? styles.techItemHover : {})
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Efeito de brilho */}
                <div
                  style={{
                    ...styles.glowEffect,
                    background: `radial-gradient(circle, ${tech.color}40 0%, ${tech.color}20 30%, transparent 70%)`,
                    opacity: hoveredIndex === index ? 0.6 : 0
                  }}
                ></div>

                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={iconSize.width}
                  height={iconSize.height}
                  style={{
                    ...styles.techIcon,
                    width: `${iconSize.width}px`,
                    height: `${iconSize.height}px`,
                    ...(hoveredIndex === index ? styles.techIconHover : {})
                  }}
                  priority={index < 7} // Carrega as primeiras 7 imagens com prioridade
                />
                <p style={{
                  ...styles.techName,
                  color: hoveredIndex === index ? tech.color : '#ffffff'
                }}>
                  {tech.name}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechExpertise;
'use client';

import { useEffect, CSSProperties } from 'react';
import Herosections from '@/components/sections/Herosections';
import TechExpertise from '@/components/sections/TechExpertise';
import Experiencia from '@/components/sections/Experiencia';
import ProjectsPage from '@/components/sections/ProjectsPage';
import ContactPage from '@/components/sections/ContactPage';

export default function HomePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles: { [key: string]: CSSProperties } = {
    main: {
      minHeight: '100vh',
      backgroundColor: '#191919',
      overflow: 'hidden',
      position: 'relative'
    },
    // Container para melhor organização
    sectionContainer: {
      maxWidth: '100vw',
      margin: '0 auto',
      position: 'relative'
    },
    // Espaçamento dinâmico entre Hero e Tech (maior)
    heroToTechSpacing: {
      height: '6rem', // 96px - mais respiro após hero
      backgroundColor: 'transparent'
    },
    // Espaçamento padrão entre seções
    sectionSpacing: {
      height: '5rem', // 80px - moderno e respirável
      backgroundColor: 'transparent'
    },
    // Espaçamento final mais generoso
    finalSpacing: {
      height: '4rem', // 64px - final elegante
      backgroundColor: 'transparent'
    }
  };

  // Responsividade moderna e fluida
  const getModernSpacing = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      
      // Mobile (até 768px)
      if (width <= 768) {
        return {
          heroToTechSpacing: { height: '3rem' }, // 48px
          sectionSpacing: { height: '2.5rem' }, // 40px
          finalSpacing: { height: '2rem' } // 32px
        };
      }
      
      // Tablet (769px - 1024px)
      if (width <= 1024) {
        return {
          heroToTechSpacing: { height: '4rem' }, // 64px
          sectionSpacing: { height: '3.5rem' }, // 56px
          finalSpacing: { height: '3rem' } // 48px
        };
      }
      
      // Desktop large (1025px - 1440px)
      if (width <= 1440) {
        return {
          heroToTechSpacing: { height: '6rem' }, // 96px
          sectionSpacing: { height: '5rem' }, // 80px
          finalSpacing: { height: '4rem' } // 64px
        };
      }
    }
    
    // Desktop XL (1441px+)
    return {
      heroToTechSpacing: { height: '7rem' }, // 112px
      sectionSpacing: { height: '6rem' }, // 96px
      finalSpacing: { height: '5rem' } // 80px
    };
  };

  const modernSpacing = getModernSpacing();

  return (
    <main style={styles.main}>
      <div style={styles.sectionContainer}>
        
        {/* Hero Section - ID: home */}
        <section id="home">
          <Herosections />
        </section>
        
        {/* Espaçamento dinâmico Hero → Tech */}
        <div style={modernSpacing.heroToTechSpacing}></div>
        
        {/* Tech Section - ID: tech-expertise */}
        <section id="tech-expertise">
          <TechExpertise />
        </section>
        
        {/* Espaçamento Tech → Experiência */}
        <div style={modernSpacing.sectionSpacing}></div>
        
        {/* Experience Section - ID: experiencia */}
        <section id="experiencia">
          <Experiencia />
        </section>
        
        {/* Espaçamento Experiência → Projetos */}
        <div style={modernSpacing.sectionSpacing}></div>
        
        {/* Projects Section - ID: projects */}
        <section id="projects">
          <ProjectsPage />
        </section>
        
        {/* Espaçamento Projetos → Contato */}
        <div style={modernSpacing.sectionSpacing}></div>
        
        {/* Contact Section - ID: contact */}
        <section id="contact">
          <ContactPage />
        </section>
        
        {/* Espaçamento final elegante */}
        <div style={modernSpacing.finalSpacing}></div>
        
      </div>
    </main>
  );
}
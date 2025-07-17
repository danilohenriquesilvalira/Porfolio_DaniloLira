'use client'

import { useEffect, CSSProperties } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Herosections from '@/components/sections/Herosections'
import TechExpertise from '@/components/sections/TechExpertise'
import Experiencia from '@/components/sections/Experiencia'
import ProjectsPage from '@/components/sections/ProjectsPage'
import ContactPage from '@/components/sections/ContactPage'
import ScrollToTop from '@/components/common/ScrollToTop'

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const styles: { [key: string]: CSSProperties } = {
    main: {
      minHeight: '100vh',
      backgroundColor: '#000000',
      overflow: 'hidden',
      position: 'relative'
    },
    sectionContainer: {
      maxWidth: '100vw',
      margin: '0 auto',
      position: 'relative'
    },
    heroToTechSpacing: {
      height: '6rem',
      backgroundColor: '#000000'
    },
    sectionSpacing: {
      height: '5rem',
      backgroundColor: '#000000'
    },
    finalSpacing: {
      height: '4rem',
      backgroundColor: '#000000'
    }
  }

  const getModernSpacing = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      
      if (width <= 768) {
        return {
          heroToTechSpacing: { 
            height: '3rem',
            backgroundColor: '#000000'
          },
          sectionSpacing: { 
            height: '2.5rem',
            backgroundColor: '#000000'
          },
          finalSpacing: { 
            height: '2rem',
            backgroundColor: '#000000'
          }
        }
      }
      
      if (width <= 1024) {
        return {
          heroToTechSpacing: { 
            height: '4rem',
            backgroundColor: '#000000'
          },
          sectionSpacing: { 
            height: '3.5rem',
            backgroundColor: '#000000'
          },
          finalSpacing: { 
            height: '3rem',
            backgroundColor: '#000000'
          }
        }
      }
      
      if (width <= 1440) {
        return {
          heroToTechSpacing: { 
            height: '6rem',
            backgroundColor: '#000000'
          },
          sectionSpacing: { 
            height: '5rem',
            backgroundColor: '#000000'
          },
          finalSpacing: { 
            height: '4rem',
            backgroundColor: '#000000'
          }
        }
      }
    }
    
    return {
      heroToTechSpacing: { 
        height: '7rem',
        backgroundColor: '#000000'
      },
      sectionSpacing: { 
        height: '6rem',
        backgroundColor: '#000000'
      },
      finalSpacing: { 
        height: '5rem',
        backgroundColor: '#000000'
      }
    }
  }

  const modernSpacing = getModernSpacing()

  return (
    <>
      {/* CSS para customizar a barra de scroll com detalhes azuis sutis */}
      <style jsx global>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, 
            rgba(37, 99, 235, 0.3) 0%, 
            rgba(37, 99, 235, 0.6) 50%, 
            rgba(37, 99, 235, 0.3) 100%
          );
          border-radius: 10px;
          border: 1px solid rgba(37, 99, 235, 0.2);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            rgba(37, 99, 235, 0.5) 0%, 
            rgba(37, 99, 235, 0.8) 50%, 
            rgba(37, 99, 235, 0.5) 100%
          );
          border-color: rgba(37, 99, 235, 0.4);
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.3);
        }

        ::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, 
            rgba(37, 99, 235, 0.7) 0%, 
            rgba(37, 99, 235, 1) 50%, 
            rgba(37, 99, 235, 0.7) 100%
          );
          border-color: rgba(37, 99, 235, 0.6);
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
        }

        /* Firefox */
        html {
          scrollbar-width: thin;
          scrollbar-color: rgba(37, 99, 235, 0.6) #000000;
        }

        /* Para mobile - esconder scrollbar mas manter funcionalidade */
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        }
      `}</style>

      <div className="min-h-screen bg-primary">
        <Navbar />
        
        <main style={styles.main}>
          <div style={styles.sectionContainer}>
            
            <section id="home">
              <Herosections />
            </section>
            
            <div style={modernSpacing.heroToTechSpacing}></div>
            
            <section id="tech-expertise">
              <TechExpertise />
            </section>
            
            <div style={modernSpacing.sectionSpacing}></div>
            
            <section id="experiencia">
              <Experiencia />
            </section>
            
            <div style={modernSpacing.sectionSpacing}></div>
            
            <section id="projects">
              <ProjectsPage />
            </section>
            
            <div style={modernSpacing.sectionSpacing}></div>
            
            <section id="contact">
              <ContactPage />
            </section>
            
            <div style={modernSpacing.finalSpacing}></div>
            
          </div>
        </main>
        
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
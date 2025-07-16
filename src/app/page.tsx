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
      backgroundColor: '#191919',
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
      backgroundColor: '#191919'  // ← CORRIGIDO: era 'transparent'
    },
    sectionSpacing: {
      height: '5rem',
      backgroundColor: '#191919'  // ← CORRIGIDO: era 'transparent'
    },
    finalSpacing: {
      height: '4rem',
      backgroundColor: '#191919'  // ← CORRIGIDO: era 'transparent'
    }
  }

  const getModernSpacing = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      
      if (width <= 768) {
        return {
          heroToTechSpacing: { 
            height: '3rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          },
          sectionSpacing: { 
            height: '2.5rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          },
          finalSpacing: { 
            height: '2rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          }
        }
      }
      
      if (width <= 1024) {
        return {
          heroToTechSpacing: { 
            height: '4rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          },
          sectionSpacing: { 
            height: '3.5rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          },
          finalSpacing: { 
            height: '3rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          }
        }
      }
      
      if (width <= 1440) {
        return {
          heroToTechSpacing: { 
            height: '6rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          },
          sectionSpacing: { 
            height: '5rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          },
          finalSpacing: { 
            height: '4rem',
            backgroundColor: '#191919'  // ← ADICIONADO
          }
        }
      }
    }
    
    return {
      heroToTechSpacing: { 
        height: '7rem',
        backgroundColor: '#191919'  // ← ADICIONADO
      },
      sectionSpacing: { 
        height: '6rem',
        backgroundColor: '#191919'  // ← ADICIONADO
      },
      finalSpacing: { 
        height: '5rem',
        backgroundColor: '#191919'  // ← ADICIONADO
      }
    }
  }

  const modernSpacing = getModernSpacing()

  return (
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
  )
}
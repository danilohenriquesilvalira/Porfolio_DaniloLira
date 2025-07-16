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
      backgroundColor: 'transparent'
    },
    sectionSpacing: {
      height: '5rem',
      backgroundColor: 'transparent'
    },
    finalSpacing: {
      height: '4rem',
      backgroundColor: 'transparent'
    }
  }

  const getModernSpacing = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      
      if (width <= 768) {
        return {
          heroToTechSpacing: { height: '3rem' },
          sectionSpacing: { height: '2.5rem' },
          finalSpacing: { height: '2rem' }
        }
      }
      
      if (width <= 1024) {
        return {
          heroToTechSpacing: { height: '4rem' },
          sectionSpacing: { height: '3.5rem' },
          finalSpacing: { height: '3rem' }
        }
      }
      
      if (width <= 1440) {
        return {
          heroToTechSpacing: { height: '6rem' },
          sectionSpacing: { height: '5rem' },
          finalSpacing: { height: '4rem' }
        }
      }
    }
    
    return {
      heroToTechSpacing: { height: '7rem' },
      sectionSpacing: { height: '6rem' },
      finalSpacing: { height: '5rem' }
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
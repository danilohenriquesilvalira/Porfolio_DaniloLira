import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Herosections from '@/components/sections/Herosections'
import AboutSection from '@/components/sections/AboutSection'
import TechExpertise from '@/components/sections/TechExpertise'
import EducationSection from '@/components/sections/EducationSection'
import Experiencia from '@/components/sections/Experiencia'
import ProjectsPage from '@/components/sections/ProjectsPage'
import ScrollToTop from '@/components/common/ScrollToTop'

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900 font-['Poppins',_sans-serif]">
      <Navbar />
      <main>
        <Herosections />
        <AboutSection />
        <TechExpertise />
        <EducationSection />
        <Experiencia />
        <ProjectsPage />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

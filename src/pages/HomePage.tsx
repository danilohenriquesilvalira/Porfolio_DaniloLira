import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Herosections from '@/components/sections/Herosections'
import AboutSection from '@/components/sections/AboutSection'
import EducationSection from '@/components/sections/EducationSection'
import Experiencia from '@/components/sections/Experiencia'
import ProjectsPage from '@/components/sections/ProjectsPage'
import { scrollToTopInstant } from '@/lib/utils'

const NAVBAR_H = 72

const HomePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo

    if (scrollTo) {
      const el = document.getElementById(scrollTo)
      if (el) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_H, behavior: 'smooth' })
        })
      }
      navigate(location.pathname, { replace: true, state: null })
    } else {
      scrollToTopInstant()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Herosections />
      <AboutSection />
      <EducationSection />
      <Experiencia />
      <ProjectsPage />
    </>
  )
}

export default HomePage

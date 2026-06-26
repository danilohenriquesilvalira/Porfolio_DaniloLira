import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import HomePage from '@/pages/HomePage'

// A página de projetos só é carregada quando o utilizador a visita,
// para não pesar no carregamento inicial da Home.
const AllProjectsPage = lazy(() => import('@/pages/AllProjectsPage'))

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900 font-['Poppins',_sans-serif]">
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projetos" element={<AllProjectsPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import HomePage from '@/pages/HomePage'
import AllProjectsPage from '@/pages/AllProjectsPage'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900 font-['Poppins',_sans-serif]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos" element={<AllProjectsPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

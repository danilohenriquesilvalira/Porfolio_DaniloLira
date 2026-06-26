import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaLaptopCode, FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa'
import { projects } from '@/data/projects'
import { asset, scrollToTopInstant } from '@/lib/utils'

const NAVBAR_H = 72

const AllProjectsPage = () => {
  useEffect(() => {
    scrollToTopInstant()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white" style={{ paddingTop: NAVBAR_H }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">

        <motion.h1
          className="text-center text-3xl sm:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaLaptopCode className="inline-block align-middle text-blue-400 text-[0.85em] mr-3 -mt-1" />
          Todos os <span className="text-blue-400">Projetos</span>
        </motion.h1>
        <motion.p
          className="text-center text-slate-400 text-base sm:text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Lista completa de projetos industriais e de software desenvolvidos ao longo da carreira.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {/* Desktop: card com painel deslizante no hover */}
              <div className="hidden md:block group relative h-80 rounded-2xl overflow-hidden bg-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <img
                  src={asset(project.thumbnail)}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-contain p-8 bg-gradient-to-br from-slate-800 to-slate-900"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-end
                                bg-slate-900/95 backdrop-blur-sm p-5
                                translate-y-[64%] group-hover:translate-y-0
                                transition-transform duration-300 ease-out">
                  <h3 className="text-white font-bold text-base mb-2 line-clamp-2">{project.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3 line-clamp-4">{project.about}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors">
                        <FaGithub /> Código
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors">
                        <FaExternalLinkAlt /> Ver
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile/tablet: card empilhado, sempre visível (sem dependência de hover) */}
              <div className="md:hidden flex flex-col rounded-2xl overflow-hidden bg-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-900">
                  <img
                    src={asset(project.thumbnail)}
                    alt={project.title}
                    className="w-full h-full object-contain p-6"
                    draggable={false}
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-white font-bold text-base mb-2">{project.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3 line-clamp-4">{project.about}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors">
                        <FaGithub /> Código
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors">
                        <FaExternalLinkAlt /> Ver
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/70 text-white font-semibold
                       hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            <FaArrowLeft /> Voltar ao Início
          </Link>
        </div>

      </div>
    </div>
  )
}

export default AllProjectsPage

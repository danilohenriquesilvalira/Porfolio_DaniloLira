import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { projects } from '@/data/projects';
import { asset } from '@/lib/utils';

const ProjectsPage = () => {
  return (
    <section id="projects" className="bg-white py-20 lg:py-28">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl sm:text-5xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FaLaptopCode className="inline-block align-middle text-blue-600 text-[0.85em] mr-3 -mt-1" />
          Projetos <span className="text-blue-600">Realizados</span>
        </motion.h2>
        <motion.p
          className="text-center text-slate-500 text-base sm:text-lg mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Projetos industriais e de software desenvolvidos ao longo da carreira.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white
                           border border-slate-100 hover:border-blue-200
                           shadow-sm hover:shadow-xl
                           hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-slate-100 overflow-hidden">
                  <img
                    src={asset(project.thumbnail)}
                    alt={project.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/80
                                  flex items-center justify-center gap-5
                                  transition-all duration-300 opacity-0 group-hover:opacity-100">
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 rounded-full bg-white flex items-center justify-center
                                    text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-95
                                    transition-all duration-200">
                        <FaGithub className="text-lg" />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                         className="w-10 h-10 rounded-full bg-white flex items-center justify-center
                                    text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-95
                                    transition-all duration-200">
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">{project.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.about}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.slice(0, 4).map(t => (
                      <span key={t}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full
                                   bg-blue-50 text-blue-700 border border-blue-100">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Ver todos */}
        <div className="flex justify-center mt-12">
          <Link
            to="/projetos"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm
                       shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                       transition-all duration-200"
          >
            Ver Todos os Projetos
            <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProjectsPage;

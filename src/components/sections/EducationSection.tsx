import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCogs } from 'react-icons/fa';

const education = [
  {
    degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    institution: 'Estácio',
    location: 'Pernambuco, Brasil',
    period: 'Abr 2021 – Dez 2023',
    Icon: FaUniversity,
  },
  {
    degree: 'Técnico em Automação Industrial',
    institution: 'SENAI',
    location: 'Recife, Brasil',
    period: 'Fev 2012 – Dez 2014',
    Icon: FaCogs,
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="bg-white py-20 lg:py-28">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl sm:text-5xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FaGraduationCap className="inline-block align-middle text-blue-600 text-[0.85em] mr-3 -mt-1" />
          A Minha <span className="text-blue-600">Formação</span>
        </motion.h2>
        <motion.p
          className="text-center text-slate-500 text-base sm:text-lg mb-14 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          "A educação não é a aprendizagem de factos, mas o treino da mente para pensar."
        </motion.p>

        {/* Education cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left
                         gap-3 sm:gap-5 p-6 rounded-2xl bg-[#f7f7f7] border border-slate-100
                         shadow-sm hover:shadow-xl hover:-translate-y-1
                         hover:border-blue-200 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100
                              flex items-center justify-center flex-shrink-0 sm:mt-1">
                <edu.Icon className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{edu.degree}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-1">{edu.institution}</p>
                <p className="text-slate-500 text-xs">{edu.location}</p>
                <span className="inline-block mt-2 text-xs font-semibold text-slate-600
                                 bg-white px-3 py-1 rounded-full border border-slate-200">
                  {edu.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EducationSection;

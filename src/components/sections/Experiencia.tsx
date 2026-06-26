import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    role: 'Técnico e Projetista de Automação Industrial',
    company: 'RLS Automação Industrial',
    location: 'Sintra, Portugal',
    period: 'Mai 2024 – Presente',
    current: true,
  },
  {
    role: 'Técnico de Manutenção, Automação, Elétrica & Instrumentação',
    company: 'Sociedade Central de Cervejas (Sagres · Heineken)',
    location: 'Vialonga, Portugal',
    period: 'Nov 2023 – Mai 2024',
    current: false,
  },
  {
    role: 'Técnico de Manutenção e Automação Industrial',
    company: 'FontSalem (Grupo Damm)',
    location: 'Santarém, Portugal',
    period: 'Jun 2023 – Nov 2023',
    current: false,
  },
  {
    role: 'Técnico de Automação Industrial (Projeto)',
    company: 'Tecnale Automação de Sistemas',
    location: 'São Paulo, Brasil',
    period: 'Jan 2023 – Mai 2023',
    current: false,
  },
  {
    role: 'Técnico de Manutenção, Automação e Elétrica Industrial',
    company: 'Anheuser-Busch InBev (AmBev)',
    location: 'Itapissuma — PE, Brasil',
    period: 'Fev 2014 – Jan 2023 · 9 anos',
    current: false,
  },
];

type Exp = typeof experiences[number];

const Dot = ({ active }: { active: boolean }) => (
  <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md
                   flex items-center justify-center border-[3px]
                   ${active ? 'border-blue-600' : 'border-slate-300'}`}>
    <FaBriefcase className={`text-xs ${active ? 'text-blue-600' : 'text-slate-400'}`} />
  </div>
);

const Card = ({ exp, arrow }: { exp: Exp; arrow: 'left' | 'right' }) => {
  const active = exp.current;
  return (
    <div className={`relative rounded-xl p-5 w-full md:max-w-sm transition-all duration-300
                     ${active
                       ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                       : 'bg-slate-200/70 text-slate-500 shadow-sm hover:shadow-md hover:-translate-y-0.5'}`}>
      <div
        className={`hidden md:block absolute top-5 w-0 h-0 border-[9px] border-transparent
          ${arrow === 'right'
            ? `-right-[17px] ${active ? 'border-l-blue-600' : 'border-l-slate-200'}`
            : `-left-[17px] ${active ? 'border-r-blue-600' : 'border-r-slate-200'}`}`}
      />
      <div className={`md:hidden absolute top-5 -left-[17px] w-0 h-0 border-[9px] border-transparent
        ${active ? 'border-r-blue-600' : 'border-r-slate-200'}`} />
      {active && (
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider
                         bg-white/20 px-2 py-0.5 rounded-full mb-2">
          Atual
        </span>
      )}
      <h4 className={`text-sm font-bold mb-1.5 leading-snug ${active ? 'opacity-90' : 'text-slate-600'}`}>
        {exp.company}
      </h4>
      <h3 className={`text-base font-bold mb-1 leading-snug ${active ? '' : 'text-slate-500'}`}>
        {exp.role}
      </h3>
      <p className={`text-xs ${active ? 'opacity-80' : 'text-slate-400'}`}>{exp.location}</p>
      <p className={`text-xs mt-0.5 ${active ? 'opacity-80' : 'text-slate-400'}`}>{exp.period}</p>
    </div>
  );
};

const Experiencia = () => {
  return (
    <section id="experiencia" className="bg-[#f7f7f7] py-20 lg:py-28">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl sm:text-5xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FaBriefcase className="inline-block align-middle text-blue-600 text-[0.85em] mr-3 -mt-1" />
          Experiência <span className="text-blue-600">Profissional</span>
        </motion.h2>
        <motion.p
          className="text-center text-slate-500 text-base sm:text-lg mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Mais de 10 anos em automação industrial, IT/OT e engenharia de sistemas em dois países.
        </motion.p>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* vertical line — centro no desktop, esquerda no mobile */}
          <div className="absolute top-0 bottom-0 w-1 bg-slate-900 rounded-full
                          left-5 md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-6 md:gap-10">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.company + exp.period}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  {/* Desktop: alterna lados com o ponto ao centro */}
                  <div className="hidden md:flex items-center">
                    <div className="w-1/2 flex justify-end pr-5">
                      {isLeft && <Card exp={exp} arrow="right" />}
                    </div>
                    <Dot active={exp.current} />
                    <div className="w-1/2 flex justify-start pl-5">
                      {!isLeft && <Card exp={exp} arrow="left" />}
                    </div>
                  </div>

                  {/* Mobile: coluna única, ponto + linha à esquerda */}
                  <div className="md:hidden flex items-start gap-4">
                    <Dot active={exp.current} />
                    <div className="flex-1 pt-1">
                      <Card exp={exp} arrow="left" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experiencia;

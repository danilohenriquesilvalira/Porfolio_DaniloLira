import { motion } from 'framer-motion';
import { FaUserAlt, FaDownload } from 'react-icons/fa';
import { asset } from '@/lib/utils';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl sm:text-5xl font-bold text-slate-900 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FaUserAlt className="inline-block align-middle text-blue-600 text-[0.85em] mr-3 -mt-1" />
          Sobre <span className="text-blue-600">Mim</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: Photo — efeito mix-blend-mode igual ao site de referência:
              cinza por padrão no desktop, cor real ao passar o rato; sempre a cor no mobile */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={asset('/Eu.webp')}
              alt="Danilo Lira"
              className="w-4/5 sm:w-72 md:w-80 lg:w-96 xl:w-[26rem] h-auto
                         rounded-[5%] shadow-[0_5px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                         mix-blend-normal sm:mix-blend-luminosity sm:hover:mix-blend-normal
                         hover:-translate-y-1 transition-all duration-300 cursor-pointer select-none"
              draggable={false}
            />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Sou o Danilo
            </h3>
            <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50
                             px-4 py-1.5 rounded-full border border-blue-200 mb-5">
              Técnico de Automação Industrial
            </span>

            <p className="text-slate-600 text-base leading-relaxed mb-6 max-w-xl">
              Especialista em Automação Industrial e IT/OT com mais de 10 anos de experiência
              em manutenção elétrica, automação e instrumentação. Atualmente a trabalhar em Portugal
              na área de telecomando e telegestão de infraestruturas críticas para a{' '}
              <strong className="text-slate-800">EDP</strong> — integrando PLCs Siemens/Rockwell,
              SCADA/WinCC e protocolo IEC&nbsp;60870-5-104.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">
              Percurso sólido nas maiores cervejeiras da Europa e América&nbsp;Latina —
              <strong className="text-slate-800"> AmBev</strong>,{' '}
              <strong className="text-slate-800">Grupo Damm</strong> e{' '}
              <strong className="text-slate-800">Heineken</strong> — com projetos reconhecidos
              internacionalmente. Apaixonado por unir o mundo industrial ao mundo digital.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 mb-8
                            text-sm text-slate-700 text-left w-full">
              <p><span className="font-semibold text-slate-900">Email:</span>&nbsp; danilosilvalira@hotmail.com</p>
              <p><span className="font-semibold text-slate-900">Telefone:</span>&nbsp; +351 935 479 757</p>
              <p><span className="font-semibold text-slate-900">Localização:</span>&nbsp; Sintra, Portugal</p>
              <p><span className="font-semibold text-slate-900">Disponível:</span>&nbsp; <span className="text-green-600 font-semibold">Sim</span></p>
            </div>

            <a
              href={asset('/Danilo_Lira_CV.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg
                         bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm
                         shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                         transition-all duration-200"
            >
              Currículo
              <FaDownload className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

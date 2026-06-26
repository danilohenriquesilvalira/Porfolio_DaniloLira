import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaUserAlt, FaDownload, FaCalendarAlt, FaLaptopCode, FaBuilding, FaGlobeEurope,
} from 'react-icons/fa';
import { asset } from '@/lib/utils';

/* ── Foto com tilt 3D + spotlight que segue o cursor ─────────────
   Mesma técnica do Hero (MotionValues, sem useState/re-render no
   mousemove). O brilho do spotlight é uma variável CSS escrita
   diretamente no elemento — não passa pelo ciclo do React. ────── */
const SpotlightPhoto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px / rect.width - 0.5);
    y.set(py / rect.height - 0.5);
    el.style.setProperty('--spot-x', `${px}px`);
    el.style.setProperty('--spot-y', `${py}px`);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group relative cursor-pointer"
      style={{ perspective: '1200px' }}
    >
      <motion.div style={{ rotateX, rotateY }} className="relative">
        <img
          src={asset('/Eu.webp')}
          alt="Danilo Lira"
          className="w-4/5 sm:w-72 md:w-80 lg:w-96 xl:w-[26rem] h-auto
                     rounded-[5%] shadow-[0_5px_20px_rgba(0,0,0,0.35)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                     mix-blend-normal sm:mix-blend-luminosity sm:group-hover:mix-blend-normal
                     transition-shadow duration-300 select-none"
          draggable={false}
        />
        {/* spotlight que segue o cursor */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[5%] opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
          style={{ background: 'radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(59,130,246,0.35), transparent 60%)' }}
        />
        {/* contorno animado sutil */}
        <div className="pointer-events-none absolute -inset-px rounded-[5%] ring-1 ring-blue-500/0 group-hover:ring-blue-500/40 transition-all duration-300" />
      </motion.div>
    </div>
  );
};

/* ── Contador animado — usado na barra de estatísticas ───────────
   Loop finito via rAF (para sozinho ao terminar), disparado apenas
   quando a secção entra no viewport. Nada de loops infinitos. ──── */
function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

const stats = [
  { Icon: FaCalendarAlt,  value: 10, suffix: '+', label: 'Anos de Experiência' },
  { Icon: FaLaptopCode,   value: 8,  suffix: '',  label: 'Projetos Realizados' },
  { Icon: FaBuilding,     value: 5,  suffix: '',  label: 'Empresas' },
  { Icon: FaGlobeEurope,  value: 2,  suffix: '',  label: 'Países' },
];

const StatItem = ({ Icon, value, suffix, label, active }: typeof stats[number] & { active: boolean }) => {
  const count = useCountUp(value, active);
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Icon className="text-xl sm:text-2xl text-blue-600 mb-1" />
      <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">{count}{suffix}</p>
      <p className="text-xs sm:text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
};

const StatsRow = () => {
  const [active, setActive] = useState(false);
  return (
    <motion.div
      className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full"
      onViewportEnter={() => setActive(true)}
      viewport={{ once: true, amount: 0.5 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {stats.map(s => <StatItem key={s.label} {...s} active={active} />)}
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-white py-20 lg:py-28 overflow-hidden">

      {/* Fundo decorativo: grid sutil + manchas de luz a derivar lentamente —
          tudo CSS puro (transform/opacity), corre no compositor, sem custo
          de JS no thread principal. */}
      <div
        className="absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-[blobDrift_14s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl animate-[blobDrift_18s_ease-in-out_infinite_reverse]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

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

          {/* Left: Photo — tilt 3D + spotlight no cursor (desktop) e efeito
              mix-blend-mode igual ao site de referência (cinza→cor) */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SpotlightPhoto />
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

        <StatsRow />

      </div>
    </section>
  );
};

export default AboutSection;

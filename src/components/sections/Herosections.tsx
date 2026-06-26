import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaArrowCircleDown } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { asset } from '@/lib/utils';

const NAVBAR_H = 72;
const TYPING_WORDS = [
  'Automação Industrial',
  'Especialista IT/OT',
  'Integrador PLC & SCADA',
  'Desenvolvedor Full Stack',
];

/* ── Typing animation hook ─────────────────────────────────────── */
function useTyping(words: string[], speed = 90, del = 55, pause = 1800) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIdx(i => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(prev => deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)),
        deleting ? del : speed
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words, speed, del, pause]);

  return text;
}

/* ── Particle background — mesma engine (tsparticles) e mesma config
       JSON do particles.js usado no portfólio de referência ────── */
const ParticleBackground = () => {
  const init = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0"
      init={init}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: '#000000' },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 5 } },
          links: { enable: true, distance: 150, color: '#000000', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, outModes: { default: 'out' } },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            repulse: { distance: 200, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

/* ── Carrossel de tecnologias — marquee infinito no fundo do Hero ── */
const techLogos = [
  { icon: '/techExpertise/Tia_portal.svg', name: 'TIA Portal'  },
  { icon: '/techExpertise/wincc.svg',      name: 'WinCC'       },
  { icon: '/techExpertise/ignition.svg',   name: 'Ignition'    },
  { icon: '/techExpertise/Rockewell.svg',  name: 'Rockwell'    },
  { icon: '/techExpertise/opcua.svg',      name: 'OPC UA'      },
  { icon: '/techExpertise/python.svg',     name: 'Python'      },
  { icon: '/techExpertise/go.svg',         name: 'Go'          },
  { icon: '/techExpertise/rust.svg',       name: 'Rust'        },
  { icon: '/techExpertise/typescript.svg', name: 'TypeScript'  },
  { icon: '/techExpertise/react.svg',      name: 'React'       },
  { icon: '/techExpertise/node-red.svg',   name: 'Node-RED'    },
  { icon: '/techExpertise/postgresql.svg', name: 'PostgreSQL'  },
  { icon: '/techExpertise/linux.svg',      name: 'Linux'       },
  { icon: '/techExpertise/github.svg',     name: 'GitHub'      },
];

const TechMarquee = () => (
  <div className="relative z-10 w-full overflow-hidden border-t border-slate-200/70 bg-white/50 backdrop-blur-sm py-2.5 sm:py-3">
    <div className="flex w-max gap-8 sm:gap-12 animate-[marquee_28s_linear_infinite]">
      {[...techLogos, ...techLogos].map((t, i) => (
        <div key={i} className="flex items-center gap-2 flex-shrink-0">
          <img src={asset(t.icon)} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" draggable={false} />
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">{t.name}</span>
        </div>
      ))}
    </div>
    {/* fade nas pontas */}
    <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#f7f7f7] to-transparent" />
    <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#f7f7f7] to-transparent" />
  </div>
);

/* ── 3-D tilt image (replicates tilt.js behaviour) ─────────────── */
const TiltImage = () => {
  const ref  = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = ref.current!;
    const rect = el.getBoundingClientRect();
    const nx   = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2); // -1..1
    const ny   = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2); // -1..1
    setTilt({ x: ny * -20, y: nx * 20 });
  };

  return (
    <div
      ref={ref}
      className="cursor-pointer"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* floating animation wrapper */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* outer glow ring */}
          <div className="absolute -inset-2 sm:-inset-3 rounded-full bg-yellow-400/30 blur-md" />

          {/* yellow circle + image — identical to Jigar */}
          <div
            className="relative w-36 h-36 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[380px] lg:h-[380px]
                       rounded-full overflow-hidden select-none
                       shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            style={{ background: 'radial-gradient(circle at 60% 40%, #FFD700, #FFA500)' }}
          >
            <img
              src={asset('/images/Danilo_Herosection.svg')}
              alt="Danilo Lira"
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Social links ───────────────────────────────────────────────── */
const socialLinks = [
  { href: 'https://linkedin.com/in/danilo-lira-82b17516b', Icon: FaLinkedin, label: 'LinkedIn'  },
  { href: 'https://github.com/danilohenriquesilvalira',     Icon: FaGithub,   label: 'GitHub'    },
  { href: 'mailto:danilosilvalira@hotmail.com',             Icon: FaEnvelope, label: 'Email'     },
  { href: 'https://wa.me/351935479757',                     Icon: FaWhatsapp, label: 'WhatsApp'  },
];

/* ── Hero section ───────────────────────────────────────────────── */
const HeroSection = () => {
  const typedText = useTyping(TYPING_WORDS);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_H, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f7f7f7]"
      style={{ paddingTop: NAVBAR_H }}
    >
      {/* particles.js clone */}
      <ParticleBackground />

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between
                      w-full max-w-screen-xl mx-auto
                      px-5 sm:px-12 lg:px-16
                      gap-4 sm:gap-10 lg:gap-12
                      min-h-[calc(100vh-72px-44px)] sm:min-h-[calc(100vh-72px-52px)] py-4 sm:py-8 lg:py-0">

        {/* ── LEFT ──────────────────────────────────────────────── */}
        <div className="flex-1 text-center lg:text-left">

          <h3 className="text-base sm:text-xl font-medium text-slate-600 mb-1.5 sm:mb-3">
            Olá, Eu Sou
          </h3>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-2 sm:mb-4">
            Danilo <span className="text-blue-600">Lira</span>
          </h2>

          <p className="text-base sm:text-2xl text-slate-600 mb-4 sm:mb-8 min-h-[1.75rem] sm:min-h-[2.25rem]">
            Sou&nbsp;
            <span className="text-blue-600 font-semibold">
              {typedText}
              <span className="inline-block w-[2px] h-4 sm:h-6 bg-blue-600 align-middle ml-0.5
                               animate-[blink_1s_step-end_infinite]" />
            </span>
          </p>

          <button
            onClick={() => scrollTo('about')}
            className="inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3 sm:py-4 rounded-full
                       bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base
                       shadow-[0_5px_20px_rgba(37,99,235,0.55)]
                       hover:shadow-[0_8px_28px_rgba(37,99,235,0.65)]
                       transition-all duration-300 mb-5 sm:mb-10"
          >
            Sobre Mim
            <FaArrowCircleDown className="text-lg sm:text-xl" />
          </button>

          <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 hover:bg-blue-600
                           flex items-center justify-center text-white text-lg sm:text-xl
                           shadow-lg hover:shadow-[0_4px_16px_rgba(37,99,235,0.5)]
                           transition-all duration-300 hover:-translate-y-1"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Tilt image ─────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <TiltImage />
        </div>

      </div>

      {/* Carrossel de tecnologias */}
      <TechMarquee />
    </section>
  );
};

export default HeroSection;

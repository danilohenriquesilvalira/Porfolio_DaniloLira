import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaArrowCircleDown } from 'react-icons/fa';
import { asset } from '@/lib/utils';

// Carregado de forma assíncrona (code-splitting) — é puramente decorativo,
// não deve bloquear o JS crítico do primeiro paint do texto/imagem do Hero.
const ParticleBackground = lazy(() => import('./ParticleBackground'));

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

/* ── Altura real do viewport medida via JS — evita os problemas
       conhecidos de 100vh/100dvh em browsers móveis reais. Só recalcula
       quando a LARGURA muda (rotação/resize real) — ignora o "resize"
       que o browser mobile dispara ao recolher a barra de endereço
       no primeiro scroll, que causava um salto/reflow no Hero ─────── */
function useViewportHeight() {
  const [vh, setVh] = useState<number | null>(null);
  const lastWidth = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (lastWidth.current !== null && width === lastWidth.current) return;
      lastWidth.current = width;
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);
  return vh;
}

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
  <div className="relative z-10 w-full overflow-hidden border-t border-slate-200/70 bg-[#f7f7f7] py-2.5 sm:py-3">
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

/* ── 3-D tilt image (replicates tilt.js behaviour) ───────────────
   Usa MotionValues do Framer Motion em vez de useState: o mousemove
   escreve directamente nos valores (x/y) e o Framer Motion atualiza o
   transform do DOM fora do ciclo de render do React — zero re-renders
   do componente durante o movimento do rato. É o que elimina por
   completo o "travamento" sentido antes (o throttle por rAF ainda
   disparava um re-render de toda a árvore a cada frame). ─────────── */
const TiltImage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0); // -0.5..0.5
  const y = useMotionValue(0); // -0.5..0.5
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      className="cursor-pointer"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative"
      >
        {/* floating animation wrapper — CSS pura (corre no compositor, fora
            do JS) em vez de um loop infinito do Framer Motion, que mantinha
            o thread principal ocupado para sempre mesmo sem interação */}
        <div className="animate-[heroFloat_3.5s_ease-in-out_infinite]">
          {/* outer glow ring */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-blue-500/30 blur-md" />

          {/* circle + image — azul, alinhado com a paleta preto/azul/branco do site */}
          <div
            className="relative w-44 h-44 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px]
                       rounded-full overflow-hidden select-none
                       shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            style={{ background: 'radial-gradient(circle at 60% 40%, #3b82f6, #1d4ed8)' }}
          >
            <img
              src={asset('/images/Danilo_Herosection.svg')}
              alt="Danilo Lira"
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          </div>
        </div>
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
  const vh = useViewportHeight();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_H, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f7f7f7] flex flex-col"
      style={{ paddingTop: NAVBAR_H, minHeight: vh ? `${vh}px` : '100vh' }}
    >
      {/* particles.js clone */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      <div className="relative z-10 flex-1 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between
                      w-full max-w-screen-xl mx-auto
                      px-5 sm:px-12 lg:px-16
                      gap-4 sm:gap-10 lg:gap-12 py-4 sm:py-8 lg:py-0">

        {/* ── LEFT ──────────────────────────────────────────────── */}
        <div className="w-full lg:flex-1 text-center lg:text-left">

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
            className="group inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-3 sm:py-4 rounded-full
                       bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base
                       shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                       transition-all duration-200 mb-5 sm:mb-10"
          >
            Sobre Mim
            <FaArrowCircleDown className="text-lg sm:text-xl transition-transform duration-200 group-hover:translate-y-0.5" />
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
                           shadow-md hover:shadow-lg
                           transition-all duration-200 hover:-translate-y-1 hover:scale-110 active:scale-95"
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

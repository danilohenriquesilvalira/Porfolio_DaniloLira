import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

/* ── Particle background — usa o bundle "slim" do tsparticles (em vez do
       "full") para não carregar plugins de emitters/absorbers/efeitos que
       nunca usamos aqui, reduzindo bastante o JS enviado ao browser.
       Também reduz a contagem de partículas em ecrãs pequenos via
       responsive[], poupando CPU/GPU em telemóveis mais fracos.
       Isolado num módulo próprio e carregado via React.lazy no Hero, para
       não bloquear o primeiro paint do texto/imagem com o JS do motor de
       partículas (puramente decorativo). ───────────────────────────── */
const ParticleBackground = () => {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
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
          move: { enable: true, speed: 1.2, direction: 'none', random: false, straight: false, outModes: { default: 'out' } },
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
        responsive: [
          { maxWidth: 768, options: { particles: { number: { value: 40 } }, interactivity: { events: { onHover: { enable: false } } } } },
        ],
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;

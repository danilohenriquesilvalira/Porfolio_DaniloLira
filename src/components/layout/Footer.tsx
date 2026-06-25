import { FaGithub, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Left */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-300">
              &copy; {year}{' '}
              <span className="font-semibold text-white">Danilo Lira</span>
              {' — '}
              Automação Industrial & IT/OT
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Sintra, Portugal · Disponível para projetos industriais e IT/OT
            </p>
          </div>

          {/* Right: Social */}
          <div className="flex items-center gap-2">
            {[
              { href: 'https://github.com/danilohenriquesilvalira', icon: <FaGithub size={17} />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/danilo-lira-82b17516b', icon: <FaLinkedinIn size={17} />, label: 'LinkedIn' },
              { href: 'mailto:danilosilvalira@hotmail.com', icon: <FaEnvelope size={17} />, label: 'Email' },
              { href: 'https://wa.me/351935479757', icon: <FaWhatsapp size={17} />, label: 'WhatsApp' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white
                           flex items-center justify-center transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;

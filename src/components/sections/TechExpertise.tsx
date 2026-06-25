import { motion } from 'framer-motion';
import { FaLaptopCode } from 'react-icons/fa';
import { asset } from '@/lib/utils';

const skills = [
  { name: 'TIA Portal',    icon: '/techExpertise/Tia_portal.svg'  },
  { name: 'WinCC',         icon: '/techExpertise/wincc.svg'       },
  { name: 'Ignition',      icon: '/techExpertise/ignition.svg'    },
  { name: 'Rockwell',      icon: '/techExpertise/Rockewell.svg'   },
  { name: 'OPC UA',        icon: '/techExpertise/opcua.svg'       },
  { name: 'Python',        icon: '/techExpertise/python.svg'      },
  { name: 'Go',            icon: '/techExpertise/go.svg'          },
  { name: 'Rust',          icon: '/techExpertise/rust.svg'        },
  { name: 'TypeScript',    icon: '/techExpertise/typescript.svg'  },
  { name: 'React',         icon: '/techExpertise/react.svg'       },
  { name: 'JavaScript',    icon: '/techExpertise/javascript.svg'  },
  { name: 'Node-RED',      icon: '/techExpertise/node-red.svg'    },
  { name: 'PostgreSQL',    icon: '/techExpertise/postgresql.svg'  },
  { name: 'MySQL',         icon: '/techExpertise/Mysql.svg'       },
  { name: 'Linux',         icon: '/techExpertise/linux.svg'       },
  { name: 'GitHub',        icon: '/techExpertise/github.svg'      },
  { name: 'VS Code',       icon: '/techExpertise/vsclde.svg'      },
  { name: 'Figma',         icon: '/techExpertise/Figma.svg'       },
  { name: 'Coda System',   icon: '/techExpertise/codasystem.svg'  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.05, type: 'tween' as const },
  }),
};

const TechExpertise = () => {
  return (
    <section id="tech-expertise" className="bg-[#f7f7f7] py-20 lg:py-28">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl sm:text-5xl font-bold text-slate-900 mb-4">
            <FaLaptopCode className="inline-block align-middle text-blue-600 text-[0.85em] mr-3 -mt-1" />
            Skills &amp; <span className="text-blue-600">Tecnologias</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ferramentas e tecnologias aplicadas em projetos industriais reais — do chão de fábrica ao servidor.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl
                         bg-white border border-slate-100
                         shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                         hover:shadow-[0_6px_20px_rgba(37,99,235,0.15)]
                         hover:border-blue-200 cursor-default
                         transition-all duration-300"
            >
              <img
                src={asset(skill.icon)}
                alt={skill.name}
                className="w-10 h-10 object-contain"
                draggable={false}
              />
              <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechExpertise;

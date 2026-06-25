export interface ProjectType {
  id: number;
  title: string;
  about: string;
  tech: string[];
  filter: string[];
  thumbnail: string;
  github: string;
  link?: string | null;
}

export const projects: ProjectType[] = [
  // ── PROJETOS DE DESTAQUE (trabalho real) ──────────────────────────────────

  {
    id: 1,
    title: "Telecomando & Telegestão de 5 Eclusas — EDP",
    about:
      "Projeto em produção para a EDP que interliga 5 eclusas a uma sala de telecomando centralizada. Cada eclusa possui um PLC Siemens S7-1500 redundante a comunicar por IEC 60870-5-104 com o WinCC. A infraestrutura de rede é protegida por switches, gateways e firewall Fortinet com VLANs isoladas para o tráfego crítico. A sala de comando assenta num cluster VMware ESXi (Windows Server 2022 / Linux) com 6 VMs e scripts VBS que permitem a qualquer posto operar qualquer eclusa em segurança.",
    tech: ["Siemens S7-1500", "TIA Portal", "WinCC", "IEC 60870-5-104", "VMware ESXi", "Fortinet", "VLANs", "Windows Server 2022"],
    filter: ["All", "Automação", "IT/OT"],
    thumbnail: "/images/Projeto_Radar.svg",
    github: "#",
    link: null,
  },
  {
    id: 2,
    title: "Manutenção Preditiva de Transportadores — AmBev",
    about:
      "Sistema de manutenção condicionada premiado pela AmBev e reconhecido internacionalmente na Stella Artois (Bélgica). Coleta dados do PLC Siemens S7-1500 e variadores Danfoss FC 300 para medir a distância percorrida (km) de cada motor e cruzá-la em tempo real com corrente e binário. O plano de manutenção passa a ajustar-se automaticamente às condições reais, antecipando avarias e reduzindo travamentos inesperados sem impacto no OEE.",
    tech: ["Siemens S7-1500", "TIA Portal", "Danfoss FC 300", "Python", "MySQL", "Grafana", "OEE"],
    filter: ["All", "Automação"],
    thumbnail: "/images/Projeto_Send_Receive.svg",
    github: "#",
    link: null,
  },
  {
    id: 3,
    title: "Visão Artificial na Rotuladora — Raspberry Pi",
    about:
      "Sistema de inspeção visual de alta velocidade desenvolvido com Raspberry Pi e câmara, programado em Python com OpenCV, para detetar garrafas sem rótulo ou com rótulo desalinhado. Integrado com registo de deslocamento (shift register / FIFO) para seguir cada garrafa na linha e garantir rejeição precisa no transporte de saída, reforçando a qualidade e segurança alimentar na FontSalem (Grupo Damm).",
    tech: ["Python", "OpenCV", "Raspberry Pi", "Shift Register", "FIFO", "Visão Computacional"],
    filter: ["All", "Automação"],
    thumbnail: "/images/Projeto_Smart-Person-Detection-PLC.svg",
    github: "#",
    link: null,
  },
  {
    id: 4,
    title: "Sistema Auto Flush na Enchedora — FontSalem",
    about:
      "Recuperação de função de segurança alimentar parada há anos numa enchedora KHS, sem deteção inteligente de ciclo. Foi criado um encoder virtual do eixo cardan com sensores adicionais para identificar com precisão a válvula onde rebentou a garrafa. O sistema interrompe o enchimento e lava a válvula afetada e as 2 adjacentes nos ciclos seguintes, rejeitando as garrafas no inspetor Checkmat. Contaminação eliminada e segurança alimentar reforçada.",
    tech: ["Siemens TIA Portal", "SCL", "Encoder Virtual", "KHS", "Checkmat", "Segurança Alimentar"],
    filter: ["All", "Automação"],
    thumbnail: "/images/Projeto_Desenvolvimento.svg",
    github: "#",
    link: null,
  },
  {
    id: 5,
    title: "Sistema de Desalcoolização Cervejeira — Ambev",
    about:
      "Projeto chave-na-mão de automação do processo de desalcoolização cervejeira para a Ambev Pernambuco. Da especificação técnica ao comissionamento e arranque (FAT/SAT): programação PLC (TIA Portal / RSLogix) para controlo preciso de temperatura, pressão, caudal e tempo de residência; supervisório iFIX integrado na arquitetura corporativa da Ambev; calibração de instrumentação e validação de receitas.",
    tech: ["TIA Portal", "RSLogix", "iFIX", "Modbus TCP", "Calibração", "FAT/SAT", "P&ID"],
    filter: ["All", "Automação"],
    thumbnail: "/images/Projeto_API_GO.svg",
    github: "#",
    link: null,
  },

  // ── PROJETOS DE CÓDIGO (repositórios GitHub) ──────────────────────────────

  {
    id: 6,
    title: "API REST Go para Controlo de PLC Siemens",
    about:
      "API RESTful em Go (Gin framework) para comunicação direta com PLCs Siemens via protocolo S7. Endpoints para leitura e escrita de variáveis em tempo real, permitindo integração com SCADA, MES e aplicações web. Inclui persistência com GORM, serialização JSON e containerização via Docker para deployment industrial simplificado.",
    tech: ["Go", "Gin", "REST API", "Siemens S7", "GORM", "Docker", "JSON"],
    filter: ["All", "Backend", "Automação"],
    thumbnail: "/images/Projeto_API_GO.svg",
    github: "https://github.com/danilohenriquesilvalira/Projeto_PLC",
    link: null,
  },
  {
    id: 7,
    title: "Sistema Radar Industrial SICK RMS1000",
    about:
      "Sistema que integra radar SICK RMS1000 com PLCs Siemens S7 e interface web para monitoramento em tempo real. Permite configuração dinâmica de áreas de detecção por amplitude de sinal, essencial para controlo de acesso em eclusas. Backend em Go com NATS e WebSocket; frontend React/TypeScript com visualização SVG em tempo real.",
    tech: ["Go", "NATS", "WebSocket", "React", "TypeScript", "Tailwind", "Siemens S7"],
    filter: ["All", "IT/OT", "Automação"],
    thumbnail: "/images/Projeto_Radar.svg",
    github: "https://github.com/danilohenriquesilvalira/RADAR_COLETAS",
    link: null,
  },
  {
    id: 8,
    title: "Smart Person Detection — Segurança Industrial",
    about:
      "Sistema de visão computacional para segurança em ambientes com máquinas: deteção de pessoas com Python, OpenCV e YOLOv5, com envio de sinais binários direto para PLC Siemens em caso de intrusão em zona proibida. O PLC aciona paragem imediata do equipamento. Registo de snapshots para auditoria e análise pós-evento.",
    tech: ["Python", "YOLOv5", "OpenCV", "Siemens S7", "Visão Computacional", "Segurança Industrial"],
    filter: ["All", "Backend", "Automação"],
    thumbnail: "/images/Projeto_Smart-Person-Detection-PLC.svg",
    github: "https://github.com/danilohenriquesilvalira/-Smart-Person-Detection-PLC",
    link: null,
  },
];

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
  // PROJETOS REAIS - PRIMEIROS
  {
    id: 1,
    title: "Sistema Radar Industrial SICK RMS1000",
    about: "Desenvolvi um sistema completo que integra o radar SICK RMS1000 com PLCs Siemens S7 e uma interface web para monitoramento em tempo real. Esta solução permite a configuração dinâmica de áreas de detecção baseadas em amplitude do sinal do radar, essencial para o controle de acesso e segurança em ambientes como eclusas. A comunicação utiliza Go e NATS para o backend, WebSocket para a transmissão de dados em tempo real para o frontend em React/TypeScript, e Tailwind para a estilização. O sistema oferece visualização precisa e gerenciamento flexível, garantindo operações automatizadas seguras e eficientes.",
    tech: ["Go", "NATS", "WebSocket", "React", "TypeScript", "Tailwind", "SVG/Figma", "Siemens S7"],
    filter: ["All", "Automação", "Front-end"],
    thumbnail: "/images/Projeto_Radar.svg",
    github: "https://github.com/danilohenriquesilvalira/RADAR_COLETAS",
    link: null
  },
  {
    id: 2,
    title: "Multi-PLC Communication System TCP/IP",
    about: "Implementei um sistema de comunicação TCP/IP de alta performance para múltiplos PLCs Siemens, utilizando as instruções nativas TSEND_C e TRCV_C no TIA Portal, programadas em SCL (Structured Control Language). Este sistema é projetado para assegurar a troca de sinais e dados críticos em tempo real, com funcionalidades robustas de controle de erro e recuperação automática. Essencial para arquiteturas de automação distribuídas, ele garante a sincronização e coordenação perfeita entre diferentes controladores, fundamentais para processos industriais complexos e de grande escala.",
    tech: ["STEP 7", "TIA Portal", "SCL", "TSEND_C/TRCV_C", "TCP/IP", "PROFINET", "S7-1500", "HMI"],
    filter: ["All", "Automação"],
    thumbnail: "/images/Projeto_Send_Receive.svg",
    github: "https://github.com/DaniloHenriqueLira/Automacao",
    link: null
  },
  {
    id: 3,
    title: "API REST Go para Controle PLC",
    about: "Desenvolvi uma API RESTful em Go, utilizando o framework Gin, para estabelecer uma comunicação direta e segura com PLCs Siemens. Esta API oferece endpoints para leitura e escrita de variáveis do PLC (Tags) em tempo real, permitindo a integração fluida com sistemas SCADA, MES e outras aplicações empresariais. A arquitetura inclui persistência de dados com GORM, serialização JSON e empacotamento via Docker, facilitando o deployment e a escalabilidade. É uma solução robusta para modernizar a conectividade entre o chão de fábrica e os sistemas de gestão.",
    tech: ["Go", "Gin", "REST API", "JSON", "Siemens S7", "TCP/IP", "GORM", "Docker"],
    filter: ["All", "Backend", "Automação"],
    thumbnail: "/images/Projeto_API_GO.svg",
    github: "https://github.com/danilohenriquesilvalira/Projeto_PLC",
    link: null
  },
  {
    id: 4,
    title: "Smart Person Detection PLC",
    about: "Este projeto inovador combina visão computacional com automação industrial para aprimorar drasticamente a segurança em ambientes com máquinas. Utilizando Python, OpenCV e o modelo YOLOv5 para detecção precisa de pessoas, o sistema processa imagens de câmeras em tempo real. Ao detectar a presença humana em áreas restritas, ele envia sinais binários (bits) diretamente para um PLC Siemens, que pode então acionar rapidamente medidas de segurança, como a paralisação imediata de equipamentos. A solução inclui a capacidade de registrar snapshots dos eventos de detecção, fornecendo dados visuais importantes para auditorias e análises. É uma aplicação prática de IA na segurança industrial, prevenindo acidentes e otimizando a interação homem-máquina.",
    tech: ["Python", "YOLOv5", "OpenCV", "Visão Computacional", "Siemens S7", "Automação", "Segurança Industrial"],
    filter: ["All", "Automação", "Backend"],
    thumbnail: "/images/Projeto_Smart-Person-Detection-PLC.svg",
    github: "https://github.com/danilohenriquesilvalira/-Smart-Person-Detection-PLC",
    link: null
  },

  // PROJETOS EM CONSTRUÇÃO - DEPOIS DOS REAIS
  {
    id: 5,
    title: "Dashboard IoT Indústria 4.0",
    about: "Em desenvolvimento: Uma plataforma web robusta para a Indústria 4.0, focada na visualização e análise de dados em tempo real de sensores IoT. Este dashboard permitirá o monitoramento detalhado do desempenho de ativos, o recebimento de alertas preditivos e a geração de relatórios customizáveis. Utilizando React para o frontend, Node.js para o backend, e MongoDB, InfluxDB e Grafana para gestão e visualização de dados, a plataforma visa otimizar processos de manufatura, identificar gargalos e apoiar a tomada de decisões estratégicas em tempo real.",
    tech: ["React", "Node.js", "MongoDB", "MQTT", "InfluxDB", "Grafana"],
    filter: ["All", "IoT", "Web Development"],
    thumbnail: "/images/Projeto_Desenvolvimento.svg",
    github: "#",
    link: "#"
  },
  {
    id: 6,
    title: "App Mobile Manutenção Industrial",
    about: "Em desenvolvimento: Um aplicativo mobile nativo (React Native) para otimizar a gestão da manutenção industrial. Ele permitirá que equipes de campo registrem e acompanhem ordens de serviço (preventivas e corretivas) com agilidade, recebam notificações push sobre eventos críticos de equipamentos e acessem manuais técnicos. Integrado com Firebase para backend e dados, este app visa digitalizar e simplificar os fluxos de trabalho da manutenção, reduzindo o tempo de inatividade e aumentando a eficiência operacional.",
    tech: ["React Native", "Firebase", "TypeScript", "Push Notifications"],
    filter: ["All", "Mobile"],
    thumbnail: "/images/Projeto_Desenvolvimento.svg",
    github: "#",
    link: "#"
  },
];
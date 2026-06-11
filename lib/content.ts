export type Lang = "es" | "en";

export type Project = {
  slug: string;
  title: string;
  descriptor: string;
  crumb: string;
  client: string;
  inProgress?: boolean;
  media: "cube" | "wave" | "grid" | "bars";
  featured?: boolean;
  overview: string;
  role: string;
  challenge: string;
  solution: string;
  process: string[];
  outcome: string;
  keyPoints?: string[];
  assets: string[];
  cta: string;
  externalUrl?: string;
  /** Métrica corta para la tarjeta (mono, estilo OS). */
  metric?: string;
  /** Videos de YouTube embebidos en el case study. */
  videos?: { id: string; label: string; start?: number }[];
};

export type ArchiveItem = {
  name: string;
  descriptor: string;
  desc?: string;
};

export type Fact = { label: string; value: string };

const PROJECTS_ES: Project[] = [
  {
    slug: "telemira",
    title: "Telemira",
    descriptor: "Canal ficticio generado con IA",
    crumb: "Telemira · Canal ficticio IA",
    client: "Proyecto original",
    inProgress: true,
    media: "cube",
    featured: true,
    externalUrl: "https://www.telemira.tv",
    overview:
      "Un universo televisivo ficticio creado con inteligencia artificial, donde conviven matinales, teleseries, realities, comerciales, personajes, marcas internas y una continuidad narrativa propia.",
    role: "Showrunner / Dirección creativa / Desarrollo de formatos / Escritura / Producción con IA",
    challenge:
      "Explorar cómo la inteligencia artificial puede pasar de ser una herramienta para producir piezas sueltas a convertirse en un sistema para crear mundos narrativos completos.",
    solution:
      "Crear una señal televisiva ficticia con identidad propia: programas, personajes, comerciales, gráficas, tono editorial y expansión transmedia.",
    process: [
      "Conceptualización del universo.",
      "Desarrollo de personajes y programas.",
      "Escritura de sketches, cápsulas y continuidad.",
      "Diseño de lógica transmedia.",
      "Producción de piezas con herramientas de IA generativa.",
      "Integración de marcas ficticias y posibilidades para marcas reales.",
    ],
    outcome:
      "Telemira funciona como prueba de concepto de una nueva forma de producción audiovisual: más rápida, escalable, autoral y abierta a branded entertainment.",
    assets: [
      "Personajes",
      "Capturas del sitio",
      "Redes de personajes",
      "Identidad de marca",
      "Estética de transmisión",
    ],
    cta: "Explorar Telemira",
    videos: [
      { id: "7r26brD8X0g", label: "Señal Telemira — muestra en emisión" },
    ],
  },
  {
    slug: "mirai-media",
    title: "Mirai Media",
    descriptor: "Laboratorio creativo de formatos IA",
    crumb: "Mirai Media · Laboratorio creativo IA",
    client: "Proyecto original",
    media: "grid",
    featured: true,
    overview:
      "Mirai Media funciona como un espacio de experimentación audiovisual donde se diseñan programas, personajes, mundos gráficos y piezas de comunicación usando IA como parte del proceso creativo. La propuesta mezcla dirección de contenidos, narrativa televisiva, diseño de formatos, producción digital y generación visual para crear universos reconocibles, escalables y con identidad propia.",
    role: "Showrunner / Dirección creativa / Storytelling / Generación visual con IA / Diseño de formatos",
    challenge:
      "Desarrollar formatos y narrativas con herramientas de IA que tengan identidad autoral y coherencia visual, superando la limitación de la IA para generar contenido consistente.",
    solution:
      "Combinar dirección de contenido tradicional con workflows de IA generativa para el prototipado rápido de personajes y universos gráficos coherentes.",
    process: [
      "Conceptualización de formatos y tonos",
      "Desarrollo visual de personajes con IA",
      "Diseño de iconografía y universos visuales",
      "Workflow de stickers y collage editorial",
      "Prototipado rápido de pilotos y cápsulas",
    ],
    outcome:
      "Formatos como La Javi y Gloria desde los 40 listos para su desarrollo de contenidos, producción de piezas y distribución digital multi-plataforma.",
    assets: [
      "La Javi (Personaje)",
      "Café Gloria (Sticker)",
      "Corazón Roto (Sticker)",
      "Pastilla Alada (Sticker)",
      "Identidad visual Mirai",
      "Póster promocional",
      "Material de archivo",
    ],
    cta: "Ver universo Mirai",
    videos: [
      { id: "0TW0EQv-i5U", label: "El Show de Las Javis — Cómo ser chilena", start: 55 },
    ],
  },
  {
    slug: "wbd",
    title: "Warner Bros. Discovery / NED Media",
    descriptor: "Operación social-first a escala LATAM",
    crumb: "WBD · Operación social-first",
    client: "Warner Bros. Discovery",
    media: "wave",
    metric: "300 VIDEOS/DÍA · 2× REVENUE DIGITAL",
    overview:
      "Diseño y liderazgo de un sistema de producción digital para múltiples marcas de entretenimiento en Latinoamérica, Brasil y US Hispanic.",
    role: "Director de contenidos / Dirección creativa / Estrategia social-first / Coordinación regional",
    challenge:
      "Crear un flujo capaz de sostener alto volumen de producción, adaptación regional y consistencia editorial para marcas globales de entretenimiento.",
    solution:
      "Diseñar e implementar un workflow social-first para producir, adaptar y distribuir contenido digital a escala regional.",
    process: [
      "Desarrollo de workflow de producción social-first.",
      "Coordinación de equipos remotos en varios países.",
      "Producción de alto volumen para marcas de entretenimiento.",
      "Adaptación de contenidos por plataforma, territorio y audiencia.",
      "Optimización de procesos editoriales y comerciales.",
    ],
    outcome:
      "Una operación de contenido capaz de sostener volumen, calidad y consistencia editorial en múltiples mercados y plataformas.",
    keyPoints: [
      "Hasta 300 videos diarios.",
      "Equipos remotos en Chile, Perú, Brasil y Argentina.",
      "Contenido para Discovery, Warner Channel, Cartoon Network, Discovery Kids, Food Network, Home & Health, Animal Planet, entre otras.",
      "Crecimiento de 2× en ingresos digitales desde el inicio de la operación.",
    ],
    assets: [
      "Discovery Channel",
      "Warner Bros.",
      "HBO Max",
      "CNN",
      "Cartoon Network",
      "Food Network",
      "Animal Planet",
      "TLC",
    ],
    cta: "Ver operación",
  },
  {
    slug: "duoc",
    title: "DUOC UC",
    descriptor: "IA generativa para educación audiovisual",
    crumb: "DUOC UC · IA generativa",
    client: "DUOC UC",
    media: "grid",
    overview:
      "Asesoría en diseño de malla 2026 con foco en inteligencia artificial generativa, junto con el desarrollo de una serie audiovisual educativa con presentadora IA.",
    role: "Consultoría IA / Dirección creativa / Storytelling educativo / Desarrollo audiovisual",
    challenge:
      "Integrar la inteligencia artificial generativa en una mirada formativa y aplicada, conectando nuevos lenguajes tecnológicos con necesidades reales de aprendizaje audiovisual.",
    solution:
      "Combinar asesoría estratégica para diseño curricular con una aplicación concreta de producción audiovisual educativa usando herramientas de IA.",
    process: [
      "Asesoría en diseño de malla 2026.",
      "Foco en IA generativa aplicada a contenidos.",
      "Desarrollo de serie audiovisual educativa.",
      "Conceptualización de presentadora IA.",
      "Integración de voz y herramientas IA.",
      "Traducción de contenidos educativos a formato audiovisual.",
    ],
    outcome:
      "Un caso que conecta adopción tecnológica, formación, producción audiovisual y transferencia de capacidades.",
    assets: [
      "Imagen de presentadora IA",
      "Clips de la serie",
      "Capturas de plataforma",
      "Workflow educativo",
      "Estructura de episodios",
      "Módulos de malla / temas IA",
    ],
    cta: "Ver caso educativo",
  },
  {
    slug: "prisa",
    title: "PRISA Media Chile",
    descriptor: "Monetización y formatos de video a partir de contenido radial",
    crumb: "PRISA · Video digital",
    client: "PRISA Media Chile",
    media: "bars",
    metric: "RADIO → VIDEO · MONETIZACIÓN ACTIVADA",
    overview:
      "Consultoría enfocada en crecimiento, empaquetamiento y monetización de video digital para un ecosistema de marcas de medios. Activación de la monetización y diseño de formatos audiovisuales que parten de contenido originalmente solo auditivo (radios).",
    role: "Consultoría estratégica / Video digital / Audiencias / Monetización",
    challenge:
      "Detectar oportunidades para que marcas de medios con audiencias existentes puedan expandir su presencia en video digital y convertirla en valor comercial.",
    solution:
      "Desarrollar una mirada estratégica sobre audiencias, plataformas, formatos monetizables, empaquetamiento comercial y oportunidades de branded content.",
    process: [
      "Diagnóstico de audiencias.",
      "Revisión de comunidades por plataforma.",
      "Identificación de oportunidades de video social.",
      "Propuesta de formatos monetizables.",
      "Exploración de paquetes comerciales.",
      "Estrategia de distribución.",
      "Roadmap de crecimiento digital.",
    ],
    outcome:
      "Una consultoría orientada a transformar presencia digital y comunidades existentes en una estrategia de video con foco en crecimiento y monetización.",
    assets: [
      "Mapa de marcas",
      "Matriz de plataformas",
      "Diagnóstico de comunidades",
      "Diagrama de oportunidades",
      "Roadmap de monetización",
      "Propuestas de formatos",
    ],
    cta: "Ver estrategia",
  },
  {
    slug: "panamericanos",
    title: "Santiago 2023 / Panamericanos",
    descriptor: "La campaña que obtuvo la sede para Santiago",
    crumb: "Santiago 2023 · Panamericanos",
    client: "Santiago 2023 / Panam Sports / Min. Deporte",
    media: "wave",
    metric: "SEDE OBTENIDA POR UNANIMIDAD",
    overview:
      "Participación en el desarrollo de contenidos y narrativa audiovisual vinculada a la postulación y obtención de Santiago como ciudad sede de los Juegos Panamericanos 2023. Una experiencia asociada a comunicación estratégica, relato territorial, deporte, identidad regional y producción de contenidos para un evento de escala continental. El proyecto combinó mirada editorial, sensibilidad institucional y capacidad de síntesis audiovisual para construir una narrativa capaz de representar a Santiago y Chile frente a una audiencia internacional. La experiencia conecta deporte, ciudad, cultura, producción audiovisual y comunicación de alto impacto, en el contexto de uno de los hitos deportivos más relevantes realizados en el país.",
    role: "Dirección de contenidos / Dirección creativa / Estrategia de comunicación / Relato territorial",
    challenge:
      "Construir un relato de postulación nacional convincente y con alcance regional que unificara criterios institucionales, deportivos y ciudadanos bajo una sola identidad país frente al comité internacional.",
    solution:
      "Diseñar un sistema de contenidos y piezas audiovisuales con foco emocional y estratégico, destacando la infraestructura de Santiago, la identidad cultural de Chile y el impacto territorial del evento.",
    process: [
      "Análisis de la candidatura de la ciudad.",
      "Desarrollo de la narrativa estratégica del relato país.",
      "Producción de piezas de video con foco emocional y deportivo.",
      "Coordinación de contenidos con foco institucional y federaciones.",
      "Estrategia de comunicación territorial para audiencias locales.",
    ],
    outcome:
      "Obtención unánime de la sede de los Juegos Panamericanos y Parapanamericanos de Santiago 2023, estableciendo un estándar de comunicación estratégica para candidaturas deportivas del país.",
    keyPoints: [
      "Candidatura aprobada por unanimidad.",
      "Narrativa país integrada con el Ministerio del Deporte.",
      "Impacto masivo de contenidos institucionales y de difusión.",
      "Producción de piezas de alto impacto presentadas ante Panam Sports.",
    ],
    assets: [
      "Plan de contenidos de candidatura",
      "Estructura narrativa del relato país",
      "Cápsula de postulación oficial",
      "Spots de difusión regional",
      "Mapa de impacto territorial",
      "Señalética y piezas de campaña",
    ],
    cta: "Explorar proyecto",
  },
];

const PROJECTS_EN: Project[] = [
  {
    slug: "telemira",
    title: "Telemira",
    descriptor: "AI-generated fictional TV channel",
    crumb: "Telemira · AI fictional channel",
    client: "Original project",
    inProgress: true,
    media: "cube",
    featured: true,
    externalUrl: "https://www.telemira.tv",
    overview:
      "A fictional television universe created with artificial intelligence, where morning shows, telenovelas, reality shows, commercials, characters, internal brands and narrative continuity coexist.",
    role: "Showrunner / Creative Direction / Format Development / Writing / AI Production",
    challenge:
      "Explore how artificial intelligence can move beyond isolated content generation and become a system for building complete narrative worlds.",
    solution:
      "Create a fictional TV signal with its own identity: shows, characters, commercials, graphics, editorial tone and transmedia expansion.",
    process: [
      "Universe conceptualization.",
      "Character and format development.",
      "Writing sketches, capsules and continuity.",
      "Transmedia logic design.",
      "Production using generative AI tools.",
      "Integration of fictional brands and potential real brand opportunities.",
    ],
    outcome:
      "Telemira works as a proof of concept for a new kind of audiovisual production: faster, scalable, authored and open to branded entertainment.",
    assets: [
      "Characters",
      "Website captures",
      "Character social accounts",
      "Brand identity",
      "Broadcast aesthetic",
    ],
    cta: "Explore Telemira",
    videos: [
      { id: "7r26brD8X0g", label: "Telemira signal — on-air sample" },
    ],
  },
  {
    slug: "mirai-media",
    title: "Mirai Media",
    descriptor: "Creative laboratory for AI formats",
    crumb: "Mirai Media · Creative AI lab",
    client: "Original project",
    media: "grid",
    featured: true,
    overview:
      "Mirai Media works as an audiovisual experimentation space where shows, characters, graphic worlds and communication pieces are designed using AI as part of the creative process. The proposal mixes content direction, TV storytelling, format design, digital production and visual generation to create recognizable, scalable universes with their own identity.",
    role: "Showrunner / Creative Direction / Storytelling / AI Visual Generation / Format Design",
    challenge:
      "Develop formats and narratives with AI tools that possess authorial identity and visual coherence, overcoming AI limitations in generating consistent content.",
    solution:
      "Combine traditional content direction with generative AI workflows for rapid prototyping of coherent characters and graphic universes.",
    process: [
      "Format and tone conceptualization",
      "AI character visual development",
      "Iconography and visual universe design",
      "Stickers and editorial collage workflow",
      "Rapid prototyping of pilots and capsules",
    ],
    outcome:
      "Formats like La Javi and Gloria desde los 40 ready for content development, production, and multi-platform digital distribution.",
    assets: [
      "La Javi (Character)",
      "Café Gloria (Sticker)",
      "Broken Heart (Sticker)",
      "Winged Pill (Sticker)",
      "Mirai visual identity",
      "Promotional poster",
      "Archive material",
    ],
    cta: "Explore Mirai",
    videos: [
      { id: "0TW0EQv-i5U", label: "El Show de Las Javis — How to be Chilean", start: 55 },
    ],
  },
  {
    slug: "wbd",
    title: "Warner Bros. Discovery / NED Media",
    descriptor: "Social-first content operation at LATAM scale",
    crumb: "WBD · Social-first operation",
    client: "Warner Bros. Discovery",
    media: "wave",
    metric: "300 VIDEOS/DAY · 2× DIGITAL REVENUE",
    overview:
      "Design and leadership of a digital production system for multiple entertainment brands across Latin America, Brazil and US Hispanic markets.",
    role: "Content Director / Creative Direction / Social-first Strategy / Regional Coordination",
    challenge:
      "Create a workflow capable of sustaining high-volume production, regional adaptation and editorial consistency for global entertainment brands.",
    solution:
      "Design and implement a social-first workflow to produce, adapt and distribute digital content at regional scale.",
    process: [
      "Social-first production workflow design.",
      "Coordination of remote teams across several countries.",
      "High-volume production for entertainment brands.",
      "Content adaptation by platform, territory and audience.",
      "Editorial and commercial process optimization.",
    ],
    outcome:
      "A content operation able to sustain volume, quality and editorial consistency across multiple markets and platforms.",
    keyPoints: [
      "Up to 300 videos produced daily.",
      "Remote teams in Chile, Peru, Brazil and Argentina.",
      "Content for brands such as Discovery, Warner Channel, Cartoon Network, Discovery Kids, Food Network, Home & Health, Animal Planet and others.",
      "2× digital revenue growth from the beginning of the operation.",
    ],
    assets: [
      "Discovery Channel",
      "Warner Bros.",
      "HBO Max",
      "CNN",
      "Cartoon Network",
      "Food Network",
      "Animal Planet",
      "TLC",
    ],
    cta: "View operation",
  },
  {
    slug: "duoc",
    title: "DUOC UC",
    descriptor: "Generative AI for audiovisual education",
    crumb: "DUOC UC · Generative AI",
    client: "DUOC UC",
    media: "grid",
    overview:
      "Consulting for the 2026 curriculum design with a focus on generative artificial intelligence, combined with the development of an educational audiovisual series featuring an AI presenter.",
    role: "AI Consulting / Creative Direction / Educational Storytelling / Audiovisual Development",
    challenge:
      "Integrate generative AI into an applied educational perspective, connecting new technological languages with real audiovisual learning needs.",
    solution:
      "Combine strategic curriculum consulting with a concrete educational audiovisual production using AI tools.",
    process: [
      "Consulting for the 2026 curriculum design.",
      "Focus on generative AI applied to content.",
      "Development of an educational audiovisual series.",
      "Conceptualization of an AI presenter.",
      "Integration of voice and AI tools.",
      "Translation of educational content into audiovisual format.",
    ],
    outcome:
      "A case connecting technology adoption, education, audiovisual production and capability transfer.",
    assets: [
      "AI presenter image",
      "Series clips",
      "Platform captures",
      "Educational workflow",
      "Episode structure",
      "Curriculum modules / AI topics",
    ],
    cta: "View education case",
  },
  {
    slug: "prisa",
    title: "PRISA Media Chile",
    descriptor: "Monetization and video formats built from radio content",
    crumb: "PRISA · Digital video",
    client: "PRISA Media Chile",
    media: "bars",
    metric: "RADIO → VIDEO · MONETIZATION ACTIVATED",
    overview:
      "Consulting focused on growth, packaging and digital video monetization for a media brand ecosystem. Monetization activation and the design of audiovisual formats built from originally audio-only (radio) content.",
    role: "Strategic Consulting / Digital Video / Audiences / Monetization",
    challenge:
      "Identify opportunities for media brands with existing audiences to expand their digital video presence and turn it into commercial value.",
    solution:
      "Develop a strategic perspective on audiences, platforms, monetizable formats, commercial packaging and branded content opportunities.",
    process: [
      "Audience diagnosis.",
      "Review of communities by platform.",
      "Identification of social video opportunities.",
      "Monetizable format proposals.",
      "Exploration of commercial packages.",
      "Distribution strategy.",
      "Digital growth roadmap.",
    ],
    outcome:
      "A consulting project focused on transforming existing communities and digital presence into a video strategy with growth and monetization potential.",
    assets: [
      "Brand map",
      "Platform matrix",
      "Community diagnosis",
      "Opportunity diagram",
      "Monetization roadmap",
      "Format proposals",
    ],
    cta: "View strategy",
  },
  {
    slug: "panamericanos",
    title: "Santiago 2023 / Pan Americans",
    descriptor: "The bid campaign that won Santiago the host city",
    crumb: "Santiago 2023 · Pan Americans",
    client: "Santiago 2023 / Panam Sports / Min. Deporte",
    media: "wave",
    metric: "HOST CITY WON UNANIMOUSLY",
    overview:
      "Participation in the development of content and audiovisual narrative linked to the bid and acquisition of Santiago as the host city for the 2023 Pan American Games. An experience associated with strategic communication, territorial storytelling, sports, regional identity, and content production for a continent-scale event. The project combined editorial vision, institutional sensitivity, and audiovisual synthesis capacity to build a narrative capable of representing Santiago and Chile to an international audience. The experience connects sports, city, culture, audiovisual production, and high-impact communication within the context of one of the most relevant sports milestones in the country's history.",
    role: "Content Director / Creative Direction / Communication Strategy / Territorial Storytelling",
    challenge:
      "Build a convincing national bid narrative with regional scope that unified institutional, sporting, and citizen criteria under a single country identity for the international committee.",
    solution:
      "Design a system of content and audiovisual pieces with an emotional and strategic focus, highlighting Santiago's infrastructure, Chile's cultural identity, and the territorial impact of the event.",
    process: [
      "City candidacy analysis.",
      "Development of the country narrative strategic storytelling.",
      "Production of video pieces with emotional and sporting focus.",
      "Content coordination with institutional focus and federations.",
      "Territorial communication strategy for local audiences.",
    ],
    outcome:
      "Unanimous acquisition of the host city status for the Santiago 2023 Pan American and Parapan American Games, setting a strategic communication standard for the country's sports bids.",
    keyPoints: [
      "Candidacy approved unanimously.",
      "Country narrative integrated with the Ministry of Sport.",
      "Massive impact of institutional and promotional content.",
      "Production of high-impact pieces presented before Panam Sports.",
    ],
    assets: [
      "Candidacy content plan",
      "Country narrative structure",
      "Official bid video capsule",
      "Regional promotional spots",
      "Territorial impact map",
      "Campaign signage and pieces",
    ],
    cta: "Explore project",
  },
];

export const DICT = {
  es: {
    meta: {
      title: "Ismael Larraín — Director Creativo & AI Content Showrunner",
      description:
        "Portfolio de Ismael Larraín, director creativo y AI Content Showrunner. Formatos, mundos narrativos, sistemas de contenido, IA generativa, social video y monetización digital.",
    },
    chrome: { availability: "Disponible · 2026" },
    nav: ["Inicio", "Qué hago", "Proyectos", "Método", "Experiencia", "Entrevistas", "Contacto"],
    tabs: ["Inicio", "Proyectos", "Método", "Contacto"],
    hero: {
      eyebrow: "Portfolio — 2026",
      available: "Disponible para proyectos",
      h1a: "Director Creativo &",
      h1b: "AI Content Showrunner",
      lead: "Diseño formatos, mundos narrativos y sistemas de contenido para marcas, medios y plataformas digitales.",
      sub: "Combino storytelling, producción audiovisual, social video e inteligencia artificial generativa para construir contenido escalable, con identidad y relevancia cultural.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Hablemos",
      nowLabel: "Ahora en producción",
      nowTitle: "Telemira",
      nowDesc: "Señal en vivo · canal ficticio generado con IA",
      nowCta: "Explorar",
    },
    folders: [
      { label: "Proyectos destacados", sub: "Casos seleccionados", target: "sec-work" },
      { label: "Sistemas de trabajo", sub: "Método y workflows", target: "sec-method" },
    ],
    services: {
      label: "Qué hago",
      title: "Qué hago",
      blocks: [
        {
          num: "01",
          title: "Dirección creativa",
          desc: "Conceptualización de campañas, formatos, universos narrativos y sistemas de contenido con una mirada editorial, audiovisual y cultural.",
        },
        {
          num: "02",
          title: "Sistemas de IA generativa",
          desc: "Flujos creativos con inteligencia artificial para desarrollar, producir, versionar y escalar contenido sin perder identidad.",
        },
        {
          num: "03",
          title: "Social video & plataformas",
          desc: "Estrategias y formatos nativos para YouTube, TikTok, Instagram y ecosistemas digitales donde el contenido compite por atención real.",
        },
        {
          num: "04",
          title: "Branded entertainment",
          desc: "Personajes, mundos, formatos y experiencias donde las marcas entran a la narrativa sin sentirse como publicidad tradicional.",
        },
      ],
    },
    work: {
      label: "Proyectos",
      title: "Proyectos destacados",
      windowTitle: "Proyectos",
      crumb: "Casos seleccionados",
    },
    method: {
      label: "Método",
      title: "Creative OS Method",
      intro:
        "Un método para convertir ideas, audiencias y objetivos de negocio en sistemas de contenido capaces de producir, adaptarse y escalar.",
      stages: [
        { num: "01", name: "Decode", desc: "Entender marca, audiencia, cultura, negocio y oportunidad." },
        { num: "02", name: "Design", desc: "Diseñar arquitectura narrativa, concepto, tono, formato y sistema visual." },
        { num: "03", name: "Prototype", desc: "Probar ideas, personajes, workflows, piezas, guiones y lenguajes visuales." },
        { num: "04", name: "Produce", desc: "Activar producción: guion, imagen, video, audio, edición, publicación y coordinación." },
        { num: "05", name: "Scale", desc: "Versionar, distribuir, medir y expandir el sistema hacia nuevas plataformas o audiencias." },
      ],
    },
    exp: {
      label: "Experiencia",
      title: "Experiencia seleccionada",
      items: [
        { num: "01", org: "Wemul", desc: "Dirección creativa, producción ejecutiva y desarrollo de proyectos de contenido con IA para marcas." },
        { num: "02", org: "MiraiMedia / Lab703", desc: "Producción virtual, Unreal, IA generativa y nuevos flujos audiovisuales." },
        { num: "03", org: "Woki Toki / Daplei", desc: "Dirección creativa en Daplei dentro del ecosistema Woki Toki, con foco en humor digital, branded content, cultura internet y formatos virales." },
        { num: "04", org: "NED Media", meta: "Director de Contenidos · 2015 — 2023", desc: "Dirección de contenidos digitales y operaciones editoriales para marcas, medios y señales internacionales. Lideré equipos remotos, flujos de producción social-first y estrategias de video digital para clientes como Discovery, WarnerMedia, Cartoon Network, Animal Planet, Discovery Kids, Home & Health, Marca Chile, Sernatur, Coca-Cola y el Ministerio del Deporte." },
        { num: "05", org: "Chilevisión", desc: "Televisión abierta, desarrollo audiovisual, contenidos culturales, criterio editorial y lenguaje televisivo." },
      ],
    },
    interviews: [
      {
        label: "Entrevista destacada",
        medium: "Porcel TV · 2025",
        desc: "Conversación sobre el futuro de la producción audiovisual y la adopción de inteligencia artificial generativa en industrias creativas.",
        cta: "Ver en YouTube",
        url: "https://youtu.be/XdFfGpapsjA?si=PxrReE7XtA1PxZbC&t=3235"
      },
      {
        label: "Entrevista destacada",
        medium: "Take a Look",
        desc: "Entrevista sobre el rol del Director Creativo, el liderazgo de equipos y la visión estratégica en el sector audiovisual.",
        cta: "Ver en YouTube",
        url: "https://www.youtube.com/watch?v=Pzkyf_f_vOg&t=11s"
      }
    ],
    interviewsSection: {
      label: "Entrevistas",
      title: "Entrevistas destacadas",
    },
    about: {
      label: "Sobre mí",
      title: "Sobre mí",
      p1: "Soy director creativo y showrunner audiovisual. He trabajado entre televisión, branded content, social video y producción digital para marcas, medios y plataformas.",
      p2: "En los últimos años he integrado inteligencia artificial generativa a mis procesos creativos para desarrollar formatos, personajes, campañas y sistemas de contenido más ágiles, escalables y originales.",
      p3: "Me interesan los cruces entre cultura popular, tecnología, humor, narrativa y nuevas formas de producción audiovisual.",
      facts: [
        { label: "Rol", value: "Director creativo & showrunner" },
        { label: "Base", value: "Santiago, Chile" },
        { label: "Foco", value: "IA generativa · video digital" },
        { label: "Estado", value: "Proyectos globales" },
      ] as Fact[],
      portraitCap: "ISMAEL LARRAÍN",
    },
    contact: {
      label: "Contacto",
      headline: "Construyamos algo que valga la pena mirar.",
      windowTitle: "Nuevo mensaje_",
      support: "Disponible para dirección creativa, consultoría IA, branded entertainment, desarrollo de formatos y estrategias de video digital.",
      facts: [
        { label: "Email", value: "ismael.larrain@gmail.com" },
        { label: "Base", value: "Santiago, Chile" },
        { label: "Estado", value: "Proyectos globales" },
      ] as Fact[],
      ctaPrimary: "Escríbeme por WhatsApp",
      ctaSecondary: "Ver LinkedIn",
      waText: "Hola Ismael, vi tu portfolio y me gustaría conversar sobre un proyecto.",
    },
    footer: { copyright: "© 2026 · Santiago, Chile" },
    ui: {
      back: "← Volver",
      role: "Rol",
      client: "Cliente",
      status: "Estado",
      challenge: "Desafío",
      solution: "Solución",
      process: "Proceso",
      outcome: "Resultado",
      assets: "Material sugerido",
      assetsHint: "PLACEHOLDERS — REEMPLAZAR CON MATERIAL REAL",
      keyPoints: "Puntos clave",
      related: "Más proyectos",
      next: "Siguiente proyecto →",
    },
    statusProgress: "En curso",
    statusDone: "Completado",
    projects: PROJECTS_ES,
  },
  en: {
    meta: {
      title: "Ismael Larraín — Creative Director & AI Content Showrunner",
      description:
        "Portfolio of Ismael Larraín, Creative Director and AI Content Showrunner. Formats, narrative worlds, content systems, generative AI, social video and digital monetization.",
    },
    chrome: { availability: "Available · 2026" },
    nav: ["Home", "What I do", "Work", "Method", "Experience", "Interviews", "Contact"],
    tabs: ["Home", "Work", "Method", "Contact"],
    hero: {
      eyebrow: "Portfolio — 2026",
      available: "Available for projects",
      h1a: "Creative Director &",
      h1b: "AI Content Showrunner",
      lead: "I design formats, narrative worlds and content systems for brands, media companies and digital platforms.",
      sub: "Combining storytelling, audiovisual production, social video and generative AI to build scalable content with identity and cultural relevance.",
      ctaPrimary: "View work",
      ctaSecondary: "Let's talk",
      nowLabel: "Now in production",
      nowTitle: "Telemira",
      nowDesc: "Live signal · AI-generated fictional channel",
      nowCta: "Explore",
    },
    folders: [
      { label: "Featured work", sub: "Selected cases", target: "sec-work" },
      { label: "Work systems", sub: "Method & workflows", target: "sec-method" },
    ],
    services: {
      label: "What I do",
      title: "What I do",
      blocks: [
        { num: "01", title: "Creative Direction", desc: "Concept development, campaigns, formats, narrative worlds and content systems with an editorial, audiovisual and cultural point of view." },
        { num: "02", title: "Generative AI Systems", desc: "AI-powered creative workflows to develop, produce, version and scale content without losing identity." },
        { num: "03", title: "Social Video & Platforms", desc: "Native strategies and formats for YouTube, TikTok, Instagram and digital ecosystems where content competes for real attention." },
        { num: "04", title: "Branded Entertainment", desc: "Characters, worlds, formats and experiences where brands become part of the story instead of interrupting it." },
      ],
    },
    work: {
      label: "Work",
      title: "Featured work",
      windowTitle: "Work",
      crumb: "Selected cases",
    },
    method: {
      label: "Method",
      title: "Creative OS Method",
      intro: "A method for turning ideas, audiences and business goals into content systems capable of producing, adapting and scaling.",
      stages: [
        { num: "01", name: "Decode", desc: "Understand brand, audience, culture, business and opportunity." },
        { num: "02", name: "Design", desc: "Design narrative architecture, concept, tone, format and visual system." },
        { num: "03", name: "Prototype", desc: "Test ideas, characters, workflows, pieces, scripts and visual languages." },
        { num: "04", name: "Produce", desc: "Activate production: writing, image, video, audio, editing, publishing and coordination." },
        { num: "05", name: "Scale", desc: "Version, distribute, measure and expand the system into new platforms or audiences." },
      ],
    },
    exp: {
      label: "Experience",
      title: "Selected experience",
      items: [
        { num: "01", org: "Wemul", desc: "Creative direction, executive production and development of AI-powered content projects for brands." },
        { num: "02", org: "MiraiMedia / Lab703", desc: "Virtual production, Unreal, generative AI and new audiovisual workflows." },
        { num: "03", org: "Woki Toki / Daplei", desc: "Creative direction at Daplei within the Woki Toki ecosystem, focused on digital humor, branded content, internet culture and viral formats." },
        { num: "04", org: "NED Media", meta: "Content Director · 2015 — 2023", desc: "Digital content direction and editorial operations for brands, media companies and international TV networks. Led remote teams, social-first production workflows and digital video strategies for clients such as Discovery, WarnerMedia, Cartoon Network, Animal Planet, Discovery Kids, Home & Health, Marca Chile, Sernatur, Coca-Cola and Chile's Ministry of Sport." },
        { num: "05", org: "Chilevisión", desc: "Broadcast television, audiovisual development, cultural content, editorial judgment and TV language." },
      ],
    },
    interviews: [
      {
        label: "Featured Interview",
        medium: "Porcel TV · 2025",
        desc: "A conversation on the future of audiovisual production and generative AI adoption in creative industries.",
        cta: "Watch on YouTube",
        url: "https://youtu.be/XdFfGpapsjA?si=PxrReE7XtA1PxZbC&t=3235"
      },
      {
        label: "Featured Interview",
        medium: "Take a Look",
        desc: "An interview on the role of a Creative Director, team leadership, and strategic vision development in the media industry.",
        cta: "Watch on YouTube",
        url: "https://www.youtube.com/watch?v=Pzkyf_f_vOg&t=11s"
      }
    ],
    interviewsSection: {
      label: "Interviews",
      title: "Featured Interviews",
    },
    about: {
      label: "About",
      title: "About",
      p1: "I am a creative director and audiovisual showrunner working across television, branded content, social video and digital production for brands, media companies and platforms.",
      p2: "In recent years, I have integrated generative artificial intelligence into my creative processes to develop formats, characters, campaigns and content systems that are more agile, scalable and original.",
      p3: "I am interested in the intersection of pop culture, technology, humor, storytelling and new forms of audiovisual production.",
      facts: [
        { label: "Role", value: "Creative director & showrunner" },
        { label: "Base", value: "Santiago, Chile" },
        { label: "Focus", value: "Generative AI · digital video" },
        { label: "Status", value: "Global projects" },
      ] as Fact[],
      portraitCap: "ISMAEL LARRAÍN",
    },
    contact: {
      label: "Contact",
      headline: "Let's build something worth watching.",
      windowTitle: "New message_",
      support: "Available for creative direction, AI consulting, branded entertainment, format development and digital video strategy.",
      facts: [
        { label: "Email", value: "ismael.larrain@gmail.com" },
        { label: "Base", value: "Santiago, Chile" },
        { label: "Status", value: "Global projects" },
      ] as Fact[],
      ctaPrimary: "Message me on WhatsApp",
      ctaSecondary: "View LinkedIn",
      waText: "Hi Ismael, I saw your portfolio and would like to talk about a project.",
    },
    footer: { copyright: "© 2026 · Santiago, Chile" },
    ui: {
      back: "← Back",
      role: "Role",
      client: "Client",
      status: "Status",
      challenge: "Challenge",
      solution: "Solution",
      process: "Process",
      outcome: "Outcome",
      assets: "Suggested assets",
      assetsHint: "PLACEHOLDERS — SWAP FOR REAL MATERIAL",
      keyPoints: "Key points",
      related: "More projects",
      next: "Next project →",
    },
    statusProgress: "In progress",
    statusDone: "Completed",
    projects: PROJECTS_EN,
  },
};

export const WHATSAPP = "https://wa.me/56993222822";
export const LINKEDIN = "https://www.linkedin.com/in/ismael-larrain-izquierdo-23563a24/";
export const EMAIL = "ismael.larrain@gmail.com";
export const NAV_ICONS = ["house", "layers", "folder", "workflow", "clock", "tv", "mail"];
export const SECTIONS = ["sec-hero", "sec-services", "sec-work", "sec-method", "sec-exp", "sec-interviews", "sec-contact"];

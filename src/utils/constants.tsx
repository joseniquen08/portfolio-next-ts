import {
  AxiosIcon,
  BootstrapIcon,
  ChakrauiIcon,
  CodeigniterIcon,
  Css3Icon,
  ExpressIcon,
  FirebaseIcon,
  FlutterIcon,
  GitIcon,
  GraphqlIcon,
  HerokuIcon,
  Html5Icon,
  JavaIcon,
  JavascriptIcon,
  JqueryIcon,
  JsonwebtokensIcon,
  MongodbIcon,
  MuiIcon,
  MysqlIcon,
  NextdotjsIcon,
  NodedotjsIcon,
  PhpIcon,
  PostgresqlIcon,
  PythonIcon,
  ReactIcon,
  ReduxIcon,
  SassIcon,
  SpringbootIcon,
  SupabaseIcon,
  TailwindcssIcon,
  TypescriptIcon,
  PSeIntIcon,
} from "@/icons";
import type { ProjectType, SkillType, TechnologyType } from "@/types";

const size = 36;

export const skills: SkillType[] = [
  {
    name: "JavaScript",
    icon: <JavascriptIcon size={size} color="#F7DF1E" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "TypeScript",
    icon: <TypescriptIcon size={size} color="#3178C6" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "HTML5",
    icon: <Html5Icon size={size} color="#E34F26" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "CSS3",
    icon: <Css3Icon size={size} color="#1572B6" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "React",
    icon: <ReactIcon size={size} color="#61DAFB" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Next.js",
    icon: <NextdotjsIcon size={size} className="text-black dark:text-white" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "Tailwind CSS",
    icon: <TailwindcssIcon size={size} color="#06B6D4" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Chakra UI",
    icon: <ChakrauiIcon size={size} color="#319795" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "Node.js",
    icon: <NodedotjsIcon size={size} color="#339933" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "Java",
    icon: <JavaIcon size={size} color="#F44336" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Express",
    icon: <ExpressIcon size={size} className="text-black dark:text-white" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "Spring Boot",
    icon: <SpringbootIcon size={size} color="#6DB33F" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "MySQL",
    icon: <MysqlIcon size={size} color="#4479A1" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Firebase",
    icon: <FirebaseIcon size={size} color="#FFCA28" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Supabase",
    icon: <SupabaseIcon size={size} color="#3FCF8E" />,
    experience: {
      en: "+6 months",
      es: "+6 meses",
    },
  },
  {
    name: "GraphQL",
    icon: <GraphqlIcon size={size} color="#E10098" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "Git",
    icon: <GitIcon size={size} color="#F05032" />,
    experience: {
      en: "+3 years",
      es: "+3 años",
    },
  },
  {
    name: "PHP",
    icon: <PhpIcon size={size} color="#777BB4" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "CodeIgniter",
    icon: <CodeigniterIcon size={size} color="#EF4223" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Sass",
    icon: <SassIcon size={size} color="#CC6699" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Material UI",
    icon: <MuiIcon size={size} color="#007FFF" />,
    experience: {
      en: "+6 months",
      es: "+6 meses",
    },
  },
  {
    name: "Redux",
    icon: <ReduxIcon size={size} color="#764ABC" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "Axios",
    icon: <AxiosIcon size={size} color="#5A29E4" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "jQuery",
    icon: <JqueryIcon size={size} color="#0769AD" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "Python",
    icon: <PythonIcon size={size} color="#3776AB" />,
    experience: {
      en: "+2 years",
      es: "+2 años",
    },
  },
  {
    name: "PostgreSQL",
    icon: <PostgresqlIcon size={size} color="#4169E1" />,
    experience: {
      en: "+1 year",
      es: "+1 año",
    },
  },
  {
    name: "Flutter",
    icon: <FlutterIcon size={size} color="#02569B" />,
    experience: {
      en: "+6 months",
      es: "+6 meses",
    },
  },
];

const projectSize = 30;

export const workProjects: ProjectType[] = [
  {
    badges: [
      {
        name: "Tech Lead",
        color: "pink",
      },
    ],
    title: "Dale Delivery (Landing)",
    slug: "dale-delivery",
    description: {
      en: "Informative website about the services provided by the delivery company.",
      es: "Sitio web informativo sobre los servicios brindados por la empresa de delivery.",
    },
    github: "",
    web: "https://www.daledelivery.pe/",
    images: ["/images/dale_delivery_template.png"],
    icons: [
      {
        name: "TypeScript",
        icon: <TypescriptIcon size={projectSize} color="#3178C6" />,
      },
      {
        name: "Next.js",
        icon: (
          <NextdotjsIcon
            size={projectSize}
            className="text-black dark:text-white"
          />
        ),
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindcssIcon size={projectSize} color="#06B6D4" />,
      },
    ],
  },
  {
    badges: [
      {
        name: "Frontend Developer",
        color: "pink",
      },
    ],
    title: "Pro Indie Music (Portal)",
    slug: "pro-indie-music",
    description: {
      en: "Web portal for control and monitoring of artists and representatives in the music industry.",
      es: "Portal web de control y seguimiento de artistas y representantes en la industria de la música.",
    },
    github: "",
    web: "https://portal.proindiemusic.com/",
    images: ["/images/proindiemusic_template.png"],
    icons: [
      {
        name: "JavaScript",
        icon: <JavascriptIcon size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "Next.js",
        icon: (
          <NextdotjsIcon
            size={projectSize}
            className="text-black dark:text-white"
          />
        ),
      },
      {
        name: "Material UI",
        icon: <MuiIcon size={projectSize} color="#007FFF" />,
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindcssIcon size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Axios",
        icon: <AxiosIcon size={projectSize} color="#5A29E4" />,
      },
    ],
  },
  {
    badges: [
      {
        name: "FullStack Developer",
        color: "pink",
      },
    ],
    title: "Bienvenidad de Cachimbos - UPC 2023 (Landing)",
    slug: "cachimbos-2023",
    description: {
      en: "Transmission and real-time chat website to welcome UPC 2023-2 entrants.",
      es: "Sitio web de transmisión y chat en tiempo real para la bienvenida de cachimbos de la UPC 2023-2.",
    },
    github: "",
    web: "https://upc-cachimbos-2023.com/",
    images: ["/images/cachimbos_upc_2023_template.png"],
    icons: [
      {
        name: "HTML5",
        icon: <Html5Icon size={projectSize} color="#E34F26" />,
      },
      {
        name: "Node.js",
        icon: <NodedotjsIcon size={projectSize} color="#339933" />,
      },
      {
        name: "Express",
        icon: (
          <ExpressIcon
            size={projectSize}
            className="text-black dark:text-white"
          />
        ),
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindcssIcon size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Firebase",
        icon: <FirebaseIcon size={projectSize} color="#FFCA28" />,
      },
      {
        name: "Heroku",
        icon: <HerokuIcon size={projectSize} color="#430098" />,
      },
    ],
  },
  {
    badges: [
      {
        name: "FullStack Developer",
        color: "pink",
      },
    ],
    title: "Hampi Corp",
    slug: "hampi-corp",
    description: {
      en: "Module control system for hospitals and clinics.",
      es: "Sistema de control de módulos para hospitales y clínicas.",
    },
    github: "",
    web: "https://hampicorp.com/",
    images: ["/images/hampicorp_template.png"],
    icons: [
      {
        name: "PHP",
        icon: <PhpIcon size={projectSize} color="#777BB4" />,
      },
      {
        name: "CodeIgniter",
        icon: <CodeigniterIcon size={projectSize} color="#EF4223" />,
      },
      {
        name: "jQuery",
        icon: <JqueryIcon size={projectSize} color="#0769AD" />,
      },
      {
        name: "Bootstrap",
        icon: <BootstrapIcon size={projectSize} color="#7952B3" />,
      },
      {
        name: "MySQL",
        icon: <MysqlIcon size={projectSize} color="#4479A1" />,
      },
    ],
  },
];

export const personalProjects: ProjectType[] = [
  {
    badges: [
      {
        name: "FullStack",
        color: "pink",
      },
    ],
    title: "Vocacción",
    slug: "vocaccion-fullstack",
    description: {
      en: "Website that provides information about careers and universities in Peru.",
      es: "Sitio web que brinda información sobre carreras y universidades del Perú.",
    },
    github: "https://github.com/joseniquen08/vocaccion",
    web: "https://vocaccion.vercel.app/",
    images: ["/images/vocaccion_template.png"],
    icons: [
      {
        name: "TypeScript",
        icon: <TypescriptIcon size={projectSize} color="#3178C6" />,
      },
      {
        name: "Next.js",
        icon: (
          <NextdotjsIcon
            size={projectSize}
            className="text-black dark:text-white"
          />
        ),
      },
      {
        name: "Node.js",
        icon: <NodedotjsIcon size={projectSize} color="#339933" />,
      },
      {
        name: "Express",
        icon: (
          <ExpressIcon
            size={projectSize}
            className="text-black dark:text-white"
          />
        ),
      },
      {
        name: "Chakra UI",
        icon: <ChakrauiIcon size={projectSize} color="#319795" />,
      },
      {
        name: "MongoDB",
        icon: <MongodbIcon size={projectSize} color="#47A248" />,
      },
      {
        name: "GraphQL",
        icon: <GraphqlIcon size={projectSize} color="#E10098" />,
      },
      {
        name: "JWT",
        icon: (
          <JsonwebtokensIcon
            size={projectSize}
            className="text-black dark:text-white"
          />
        ),
      },
    ],
  },
  {
    badges: [
      {
        name: "FullStack",
        color: "pink",
      },
    ],
    title: "Licius (Social Network)",
    slug: "licius-fullstack",
    description: {
      en: "Social network for the gastronomic industry, in which you can discover dishes and restaurants, connect with users, rate and recommend.",
      es: "Red social del rubro gastronómico, en el cual puedes descubrir platos y restaurantes, conectar con usuarios, puntuar y recomendar.",
    },
    github: "https://github.com/joseniquen08/licius-react",
    web: "https://licius-react.vercel.app/",
    images: ["/images/licius_template.png"],
    icons: [
      {
        name: "JavaScript",
        icon: <JavascriptIcon size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Node.js",
        icon: <NodedotjsIcon size={projectSize} color="#339933" />,
      },
      {
        name: "Express",
        icon: (
          <ExpressIcon
            size={projectSize}
            className="text-black dark:text-white"
          />
        ),
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindcssIcon size={projectSize} color="#06B6D4" />,
      },
      {
        name: "MongoDB",
        icon: <MongodbIcon size={projectSize} color="#47A248" />,
      },
      {
        name: "Redux",
        icon: <ReduxIcon size={projectSize} color="#764ABC" />,
      },
      {
        name: "Axios",
        icon: <AxiosIcon size={projectSize} color="#5A29E4" />,
      },
    ],
  },
  {
    badges: [
      {
        name: "Frontend",
        color: "pink",
      },
    ],
    title: "Music Player (Deezer API)",
    slug: "music-player-react",
    description: {
      en: "Music search and playback website offered by the Deezer API.",
      es: "Sitio web de búsqueda y reproducción de música ofrecida por la API de Deezer.",
    },
    github: "https://github.com/joseniquen08/music-player-react",
    web: "https://music-player-react-nine.vercel.app/",
    images: ["/images/music_player_template.png"],
    icons: [
      {
        name: "JavaScript",
        icon: <JavascriptIcon size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Chakra UI",
        icon: <ChakrauiIcon size={projectSize} color="#319795" />,
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindcssIcon size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Axios",
        icon: <AxiosIcon size={projectSize} color="#5A29E4" />,
      },
    ],
  },
  {
    badges: [
      {
        name: "Frontend",
        color: "pink",
      },
    ],
    title: "Portfolio (1° version)",
    slug: "portfolio-react",
    description: {
      en: "First version of my personal page.",
      es: "Primera versión de mi página personal.",
    },
    github: "https://github.com/joseniquen08/portfolio-react",
    web: "https://portfolio-react-red.vercel.app/",
    images: ["/images/portfolio_template.png"],
    icons: [
      {
        name: "JavaScript",
        icon: <JavascriptIcon size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindcssIcon size={projectSize} color="#06B6D4" />,
      },
    ],
  },
  {
    badges: [
      {
        name: "Frontend",
        color: "pink",
      },
    ],
    title: "BootcamPe (E-commerce)",
    slug: "bootcampe",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "https://github.com/joseniquen08/bootcampe_niquen",
    web: "https://react-coder-988f2.web.app/",
    images: ["/images/bootcampe_template.png"],
    icons: [
      {
        name: "JavaScript",
        icon: <JavascriptIcon size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <ReactIcon size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindcssIcon size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Firebase",
        icon: <FirebaseIcon size={projectSize} color="#FFCA28" />,
      },
    ],
  },
];

const technologySize = 170;
const technologyColor = "rgb(251 253 232 / 0.1)";

export const technologies: TechnologyType[] = [
  {
    slug: "javascript",
    name: "JavaScript",
    icon: (
      <JavascriptIcon size={technologySize} color="rgba(247, 223, 30, 0.1)" />
    ),
    description:
      "JavaScript es la piedra angular del desarrollo web moderno. Es un lenguaje versátil que nos permite crear experiencias web interactivas y dinámicas tanto en el frontend como en el backend. Aprender JavaScript te abrirá las puertas a un mundo de posibilidades en el desarrollo web, permitiéndote crear desde simples páginas interactivas hasta aplicaciones web complejas.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a la Programación con JavaScript",
            content: [
              "Aprender qué es JavaScript y su importancia en el desarrollo web.",
              "Comprender los conceptos básicos de la programación: variables, tipos de datos, operadores.",
              "Realizar ejercicios simples para practicar la sintaxis básica de JavaScript.",
            ],
          },
          {
            level: 2,
            title: "Estructuras de Control",
            content: [
              "Estudiar las estructuras de control condicionales: if, else, else if.",
              "Aprender a utilizar bucles como for y while para realizar tareas repetitivas.",
              "Practicar con ejercicios que involucren el uso de estructuras de control.",
            ],
          },
          {
            level: 3,
            title: "Funciones y Ámbito de las Variables",
            content: [
              "Entender qué son las funciones y cómo se declaran en JavaScript.",
              "Aprender sobre los parámetros y el retorno de las funciones.",
              "Comprender el ámbito de las variables y el concepto de variables locales y globales.",
              "Practicar con la creación de funciones simples y su invocación.",
            ],
          },
          {
            level: 4,
            title: "Arrays y Objetos",
            content: [
              "Familiarizarse con la manipulación de arrays en JavaScript: creación, acceso a elementos, iteración.",
              "Estudiar la sintaxis de los objetos en JavaScript y cómo acceder a sus propiedades.",
              "Practicar con ejercicios que involucren la manipulación de arrays y objetos.",
            ],
          },
          {
            level: 5,
            title: "Manipulación del DOM",
            content: [
              "Aprender a seleccionar elementos del DOM utilizando métodos como getElementById, getElementsByClassName, etc.",
              "Entender cómo manipular los atributos y el contenido de los elementos del DOM.",
              "Practicar con la manipulación dinámica del DOM mediante la creación, eliminación y modificación de elementos.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Funciones Avanzadas",
            content: [
              "Estudiar conceptos como funciones de orden superior, callbacks y closures.",
              "Aprender a utilizar funciones de orden superior como map, filter, reduce.",
              "Practicar con ejercicios que impliquen el uso de funciones avanzadas.",
            ],
          },
          {
            level: 2,
            title: "Trabajo con Arrays y Objetos",
            content: [
              "Profundizar en el trabajo con arrays utilizando métodos avanzados como forEach, map, filter, reduce.",
              "Estudiar métodos para la manipulación de objetos como Object.keys, Object.values, Object.entries.",
              "Practicar con la resolución de problemas que requieran el uso avanzado de arrays y objetos.",
            ],
          },
          {
            level: 3,
            title: "Programación Asincrónica",
            content: [
              "Entender los conceptos básicos de la programación asincrónica en JavaScript.",
              "Aprender a trabajar con Promesas y manejar errores utilizando catch y finally.",
              "Familiarizarse con async/await y cómo simplifica el manejo de código asincrónico.",
              "Practicar con ejercicios que involucren la programación asincrónica.",
            ],
          },
          {
            level: 4,
            title: "Conceptos Avanzados del DOM",
            content: [
              "Estudiar eventos avanzados del DOM como event bubbling, event delegation.",
              "Aprender a trabajar con eventos de usuario como el movimiento del ratón y el teclado.",
              "Entender la importancia del rendimiento y la optimización en la manipulación del DOM.",
              "Practicar con la creación de aplicaciones interactivas y dinámicas utilizando eventos avanzados del DOM.",
            ],
          },
          {
            level: 5,
            title: "Frameworks y Bibliotecas",
            content: [
              "Introducción a frameworks como React, Angular o Vue.js y cómo simplifican el desarrollo web.",
              "Aprender los conceptos básicos de un framework elegido y cómo utilizarlo para construir aplicaciones web.",
              "Practicar con la creación de proyectos utilizando un framework y aplicar los conocimientos adquiridos sobre JavaScript en un entorno de trabajo real.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "typescript",
    name: "TypeScript",
    icon: (
      <TypescriptIcon size={technologySize} color="rgba(49, 120, 198, 0.2)" />
    ),
    description:
      "TypeScript es como una versión mejorada de JavaScript. Agrega la capacidad de tipado estático, lo que significa que puedes detectar errores en tu código antes de ejecutarlo, lo que mejora enormemente la calidad y la robustez de tus aplicaciones. Aprender TypeScript te hará un desarrollador más eficiente y te preparará para proyectos de mayor envergadura.",
    roadmap: [],
  },
  {
    slug: "java",
    name: "Java",
    icon: <JavaIcon size={technologySize} color="rgba(244, 67, 54, 0.2)" />,
    description:
      "Java es un lenguaje de programación sólido y confiable, especialmente popular en el desarrollo de aplicaciones empresariales y móviles. Su portabilidad y seguridad lo hacen ideal para proyectos a gran escala. Aprender Java te proporcionará una base sólida en programación orientada a objetos y te abrirá las puertas a un amplio espectro de oportunidades laborales.",
    roadmap: [],
  },
  // {
  //   slug: "javascript",
  //   name: "PHP",
  //   icon: <PhpIcon size={technologySize} color="rgba(119, 123, 180, 0.2)" />,
  // },
  {
    slug: "pseint",
    name: "PSeInt",
    icon: <PSeIntIcon size={technologySize} color="rgba(255, 254, 197, 0.2)" />,
    description:
      "PSeInt es una herramienta excelente para aquellos que están dando sus primeros pasos en el mundo de la programación. Está diseñado para enseñar los fundamentos de la lógica de programación y el diseño de algoritmos de una manera clara y accesible. Aprender con PSeInt te ayudará a construir una base sólida antes de aventurarte en lenguajes de programación más complejos.",
    roadmap: [],
  },
  {
    slug: "html-css",
    name: "HTML/CSS",
    icon: <Html5Icon size={technologySize} color="rgba(227, 79, 38, 0.2)" />,
    description:
      "HTML y CSS son los lenguajes fundamentales del desarrollo web. HTML se encarga de la estructura y el contenido de una página web, mientras que CSS se encarga del diseño y la presentación. Aprender HTML y CSS te permitirá crear sitios web desde cero y diseñarlos de manera profesional, preparándote para aprender frameworks y librerías más avanzadas en el futuro.",
    roadmap: [],
  },
  {
    slug: "python",
    name: "Python",
    icon: <PythonIcon size={technologySize} color="rgba(55, 118, 171, 0.2)" />,
    description:
      "Python es un lenguaje de programación versátil y fácil de aprender que se utiliza en una amplia gama de aplicaciones, desde desarrollo web y científico hasta inteligencia artificial y aprendizaje automático. Su sintaxis limpia y legible lo hace ideal tanto para principiantes como para desarrolladores experimentados. Aprender Python te abrirá las puertas a un mundo de posibilidades en la programación, permitiéndote crear desde simples scripts hasta aplicaciones complejas. Además, su popularidad en la industria y su creciente demanda lo convierten en una habilidad valiosa para cualquier desarrollador.",
    roadmap: [],
  },
  {
    slug: "react",
    name: "React",
    icon: <ReactIcon size={technologySize} color="rgba(97, 218, 251, 0.2)" />,
    description:
      "React es una biblioteca de JavaScript que revolucionó la forma en que construimos interfaces de usuario en la web. Su enfoque en la creación de componentes reutilizables y su paradigma de programación declarativa lo hacen ideal para el desarrollo de aplicaciones web modernas y escalables. Aprender React te abrirá las puertas a un mundo de oportunidades en el desarrollo frontend.",
    roadmap: [],
  },
  {
    slug: "nextjs",
    name: "Next.js",
    icon: (
      <NextdotjsIcon size={technologySize} color="rgba(128, 128, 128, 0.2)" />
    ),
    description:
      "Next.js es un framework de React que lleva el desarrollo web al siguiente nivel. Con características como la generación de páginas estáticas y dinámicas, el enrutamiento integrado y la escalabilidad, Next.js es ideal para construir aplicaciones web rápidas y eficientes. Aprender Next.js te permitirá crear aplicaciones web de alta calidad con una mejor experiencia de usuario y mayores oportunidades laborales.",
    roadmap: [],
  },
];

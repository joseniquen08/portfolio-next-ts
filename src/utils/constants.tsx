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
import type {
  PriceType,
  ProjectType,
  SkillType,
  TechnologyType,
} from "@/types";

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

export const technologies: TechnologyType[] = [
  {
    status: 2,
    slug: "pseint",
    name: "PSeInt",
    icon: <PSeIntIcon size={technologySize} color="rgba(255, 239, 68, 0.2)" />,
    description:
      "PSeInt es una herramienta excelente para aquellos que están dando sus primeros pasos en el mundo de la programación. Está diseñado para enseñar los fundamentos de la lógica de programación y el diseño de algoritmos de una manera clara y accesible. Aprender con PSeInt te ayudará a construir una base sólida antes de aventurarte en lenguajes de programación más complejos.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a la Lógica de Programación",
            content: [
              "Comprender los conceptos básicos de la lógica de programación y su importancia en el desarrollo de algoritmos.",
              "Aprender a utilizar pseudocódigo como una herramienta para expresar algoritmos de manera clara y concisa.",
              "Familiarizarse con la estructura básica de un algoritmo en PSeInt y cómo se relaciona con la solución de problemas.",
            ],
          },
          {
            level: 2,
            title: "Estructuras de Control",
            content: [
              "Estudiar las estructuras de control secuenciales, condicionales y repetitivas en PSeInt.",
              "Aprender a utilizar estructuras de control para controlar el flujo de ejecución de un programa.",
              "Practicar con ejercicios que involucren el uso de estructuras de control para resolver problemas simples.",
            ],
          },
          {
            level: 3,
            title: "Tipos de Datos y Variables",
            content: [
              "Entender los diferentes tipos de datos disponibles en PSeInt y cómo se utilizan para almacenar información.",
              "Aprender a declarar variables y asignarles valores en PSeInt.",
              "Practicar con ejercicios que involucren el uso de tipos de datos y variables en PSeInt.",
            ],
          },
          {
            level: 4,
            title: "Entrada/Salida Básica",
            content: [
              "Aprender a realizar operaciones de entrada/salida básicas en PSeInt, como la lectura de datos desde el teclado y la escritura en la pantalla.",
              "Estudiar cómo utilizar las funciones Leer y Escribir para interactuar con el usuario.",
              "Practicar con ejercicios que involucren operaciones de entrada/salida básicas en PSeInt.",
            ],
          },
          {
            level: 5,
            title: "Subalgoritmos y Modularidad",
            content: [
              "Estudiar el concepto de subalgoritmos y cómo se utilizan para dividir un problema grande en problemas más pequeños y manejables.",
              "Aprender a crear y utilizar subalgoritmos en PSeInt.",
              "Practicar con ejercicios que involucren el uso de subalgoritmos para resolver problemas complejos.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Arreglos y Matrices",
            content: [
              "Entender cómo se definen y utilizan los arreglos y matrices en PSeInt.",
              "Aprender a acceder a elementos individuales de un arreglo o matriz y a modificar su contenido.",
              "Practicar con ejercicios que involucren el uso de arreglos y matrices para almacenar y manipular datos.",
            ],
          },
          {
            level: 2,
            title: "Recursión",
            content: [
              "Estudiar el concepto de recursión y cómo se utiliza para resolver problemas que se pueden descomponer en casos más simples.",
              "Aprender a implementar funciones recursivas en PSeInt.",
              "Practicar con ejercicios que involucren la implementación de algoritmos recursivos en PSeInt.",
            ],
          },
          {
            level: 3,
            title: "Algoritmos de Búsqueda y Ordenamiento",
            content: [
              "Entender los diferentes algoritmos de búsqueda y ordenamiento disponibles en PSeInt, como búsqueda binaria, ordenamiento por inserción, etc.",
              "Aprender a implementar algoritmos de búsqueda y ordenamiento en PSeInt.",
              "Practicar con ejercicios que involucren la implementación de algoritmos de búsqueda y ordenamiento en PSeInt.",
            ],
          },
          {
            level: 4,
            title: "Estructuras de Datos Avanzadas",
            content: [
              "Estudiar estructuras de datos más avanzadas, como listas enlazadas, pilas y colas.",
              "Aprender a implementar estas estructuras de datos en PSeInt y a utilizarlas para resolver problemas específicos.",
              "Practicar con ejercicios que involucren el uso de estructuras de datos avanzadas en PSeInt.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Prácticos",
            content: [
              "Aplicar los conocimientos adquiridos en PSeInt para desarrollar proyectos prácticos y resolver problemas del mundo real.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Refactorizar y mejorar proyectos existentes para aplicar las mejores prácticas de programación.",
            ],
          },
        ],
      },
    ],
  },
  {
    status: 2,
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
    status: 2,
    slug: "typescript",
    name: "TypeScript",
    icon: (
      <TypescriptIcon size={technologySize} color="rgba(49, 120, 198, 0.2)" />
    ),
    description:
      "TypeScript es como una versión mejorada de JavaScript. Agrega la capacidad de tipado estático, lo que significa que puedes detectar errores en tu código antes de ejecutarlo, lo que mejora enormemente la calidad y la robustez de tus aplicaciones. Aprender TypeScript te hará un desarrollador más eficiente y te preparará para proyectos de mayor envergadura.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a TypeScript",
            content: [
              "Comprender qué es TypeScript y cómo se relaciona con JavaScript.",
              "Aprender a configurar un entorno de desarrollo TypeScript.",
              "Familiarizarse con la sintaxis básica de TypeScript y las diferencias clave con JavaScript.",
            ],
          },
          {
            level: 2,
            title: "Tipos de Datos y Variables",
            content: [
              "Estudiar los tipos de datos básicos en TypeScript: number, string, boolean, etc.",
              "Aprender a declarar variables y especificar tipos de datos en TypeScript.",
              "Practicar con ejemplos simples para entender el concepto de tipado estático en TypeScript.",
            ],
          },
          {
            level: 3,
            title: "Funciones y Tipado de Parámetros/Retornos",
            content: [
              "Entender cómo se definen las funciones en TypeScript y cómo se especifican los tipos de parámetros y retorno.",
              "Estudiar los tipos de funciones, incluyendo funciones anónimas y funciones de flecha.",
              "Practicar con la creación de funciones simples y la especificación de tipos de parámetros y retorno.",
            ],
          },
          {
            level: 4,
            title: "Estructuras de Control y Tipos Avanzados",
            content: [
              "Aprender a utilizar las estructuras de control como if, else, switch, for, while en TypeScript.",
              "Estudiar los tipos de datos avanzados en TypeScript, como las tuplas y los tipos de unión.",
              "Practicar con ejercicios que involucren el uso de estructuras de control y tipos avanzados.",
            ],
          },
          {
            level: 5,
            title: "Interfaces y Tipos de Unión:",
            content: [
              "Entender el concepto de interfaz en TypeScript y cómo se utiliza para definir la forma de un objeto.",
              "Aprender sobre los tipos de unión y cómo se utilizan para combinar múltiples tipos en uno solo.",
              "Practicar con la creación de interfaces y el uso de tipos de unión en situaciones prácticas.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Uso Avanzado de Tipos",
            content: [
              "Estudiar los tipos genéricos en TypeScript y cómo se utilizan para crear funciones y clases reutilizables.",
              "Aprender sobre los tipos condicionales y cómo se utilizan para realizar comprobaciones de tipos en tiempo de compilación.",
              "Practicar con ejemplos que demuestren el uso avanzado de tipos en TypeScript.",
            ],
          },
          {
            level: 2,
            title: "Decoradores y Mixins",
            content: [
              "Entender qué son los decoradores en TypeScript y cómo se utilizan para agregar metadatos a clases, métodos y propiedades.",
              "Aprender sobre los mixins y cómo se utilizan para reutilizar comportamientos en clases.",
              "Practicar con la creación y el uso de decoradores y mixins en proyectos prácticos.",
            ],
          },
          {
            level: 3,
            title: "Tipos Avanzados de Funciones",
            content: [
              "Estudiar los tipos avanzados de funciones en TypeScript, como las sobrecargas de funciones y las funciones genéricas.",
              "Aprender sobre los contextos de this y cómo se manejan en TypeScript.",
              "Practicar con ejemplos que demuestren el uso avanzado de funciones en TypeScript.",
            ],
          },
          {
            level: 4,
            title: "Manejo de Errores y Excepciones",
            content: [
              "Aprender a manejar errores y excepciones en TypeScript utilizando try-catch y throw.",
              "Estudiar cómo se utilizan los tipos de datos nunca y desconocido para manejar casos de error.",
              "Practicar con ejemplos que involucren el manejo de errores y excepciones en TypeScript.",
            ],
          },
          {
            level: 5,
            title: "Integración con Frameworks y Bibliotecas:",
            content: [
              "Introducción a la integración de TypeScript con frameworks y bibliotecas populares como React, Angular o Vue.js.",
              "Aprender a configurar un proyecto con TypeScript y un framework específico.",
              "Practicar con la creación de proyectos utilizando TypeScript y un framework elegido, y aplicar los conocimientos adquiridos en un entorno de trabajo real.",
            ],
          },
        ],
      },
    ],
  },
  {
    status: 2,
    slug: "html-css",
    name: "HTML/CSS",
    icon: <Html5Icon size={technologySize} color="rgba(227, 79, 38, 0.2)" />,
    description:
      "HTML y CSS son los lenguajes fundamentales del desarrollo web. HTML se encarga de la estructura y el contenido de una página web, mientras que CSS se encarga del diseño y la presentación. Aprender HTML y CSS te permitirá crear sitios web desde cero y diseñarlos de manera profesional, preparándote para aprender frameworks y librerías más avanzadas en el futuro.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a HTML",
            content: [
              "Comprender los conceptos básicos de HTML y su importancia en la creación de páginas web.",
              "Aprender la estructura básica de un documento HTML: elementos, etiquetas y atributos.",
              "Familiarizarse con las etiquetas HTML fundamentales como <html>, <head>, <body>, <div>, <p>, etc.",
            ],
          },
          {
            level: 2,
            title: "Introducción a CSS",
            content: [
              "Entender qué es CSS y su función en el diseño y estilo de páginas web.",
              "Aprender a aplicar estilos a elementos HTML utilizando selectores de CSS.",
              "Practicar con la aplicación de estilos básicos como colores, fuentes, márgenes y rellenos.",
            ],
          },
          {
            level: 3,
            title: "Diseño de Layout Básico",
            content: [
              "Estudiar cómo crear diseños básicos utilizando CSS: diseño de cajas, posicionamiento, float.",
              "Aprender a utilizar la propiedad display para controlar el flujo de elementos en un diseño.",
              "Practicar con la creación de diseños simples utilizando técnicas de posicionamiento y flotado.",
            ],
          },
          {
            level: 4,
            title: "Introducción a Flexbox y Grid",
            content: [
              "Comprender los conceptos básicos de Flexbox y Grid y cómo se utilizan para crear diseños más flexibles y complejos.",
              "Aprender a utilizar las propiedades de Flexbox y Grid para controlar la distribución y el alineamiento de elementos en un diseño.",
              "Practicar con la creación de diseños más avanzados utilizando Flexbox y Grid.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Prácticos",
            content: [
              "Aplicar los conocimientos adquiridos en HTML y CSS para desarrollar proyectos prácticos y crear sitios web completos.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Refactorizar y mejorar proyectos existentes para aplicar las mejores prácticas de diseño web.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Responsive Design",
            content: [
              "Estudiar cómo crear diseños responsivos que se adapten a diferentes dispositivos y tamaños de pantalla.",
              "Aprender a utilizar media queries para aplicar estilos específicos según las características del dispositivo.",
              "Practicar con la creación de diseños responsivos utilizando técnicas de diseño líquido y adaptable.",
            ],
          },
          {
            level: 2,
            title: "Estilización Avanzada",
            content: [
              "Entender cómo aplicar estilos avanzados utilizando pseudoclases y pseudoelementos.",
              "Aprender a utilizar animaciones y transiciones CSS para crear efectos visuales interactivos.",
              "Practicar con la aplicación de estilos avanzados para mejorar la apariencia y la experiencia de usuario.",
            ],
          },
          {
            level: 3,
            title: "Metodologías de Diseño CSS",
            content: [
              "Estudiar metodologías de diseño CSS como BEM (Block Element Modifier) o SMACSS (Scalable and Modular Architecture for CSS).",
              "Aprender cómo estructurar y organizar el código CSS de manera más eficiente y mantenible.",
              "Practicar con la implementación de una metodología de diseño CSS en proyectos reales.",
            ],
          },
          {
            level: 4,
            title: "Preprocesadores CSS",
            content: [
              "Comprender qué son los preprocesadores CSS como Sass o Less y cómo se utilizan para mejorar la eficiencia del desarrollo.",
              "Aprender a utilizar características avanzadas de preprocesadores CSS como variables, mixins y funciones.",
              "Practicar con la implementación de preprocesadores CSS en proyectos web para optimizar el flujo de trabajo.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Avanzados",
            content: [
              "Aplicar los conocimientos adquiridos en HTML y CSS para desarrollar proyectos web más complejos y sofisticados.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Experimentar con nuevas tecnologías y técnicas de diseño web para crear experiencias de usuario innovadoras.",
            ],
          },
        ],
      },
    ],
  },
  {
    status: 2,
    slug: "react",
    name: "React",
    icon: <ReactIcon size={technologySize} color="rgba(97, 218, 251, 0.2)" />,
    description:
      "React es una biblioteca de JavaScript que revolucionó la forma en que construimos interfaces de usuario en la web. Su enfoque en la creación de componentes reutilizables y su paradigma de programación declarativa lo hacen ideal para el desarrollo de aplicaciones web modernas y escalables. Aprender React te abrirá las puertas a un mundo de oportunidades en el desarrollo frontend.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a React",
            content: [
              "Comprender los fundamentos de React y su importancia en el desarrollo web moderno.",
              "Aprender la sintaxis básica de JSX y cómo se utiliza para definir componentes en React.",
              "Familiarizarse con el flujo de datos unidireccional y el concepto de estado en React.",
            ],
          },
          {
            level: 2,
            title: "Componentes y Props",
            content: [
              "Estudiar cómo crear componentes en React y utilizar props para pasar datos entre componentes.",
              "Aprender a organizar la aplicación en una jerarquía de componentes.",
              "Practicar con la creación y composición de componentes en React.",
            ],
          },
          {
            level: 3,
            title: "Estado y Ciclo de Vida",
            content: [
              "Entender el concepto de estado en React y cómo se utiliza para manejar datos dinámicos.",
              "Estudiar el ciclo de vida de los componentes y los métodos del ciclo de vida en React.",
              "Aprender a actualizar el estado de un componente y a manejar eventos en React.",
            ],
          },
          {
            level: 4,
            title: "Manejo de Formularios",
            content: [
              "Aprender a trabajar con formularios en React utilizando componentes controlados y no controlados.",
              "Estudiar cómo validar datos de entrada y manejar eventos de formulario en React.",
              "Practicar con la creación y validación de formularios en React.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Prácticos",
            content: [
              "Aplicar los conocimientos adquiridos en React para desarrollar proyectos prácticos y crear aplicaciones web completas.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Refactorizar y mejorar proyectos existentes para aplicar las mejores prácticas de desarrollo en React.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Gestión del Estado",
            content: [
              "Estudiar diferentes opciones para gestionar el estado de la aplicación en React, como el uso de useState, useReducer y Context API.",
              "Aprender a estructurar y organizar el estado de la aplicación de manera eficiente.",
              "Practicar con el manejo del estado en aplicaciones React de tamaño medio.",
            ],
          },
          {
            level: 2,
            title: "Enrutamiento",
            content: [
              "Entender cómo implementar enrutamiento en una aplicación React utilizando React Router.",
              "Aprender a definir rutas, navegar entre ellas y manejar parámetros de URL.",
              "Practicar con la implementación de enrutamiento en proyectos web desarrollados con React.",
            ],
          },
          {
            level: 3,
            title: "Peticiones HTTP y APIs",
            content: [
              "Aprender a realizar solicitudes HTTP desde una aplicación React utilizando la API fetch o bibliotecas como Axios.",
              "Estudiar cómo procesar respuestas de API y manejar datos en una aplicación React.",
              "Practicar con la integración de APIs externas en proyectos React para obtener y mostrar datos dinámicos.",
            ],
          },
          {
            level: 4,
            title: "Optimización y Rendimiento",
            content: [
              "Entender técnicas de optimización de rendimiento en aplicaciones React, como el uso de memoización y la eliminación de renderizaciones innecesarias.",
              "Aprender a utilizar herramientas de rendimiento como React DevTools para identificar y solucionar problemas de rendimiento.",
              "Practicar con la optimización del rendimiento en proyectos React de tamaño medio a grande.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Avanzados",
            content: [
              "Aplicar los conocimientos adquiridos en React para desarrollar proyectos web más complejos y sofisticados.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Experimentar con nuevas tecnologías y técnicas de desarrollo web para crear experiencias de usuario innovadoras.",
            ],
          },
        ],
      },
    ],
  },
  {
    status: 2,
    slug: "nextjs",
    name: "Next.js",
    icon: (
      <NextdotjsIcon size={technologySize} color="rgba(128, 128, 128, 0.2)" />
    ),
    description:
      "Next.js es un framework de React que lleva el desarrollo web al siguiente nivel. Con características como la generación de páginas estáticas y dinámicas, el enrutamiento integrado y la escalabilidad, Next.js es ideal para construir aplicaciones web rápidas y eficientes. Aprender Next.js te permitirá crear aplicaciones web de alta calidad con una mejor experiencia de usuario y mayores oportunidades laborales.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a Next.js",
            content: [
              "Comprender los fundamentos de Next.js y su importancia en el desarrollo de aplicaciones web modernas.",
              "Aprender a configurar un proyecto básico de Next.js y ejecutarlo localmente.",
              "Familiarizarse con la estructura de un proyecto Next.js y cómo se relaciona con React.",
            ],
          },
          {
            level: 2,
            title: "Enrutamiento Dinámico",
            content: [
              "Estudiar cómo implementar enrutamiento dinámico en una aplicación Next.js.",
              "Aprender a utilizar rutas dinámicas y parámetros de URL en Next.js.",
              "Practicar con la implementación de enrutamiento dinámico en proyectos Next.js.",
            ],
          },
          {
            level: 3,
            title: "Páginas Estáticas y Dinámicas",
            content: [
              "Entender la diferencia entre páginas estáticas y páginas dinámicas en Next.js.",
              "Aprender a crear páginas estáticas y dinámicas en Next.js.",
              "Estudiar cómo pre-renderizar páginas estáticas y dinámicas para mejorar el rendimiento.",
            ],
          },
          {
            level: 4,
            title: "Obtención de Datos",
            content: [
              "Aprender a obtener datos en una aplicación Next.js utilizando las funciones getStaticProps y getServerSideProps.",
              "Entender cómo manejar solicitudes de API externas y obtener datos para pre-renderizar páginas.",
              "Practicar con la obtención de datos en proyectos Next.js para crear aplicaciones con contenido dinámico.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Prácticos",
            content: [
              "Aplicar los conocimientos adquiridos en Next.js para desarrollar proyectos prácticos y crear aplicaciones web completas.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Refactorizar y mejorar proyectos existentes para aplicar las mejores prácticas de desarrollo en Next.js.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Gestión del Estado",
            content: [
              "Estudiar diferentes opciones para gestionar el estado de la aplicación en Next.js, como el uso de useState y useContext.",
              "Aprender a estructurar y organizar el estado de la aplicación de manera eficiente.",
              "Practicar con el manejo del estado en aplicaciones Next.js de tamaño medio.",
            ],
          },
          {
            level: 2,
            title: "API Routes",
            content: [
              "Entender cómo crear API Routes en Next.js para manejar solicitudes HTTP.",
              "Aprender a definir rutas API y manejar peticiones HTTP como GET, POST, PUT y DELETE.",
              "Practicar con la implementación de API Routes en proyectos Next.js para crear una API RESTful.",
            ],
          },
          {
            level: 3,
            title: "Autenticación y Autorización",
            content: [
              "Aprender a implementar autenticación y autorización en una aplicación Next.js utilizando bibliotecas como NextAuth.js o JWT.",
              "Estudiar cómo proteger rutas y recursos de la aplicación utilizando middleware y controladores de acceso.",
              "Practicar con la implementación de autenticación y autorización en proyectos Next.js para crear aplicaciones seguras.",
            ],
          },
          {
            level: 4,
            title: "Optimización y Rendimiento",
            content: [
              "Entender técnicas de optimización de rendimiento en aplicaciones Next.js, como la implementación de memoización y la optimización del código.",
              "Aprender a utilizar herramientas de rendimiento como Lighthouse para identificar y solucionar problemas de rendimiento.",
              "Practicar con la optimización del rendimiento en proyectos Next.js de tamaño medio a grande.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Avanzados",
            content: [
              "Aplicar los conocimientos adquiridos en Next.js para desarrollar proyectos web más complejos y sofisticados.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Experimentar con nuevas tecnologías y técnicas de desarrollo web para crear experiencias de usuario innovadoras.",
            ],
          },
        ],
      },
    ],
  },
  {
    status: 1,
    slug: "python",
    name: "Python",
    icon: <PythonIcon size={technologySize} color="rgba(55, 118, 171, 0.2)" />,
    description:
      "Python es un lenguaje de programación versátil y fácil de aprender que se utiliza en una amplia gama de aplicaciones, desde desarrollo web y científico hasta inteligencia artificial y aprendizaje automático. Su sintaxis limpia y legible lo hace ideal tanto para principiantes como para desarrolladores experimentados. Aprender Python te abrirá las puertas a un mundo de posibilidades en la programación, permitiéndote crear desde simples scripts hasta aplicaciones complejas. Además, su popularidad en la industria y su creciente demanda lo convierten en una habilidad valiosa para cualquier desarrollador.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a Python",
            content: [
              "Comprender los fundamentos de Python y su importancia en la programación.",
              "Aprender la sintaxis básica de Python: variables, tipos de datos, operadores.",
              "Familiarizarse con la estructura básica de un programa Python y cómo ejecutarlo.",
            ],
          },
          {
            level: 2,
            title: "Estructuras de Control",
            content: [
              "Estudiar las estructuras de control condicionales: if, else, elif.",
              "Aprender a utilizar bucles como for y while para realizar tareas repetitivas.",
              "Practicar con ejercicios que involucren el uso de estructuras de control en Python.",
            ],
          },
          {
            level: 3,
            title: "Funciones y Modularidad",
            content: [
              "Entender qué son las funciones en Python y cómo se definen.",
              "Aprender a crear funciones con parámetros y valores de retorno.",
              "Estudiar la modularidad en Python y cómo dividir un programa en módulos reutilizables.",
            ],
          },
          {
            level: 4,
            title: "Estructuras de Datos Básicas",
            content: [
              "Aprender sobre estructuras de datos básicas como listas, tuplas, conjuntos y diccionarios en Python.",
              "Entender cómo acceder y manipular elementos en estas estructuras de datos.",
              "Practicar con ejercicios que involucren el uso de estructuras de datos en Python.",
            ],
          },
          {
            level: 5,
            title: "Manipulación de Archivos y Entrada/Salida",
            content: [
              "Estudiar cómo abrir, leer y escribir archivos en Python.",
              "Aprender a manejar la entrada y salida de datos desde y hacia archivos.",
              "Practicar con la manipulación de archivos y entrada/salida en Python mediante la resolución de problemas prácticos.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Programación Orientada a Objetos",
            content: [
              "Entender los conceptos fundamentales de la programación orientada a objetos (POO) en Python.",
              "Aprender a definir clases y crear objetos en Python.",
              "Estudiar conceptos avanzados de POO como herencia, encapsulamiento y polimorfismo.",
            ],
          },
          {
            level: 2,
            title: "Gestión de Errores y Excepciones",
            content: [
              "Aprender a manejar errores y excepciones en Python utilizando bloques try-except.",
              "Estudiar cómo levantar excepciones personalizadas para manejar situaciones específicas.",
              "Practicar con ejercicios que involucren el manejo de errores y excepciones en Python.",
            ],
          },
          {
            level: 3,
            title: "Módulos y Paquetes",
            content: [
              "Estudiar cómo organizar y reutilizar código utilizando módulos y paquetes en Python.",
              "Aprender a importar módulos y paquetes en un programa Python.",
              "Practicar con la creación y el uso de módulos y paquetes para modularizar proyectos más grandes.",
            ],
          },
          {
            level: 4,
            title: "Programación Funcional",
            content: [
              "Entender los conceptos de programación funcional en Python y cómo se diferencian de la programación imperativa.",
              "Aprender a utilizar funciones de orden superior, expresiones lambda y funciones generadoras en Python.",
              "Practicar con ejercicios que involucren el uso de programación funcional en Python.",
            ],
          },
          {
            level: 5,
            title: "Proyectos Prácticos",
            content: [
              "Aplicar los conocimientos adquiridos en Python para desarrollar proyectos prácticos y resolver problemas del mundo real.",
              "Trabajar en proyectos individuales y en equipo para aplicar y consolidar los conceptos aprendidos.",
              "Refactorizar y mejorar proyectos existentes para aplicar las mejores prácticas de programación en Python.",
            ],
          },
        ],
      },
    ],
  },
  {
    status: 1,
    slug: "java",
    name: "Java",
    icon: <JavaIcon size={technologySize} color="rgba(244, 67, 54, 0.2)" />,
    description:
      "Java es un lenguaje de programación sólido y confiable, especialmente popular en el desarrollo de aplicaciones empresariales y móviles. Su portabilidad y seguridad lo hacen ideal para proyectos a gran escala. Aprender Java te proporcionará una base sólida en programación orientada a objetos y te abrirá las puertas a un amplio espectro de oportunidades laborales.",
    roadmap: [
      {
        title: "Nivel Principiante",
        items: [
          {
            level: 1,
            title: "Introducción a Java",
            content: [
              "Comprender los conceptos básicos de Java y su importancia en el desarrollo de aplicaciones.",
              "Aprender a configurar un entorno de desarrollo Java.",
              "Familiarizarse con la sintaxis básica de Java y las diferencias clave con otros lenguajes de programación.",
            ],
          },
          {
            level: 2,
            title: "Estructuras de Control",
            content: [
              "Estudiar las estructuras de control como if, else, switch, for, while en Java.",
              "Aprender a utilizar bucles para realizar tareas repetitivas.",
              "Practicar con ejercicios que involucren el uso de estructuras de control.",
            ],
          },
          {
            level: 3,
            title: "Clases y Objetos",
            content: [
              "Entender el concepto de clases y objetos en Java.",
              "Aprender a declarar clases y crear objetos a partir de ellas.",
              "Practicar con la creación y el uso de clases y objetos en Java.",
            ],
          },
          {
            level: 4,
            title: "Herencia y Polimorfismo",
            content: [
              "Estudiar el concepto de herencia y cómo se implementa en Java.",
              "Aprender sobre el polimorfismo y cómo se utiliza para crear código más flexible y reutilizable.",
              "Practicar con ejemplos que involucren el uso de herencia y polimorfismo en Java.",
            ],
          },
          {
            level: 5,
            title: "Entrada/Salida Básica",
            content: [
              "Aprender a realizar operaciones de entrada/salida básicas en Java, como la lectura de datos desde el teclado y la escritura en la consola.",
              "Estudiar cómo leer y escribir archivos en Java utilizando las clases FileReader, FileWriter, etc.",
              "Practicar con ejercicios que involucren operaciones de entrada/salida en Java.",
            ],
          },
        ],
      },
      {
        title: "Nivel Intermedio",
        items: [
          {
            level: 1,
            title: "Colecciones y Genéricos",
            content: [
              "Estudiar las diferentes colecciones disponibles en Java, como ArrayList, LinkedList, HashMap, etc.",
              "Aprender a utilizar genéricos para crear clases y métodos que pueden trabajar con diferentes tipos de datos.",
              "Practicar con ejercicios que involucren el uso de colecciones y genéricos en Java.",
            ],
          },
          {
            level: 2,
            title: "Manejo de Excepciones",
            content: [
              "Entender cómo manejar errores y excepciones en Java utilizando try-catch-finally.",
              "Aprender a crear y lanzar excepciones personalizadas.",
              "Practicar con ejemplos que involucren el manejo de excepciones en Java.",
            ],
          },
          {
            level: 3,
            title: "Programación Orientada a Aspectos (AOP)",
            content: [
              "Estudiar el concepto de AOP y cómo se implementa en Java utilizando frameworks como AspectJ.",
              "Aprender a separar las preocupaciones transversales del código principal utilizando aspectos.",
              "Practicar con ejemplos que involucren el uso de AOP en Java.",
            ],
          },
          {
            level: 4,
            title: "Expresiones Lambda y Streams",
            content: [
              "Entender cómo trabajar con expresiones lambda y streams en Java 8 y versiones posteriores.",
              "Aprender a utilizar las operaciones de filtrado, mapeo, reducción, etc., proporcionadas por la API de streams.",
              "Practicar con ejemplos que involucren el uso de expresiones lambda y streams en Java.",
            ],
          },
          {
            level: 5,
            title: "Bases de Datos y JDBC",
            content: [
              "Estudiar cómo conectarse a una base de datos desde una aplicación Java utilizando JDBC (Java Database Connectivity).",
              "Aprender a ejecutar consultas SQL, insertar y actualizar datos desde una aplicación Java.",
              "Practicar con ejemplos que involucren el acceso a bases de datos desde Java utilizando JDBC.",
            ],
          },
        ],
      },
    ],
  },
];

const base_price = 20;

export const prices: PriceType[] = [
  {
    pack: "Pack x1",
    value: "x1",
    x1: {
      real: base_price * 1 * 1,
      discount: base_price * 1 * 1 * 1 * 1,
    },
    x2: {
      real: base_price * 1 * 2,
      discount: base_price * 1 * 1 * 0.95 * 2,
    },
    x3: {
      real: base_price * 1 * 3,
      discount: base_price * 1 * 1 * 0.9 * 3,
    },
    x4: {
      real: base_price * 1 * 4,
      discount: base_price * 1 * 1 * 0.85 * 4,
    },
    x5: {
      real: base_price * 1 * 5,
      discount: base_price * 1 * 1 * 0.8 * 5,
    },
  },
  {
    pack: "Pack x5",
    value: "x5",
    x1: {
      real: base_price * 5 * 1,
      discount: base_price * 5 * 0.95 * 1 * 1,
    },
    x2: {
      real: base_price * 5 * 2,
      discount: base_price * 5 * 0.9 * 0.95 * 2,
    },
    x3: {
      real: base_price * 5 * 3,
      discount: base_price * 5 * 0.85 * 0.9 * 3,
    },
    x4: {
      real: base_price * 5 * 4,
      discount: base_price * 5 * 0.8 * 0.85 * 4,
    },
    x5: {
      real: base_price * 5 * 5,
      discount: base_price * 5 * 0.75 * 0.8 * 5,
    },
  },
  {
    pack: "Pack x10",
    value: "x10",
    x1: {
      real: base_price * 10 * 1,
      discount: base_price * 10 * 0.9 * 1 * 1,
    },
    x2: {
      real: base_price * 10 * 2,
      discount: base_price * 10 * 0.85 * 0.95 * 2,
    },
    x3: {
      real: base_price * 10 * 3,
      discount: base_price * 10 * 0.8 * 0.9 * 3,
    },
    x4: {
      real: base_price * 10 * 4,
      discount: base_price * 10 * 0.75 * 0.85 * 4,
    },
    x5: {
      real: base_price * 10 * 5,
      discount: base_price * 10 * 0.7 * 0.8 * 5,
    },
  },
  {
    pack: "Pack x15",
    value: "x15",
    x1: {
      real: base_price * 15 * 1,
      discount: base_price * 15 * 0.85 * 1 * 1,
    },
    x2: {
      real: base_price * 15 * 2,
      discount: base_price * 15 * 0.8 * 0.95 * 2,
    },
    x3: {
      real: base_price * 15 * 3,
      discount: base_price * 15 * 0.75 * 0.9 * 3,
    },
    x4: {
      real: base_price * 15 * 4,
      discount: base_price * 15 * 0.7 * 0.85 * 4,
    },
    x5: {
      real: base_price * 15 * 5,
      discount: base_price * 15 * 0.65 * 0.8 * 5,
    },
  },
  {
    pack: "Pack x20",
    value: "x20",
    x1: {
      real: base_price * 20 * 1,
      discount: base_price * 20 * 0.8 * 1 * 1,
    },
    x2: {
      real: base_price * 20 * 2,
      discount: base_price * 20 * 0.75 * 0.95 * 2,
    },
    x3: {
      real: base_price * 20 * 3,
      discount: base_price * 20 * 0.7 * 0.9 * 3,
    },
    x4: {
      real: base_price * 20 * 4,
      discount: base_price * 20 * 0.65 * 0.85 * 4,
    },
    x5: {
      real: base_price * 20 * 5,
      discount: base_price * 20 * 0.6 * 0.8 * 5,
    },
  },
];

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
} from "@/icons";
import PSeIntIcon from "@/icons/Pseint";
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
    name: "JavaScript",
    icon: <JavascriptIcon size={technologySize} color={technologyColor} />,
  },
  {
    name: "TypeScript",
    icon: <TypescriptIcon size={technologySize} color={technologyColor} />,
  },
  {
    name: "Java",
    icon: <JavaIcon size={technologySize} color={technologyColor} />,
  },
  {
    name: "PHP",
    icon: <PhpIcon size={technologySize} color={technologyColor} />,
  },
  {
    name: "PSeint",
    icon: <PSeIntIcon size={technologySize} color={technologyColor} />,
  },
  {
    name: "HTML/CSS",
    icon: <Html5Icon size={technologySize} color={technologyColor} />,
  },
  {
    name: "Python",
    icon: <PythonIcon size={technologySize} color={technologyColor} />,
  },
];

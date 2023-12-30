import type { ProjectType, SkillType } from "@/types";
import { SiAxios, SiBootstrap, SiChakraui, SiCodeigniter, SiCss3, SiExpress, SiFirebase, SiFlutter, SiGit, SiGraphql, SiHeroku, SiHtml5, SiJavascript, SiJquery, SiMongodb, SiMui, SiMysql, SiNextdotjs, SiNodedotjs, SiPhp, SiPostgresql, SiPython, SiReact, SiRedux, SiSass, SiSpringboot, SiSupabase, SiTailwindcss, SiTypescript } from "@icons-pack/react-simple-icons";
import { Java } from "@react-symbols/icons";

const size = 36;

export const skills: SkillType[] = [
  {
    name: "JavaScript",
    icon: <SiJavascript size={size} color="#F7DF1E" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript size={size} color="#3178C6" />,
  },
  {
    name: "HTML5",
    icon: <SiHtml5 size={size} color="#E34F26" />,
  },
  {
    name: "CSS3",
    icon: <SiCss3 size={size} color="#1572B6" />,
  },
  {
    name: "React",
    icon: <SiReact size={size} color="#61DAFB" />,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs size={size} className="text-black dark:text-white" />,
  },
  {
    name: "Sass",
    icon: <SiSass size={size} color="#CC6699" />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss size={size} color="#06B6D4" />,
  },
  {
    name: "Chakra UI",
    icon: <SiChakraui size={size} color="#319795" />,
  },
  {
    name: "Material UI",
    icon: <SiMui size={size} color="#007FFF" />,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs size={size} color="#339933" />,
  },
  {
    name: "PHP",
    icon: <SiPhp size={size} color="#777BB4" />,
  },
  {
    name: "Python",
    icon: <SiPython size={size} color="#3776AB" />,
  },
  {
    name: "Java",
    icon: <Java width={size} height={size} />,
  },
  {
    name: "Express",
    icon: <SiExpress size={size} className="text-black dark:text-white" />,
  },
  {
    name: "CodeIgniter",
    icon: <SiCodeigniter size={size} color="#EF4223" />,
  },
  {
    name: "Spring Boot",
    icon: <SiSpringboot size={size} color="#6DB33F" />,
  },
  {
    name: "MySQL",
    icon: <SiMysql size={size} color="#4479A1" />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={size} color="#4169E1" />,
  },
  {
    name: "Firebase",
    icon: <SiFirebase size={size} color="#FFCA28" />,
  },
  {
    name: "Supabase",
    icon: <SiSupabase size={size} color="#3FCF8E" />,
  },
  {
    name: "GraphQL",
    icon: <SiGraphql size={size} color="#E10098" />,
  },
  {
    name: "Flutter",
    icon: <SiFlutter size={size} color="#02569B" />,
  },
  {
    name: "Git",
    icon: <SiGit size={size} color="#F05032" />,
  },
];

const projectSize = 30;

export const workProjects: ProjectType[] = [
  {
    badges: [
      {
        name: "FullStack Developer",
        color: "pink",
      }
    ],
    title: "Hampi Corp",
    slug: "hampi-corp",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "",
    web: "https://hampicorp.com/",
    images: [
      "/images/hampicorp_template.png",
    ],
    icons: [
      {
        name: "PHP",
        icon: <SiPhp size={projectSize} color="#777BB4" />,
      },
      {
        name: "CodeIgniter",
        icon: <SiCodeigniter size={projectSize} color="#EF4223" />,
      },
      {
        name: "jQuery",
        icon: <SiJquery size={projectSize} color="#0769AD" />,
      },
      {
        name: "Bootstrap",
        icon: <SiBootstrap size={projectSize} color="#7952B3" />,
      },
      {
        name: "MySQL",
        icon: <SiMysql size={projectSize} color="#4479A1" />,
      },
    ]
  },
  {
    badges: [
      {
        name: "FullStack Developer",
        color: "pink",
      }
    ],
    title: "Bienvenidad de Cachimbos - UPC 2023 (Landing)",
    slug: "cachimbos-2023",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "",
    web: "https://upc-cachimbos-2023.com/",
    images: [
      "/images/cachimbos_upc_2023_template.png",
    ],
    icons: [
      {
        name: "HTML5",
        icon: <SiHtml5 size={projectSize} color="#E34F26" />,
      },
      {
        name: "Node.js",
        icon: <SiNodedotjs size={projectSize} color="#339933" />,
      },
      {
        name: "Express",
        icon: <SiExpress size={projectSize} className="text-black dark:text-white" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Firebase",
        icon: <SiFirebase size={projectSize} color="#FFCA28" />,
      },
      {
        name: "Heroku",
        icon: <SiHeroku size={projectSize} color="#430098" />,
      },
    ]
  },
  {
    badges: [
      {
        name: "Frontend Developer",
        color: "pink",
      }
    ],
    title: "Pro Indie Music (Portal)",
    slug: "pro-indie-music",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "",
    web: "https://portal.proindiemusic.com/",
    images: [
      "/images/proindiemusic_template.png",
    ],
    icons: [
      {
        name: "JavaScript",
        icon: <SiJavascript size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs size={projectSize} className="text-black dark:text-white" />,
      },
      {
        name: "Material UI",
        icon: <SiMui size={projectSize} color="#007FFF" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Axios",
        icon: <SiAxios size={projectSize} color="#5A29E4" />,
      },
    ]
  },
  {
    badges: [
      {
        name: "Tech Lead",
        color: "pink",
      }
    ],
    title: "Dale Delivery (Landing)",
    slug: "dale-delivery",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "",
    web: "https://www.daledelivery.pe/",
    images: [
      "/images/dale_delivery_template.png",
    ],
    icons: [
      {
        name: "TypeScript",
        icon: <SiTypescript size={projectSize} color="#3178C6" />,
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs size={projectSize} className="text-black dark:text-white" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={projectSize} color="#06B6D4" />,
      },
    ]
  },
];

export const personalProjects: ProjectType[] = [
  {
    badges: [
      {
        name: "Backend Developer",
        color: "pink",
      }
    ],
    title: "BootcamPe (E-commerce)",
    slug: "bootcampe",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "https://github.com/joseniquen08/bootcampe_niquen",
    web: "https://react-coder-988f2.web.app/",
    images: [
      "/images/bootcampe_template.png",
    ],
    icons: [
      {
        name: "JavaScript",
        icon: <SiJavascript size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <SiReact size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Firebase",
        icon: <SiFirebase size={projectSize} color="#FFCA28" />,
      },
    ]
  },
  {
    badges: [
      {
        name: "Backend Developer",
        color: "pink",
      }
    ],
    title: "Portfolio (1° version)",
    slug: "portfolio-react",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "https://github.com/joseniquen08/portfolio-react",
    web: "https://portfolio-react-red.vercel.app/",
    images: [
      "/images/portfolio_template.png",
    ],
    icons: [
      {
        name: "JavaScript",
        icon: <SiJavascript size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <SiReact size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={projectSize} color="#06B6D4" />,
      },
    ]
  },
  {
    badges: [
      {
        name: "Backend Developer",
        color: "pink",
      }
    ],
    title: "Music Player (Deezer API)",
    slug: "music-player-react",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "https://github.com/joseniquen08/music-player-react",
    web: "https://music-player-react-nine.vercel.app/",
    images: [
      "/images/music_player_template.png",
    ],
    icons: [
      {
        name: "JavaScript",
        icon: <SiJavascript size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <SiReact size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Chakra UI",
        icon: <SiChakraui size={projectSize} color="#319795" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={projectSize} color="#06B6D4" />,
      },
      {
        name: "Axios",
        icon: <SiAxios size={projectSize} color="#5A29E4" />,
      },
    ]
  },
  {
    badges: [
      {
        name: "Backend Developer",
        color: "pink",
      }
    ],
    title: "Licius (Social Network)",
    slug: "licius-fullstack",
    description: {
      en: "Ecommerce done for the end of the Reactjs course provided by Coderhouse",
      es: "E-commerce realizado para el final del curso de Reactjs brindado por Coderhouse",
    },
    github: "https://github.com/joseniquen08/licius-react",
    web: "https://licius-react.vercel.app/",
    images: [
      "/images/licius_template.png",
    ],
    icons: [
      {
        name: "JavaScript",
        icon: <SiJavascript size={projectSize} color="#F7DF1E" />,
      },
      {
        name: "React",
        icon: <SiReact size={projectSize} color="#61DAFB" />,
      },
      {
        name: "Node.js",
        icon: <SiNodedotjs size={projectSize} color="#339933" />,
      },
      {
        name: "Express",
        icon: <SiExpress size={projectSize} className="text-black dark:text-white" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={projectSize} color="#06B6D4" />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb size={projectSize} color="#47A248" />,
      },
      {
        name: "Redux",
        icon: <SiRedux size={projectSize} color="#764ABC" />,
      },
      {
        name: "Axios",
        icon: <SiAxios size={projectSize} color="#5A29E4" />,
      },
    ]
  },
]

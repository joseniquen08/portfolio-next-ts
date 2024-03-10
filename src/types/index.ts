import { ReactNode } from "react";

export type DataProjectType = {
  title: string;
  github: string;
  web: string;
  image: string;
  description: {
    en: string;
    es: string;
  };
  icons: [string];
};

export type ProjectType = {
  badges: {
    name: string;
    color: string;
  }[];
  slug: string;
  title: string;
  github: string;
  web: string;
  images: string[];
  description: {
    en: string;
    es: string;
  };
  icons: {
    name: string;
    icon: ReactNode;
  }[];
};

export type SkillType = {
  name: string;
  icon: ReactNode;
  experience: {
    en: string;
    es: string;
  };
};

export type TechnologyType = {
  name: string;
  icon: ReactNode;
};

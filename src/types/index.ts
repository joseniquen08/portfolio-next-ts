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
  status: number;
  slug: string;
  name: string;
  icon: ReactNode;
  description: string;
  roadmap: {
    title: string;
    items: {
      level: number;
      title: string;
      content: string[];
    }[];
  }[];
};

export type PriceType = {
  pack: string;
  value: string;
  x1: {
    real: number;
    discount: number;
  };
  x2: {
    real: number;
    discount: number;
  };
  x3: {
    real: number;
    discount: number;
  };
  x4: {
    real: number;
    discount: number;
  };
  x5: {
    real: number;
    discount: number;
  };
};

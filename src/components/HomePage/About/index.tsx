"use client";

import { motion, useReducedMotion } from "framer-motion";

const meta = [
  { key: "ubicación", value: "Lima, Perú 🇵🇪" },
  { key: "empresa", value: "Ticketmaster" },
  { key: "enfoque", value: "Backend · AWS · n8n" },
  { key: "intereses", value: "Fútbol · Música · Bici" },
];

export const About = () => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      id="about"
      className="max-w-5xl px-4 pt-16 pb-0 mx-auto sm:px-10 2xl:max-w-6xl lg:px-16 text-custom-light-text dark:text-custom-dark-text w-full"
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-display py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-light-accent dark:text-custom-dark-text">
              Sobre mí
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Bio */}
          <div className="space-y-5 text-lg font-normal leading-7 md:leading-8 flex-1 max-w-[65ch]">
            <p className="text-center md:text-start">
              Soy José Ñiquen, ingeniero de software en Perú. En Ticketmaster construyo el backend, mantengo la infraestructura en AWS y automatizo procesos con n8n. Me enfoco en sistemas sólidos que resuelvan problemas reales, y uso IA a diario para escribir mejor código y avanzar más rápido.
            </p>
            <p className="text-center md:text-start">
              Fuera del teclado: música casi siempre, fútbol y bici.
            </p>
          </div>

          {/* Metadata panel */}
          <div className="flex-none lg:w-64">
            <div className="font-mono text-sm rounded-lg border border-custom-light-primary/20 dark:border-custom-dark-accent-text/20 bg-custom-light-primary/5 dark:bg-custom-dark-accent-text/5 overflow-hidden">
              <div className="px-4 py-2 border-b border-custom-light-primary/15 dark:border-custom-dark-accent-text/15 text-xs text-custom-light-accent/50 dark:text-custom-dark-accent-text/50 tracking-widest">
                jose.config.ts
              </div>
              <div className="px-4 py-3 space-y-2.5">
                {meta.map(({ key, value }) => (
                  <div key={key} className="flex flex-col gap-0.5">
                    <span className="text-xs text-custom-light-text/40 dark:text-custom-dark-text/40 tracking-wider">
                      {key}
                    </span>
                    <span className="text-custom-light-text/80 dark:text-custom-dark-text/80 text-sm leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

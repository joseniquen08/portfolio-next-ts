"use client";

import { skills } from "@/utils/constants";
import { Skill } from "./Skill";
import { motion, useReducedMotion } from "framer-motion";

/** Extrae el número de años de strings como "+3.5 años" o "+2 years" */
const parseYears = (es: string) => parseFloat(es.replace(/[^0-9.]/g, "")) || 0;

export const Skills = () => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      id="skills"
      className="max-w-5xl px-4 pt-16 pb-12 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl text-custom-light-text dark:text-custom-dark-text w-full"
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex justify-center md:justify-start">
            <p className="font-display py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-light-accent dark:text-custom-dark-text">
              Habilidades
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3">
          {[...skills]
            .sort((a, b) => parseYears(b.experience.es) - parseYears(a.experience.es))
            .map((skill, i) => (
              <Skill key={i} {...skill} />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

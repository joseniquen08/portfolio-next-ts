"use client";

import { skills } from "@/utils/constants";
import { Skill } from "./Skill";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const Skills = () => {
  const [skillsTotal, setSkillsTotal] = useState(skills.slice(0, 17));
  const [more, setMore] = useState(false);
  const prefersReduced = useReducedMotion();

  const onClick = () => {
    if (more) {
      setSkillsTotal(skills.slice(0, 17));
    } else {
      setSkillsTotal(skills);
    }
    setMore((status) => !status);
  };

  return (
    <motion.div
      id="skills"
      className="max-w-5xl px-4 pt-24 pb-12 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl text-custom-light-text dark:text-custom-dark-text w-full"
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-mono text-xs tracking-widest uppercase text-custom-light-accent/60 dark:text-custom-dark-accent-text/60 text-center md:text-left">
            stack_tecnologico
          </p>
          <div className="flex justify-center md:justify-start">
            <p className="font-display py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-light-accent dark:text-custom-dark-primary">
              Habilidades
            </p>
          </div>
          <div className="hidden md:block w-10 h-1 rounded-lg bg-custom-light-primary dark:bg-custom-dark-accent"></div>
        </div>
        <div className="py-5 space-y-6">
          <div className="w-full">
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {skillsTotal.map(({ name, icon, experience }, i) => (
                <Skill
                  key={i}
                  icon={icon}
                  name={name}
                  experience={experience}
                />
              ))}
              <button
                type="button"
                onClick={onClick}
                className="border border-custom-light-primary/30 dark:border-custom-dark-primary/40 rounded-lg py-4 px-1 flex flex-col justify-center items-center space-y-2 hover:bg-custom-light-primary/5 dark:hover:bg-custom-dark-primary/10 dark:hover:backdrop-blur"
              >
                {more ? (
                  <HiMinus className="w-9 h-9" />
                ) : (
                  <HiPlus className="w-9 h-9" />
                )}
                <p className="font-medium">Ver {more ? "menos" : "más"}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

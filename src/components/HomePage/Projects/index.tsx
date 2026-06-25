"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineBriefcase, HiOutlineAcademicCap } from "react-icons/hi";
import { ProjectsColumn } from "./ProjectsColumn";
import { workProjects, personalProjects } from "@/utils/constants";

export const Projects = () => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      id="projects"
      className="max-w-5xl px-4 pt-16 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl text-custom-light-text dark:text-custom-dark-text w-full"
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="space-y-6">
        <div className="flex justify-center md:justify-start">
          <p className="font-display py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-light-accent dark:text-custom-dark-text">
            Experiencia
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <ProjectsColumn
            label="Experiencia laboral"
            icon={<HiOutlineBriefcase className="w-3.5 h-3.5" />}
            projects={workProjects}
          />
          <ProjectsColumn
            label="Proyectos personales"
            icon={<HiOutlineAcademicCap className="w-3.5 h-3.5" />}
            projects={personalProjects}
          />
        </div>
      </div>
    </motion.div>
  );
};

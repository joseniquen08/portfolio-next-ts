"use client";

import { motion } from "framer-motion";
import { NowPlaying } from "./NowPlaying";

export const About = () => {
  return (
    <motion.div
      id="about"
      className="max-w-5xl px-4 pt-24 pb-0 mx-auto sm:px-10 2xl:max-w-6xl lg:px-16 text-custom-ligth-text dark:text-custom-dark-text"
    >
      <div className="flex flex-col items-center space-y-8 lg:items-start">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex flex-col items-center md:items-start">
              <p className="py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-ligth-accent dark:text-custom-dark-primary">
                Sobre mí
              </p>
            </div>
            <div className="hidden md:block w-10 h-1 rounded-lg bg-custom-ligth-primary dark:bg-custom-dark-accent"></div>
          </div>
          <div className="space-y-6 text-lg font-normal leading-7 md:leading-8 md:text-lg max-w-[75ch]">
            <p className="text-center md:text-start">
              Soy un desarrollador FullStack radicado en Perú 🇵🇪. Me gusta
              desarrollar aplicaciones bonitas y confiables. Siempre estoy en
              constante aprendizaje de tecnologías relacionadas con el
              desarrollo web. Trabajo principalmente con React, sin embargo,
              todos los días aprendo algo nuevo de diferentes lenguajes,
              librerías y frameworks.
            </p>
            <p className="text-center md:text-start">
              También, me gusta escuchar música mientras realizo cualquier
              actividad. Amo el fútbol y manejar bicicleta.
            </p>
          </div>
        </div>
        <div className="relative w-full max-w-xs lg:max-w-sm">
          <NowPlaying />
        </div>
      </div>
    </motion.div>
  );
};

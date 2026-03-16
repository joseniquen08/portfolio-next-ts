"use client";

import { motion } from "framer-motion";
import { NowPlaying } from "./NowPlaying";

export const About = () => {
  return (
    <motion.div
      id="about"
      className="max-w-5xl px-4 pt-24 pb-0 mx-auto sm:px-10 2xl:max-w-6xl lg:px-16 text-custom-light-text dark:text-custom-dark-text w-full"
    >
      <div className="flex flex-col items-center space-y-8 lg:items-start">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex flex-col items-center md:items-start">
              <p className="py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-light-accent dark:text-custom-dark-primary">
                Sobre mí
              </p>
            </div>
            <div className="hidden md:block w-10 h-1 rounded-lg bg-custom-light-primary dark:bg-custom-dark-accent"></div>
          </div>
          <div className="space-y-6 text-lg font-normal leading-7 md:leading-8 md:text-lg max-w-[75ch]">
            <p className="text-center md:text-start">
              Soy José Ñiquen, Ingeniero de Software radicado en Perú 🇵🇪. Actualmente trabajo en Ticketmaster. Actualmente estoy enfocado en el desarrollo backend, el manejo de infraestructura en AWS y la creación de automatizaciones (con n8n). Me gusta construir sistemas que funcionen bien y resuelvan problemas reales. Además, siempre estoy probando cosas nuevas, y hoy en día me apoyo mucho en la IA para optimizar mi código y desarrollar soluciones más rápido.
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

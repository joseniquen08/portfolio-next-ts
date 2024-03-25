"use client";

import { TechnologyType } from "@/types";
import { BreadcrumbClass } from "./BreadcrumbClass";
import { Button } from "@/components/ui/button";
import { Link as LinkReactScroll } from "react-scroll";
import { Calendar } from "./Calendar";
import { Roadmap } from "./Roadmap";
import { Packs } from "./Packs";
import { FAQ } from "./FAQ";

export function ClassPage({ tech }: { tech: TechnologyType }) {
  return (
    <div className="flex flex-col w-full max-w-6xl px-4 py-2 md:py-10 mx-auto lg:px-16 text-custom-light-text dark:text-custom-dark-text flex-1">
      <BreadcrumbClass tech={tech} />
      <div className="flex flex-col gap-5 sm:flex-row justify-between items-center mt-10">
        <p className="text-5xl font-bold text-custom-light-accent dark:text-custom-dark-primary">
          {tech.name}
        </p>
        {tech.status == 2 && (
          <LinkReactScroll to="schedule-class" smooth={true} duration={500}>
            <Button variant="destructive">Agendar una clase</Button>
          </LinkReactScroll>
        )}
      </div>
      {tech.status == 2 ? (
        <>
          <p className="max-w-[80ch] mt-8">{tech.description}</p>
          <p className="max-w-[80ch] mt-4">
            Para esta tecnología, existen 2 modalidades de enseñanza. La primera
            es seguir una{" "}
            <span className="font-semibold text-custom-light-accent dark:text-custom-dark-primary">
              Ruta de aprendizaje
            </span>{" "}
            divida en niveles, que proporciona un enfoque estructurado para
            dominar gradualmente los conceptos desde principiante hasta un nivel
            más avanzado. La segunda modalidad consiste en{" "}
            <span className="font-semibold text-custom-light-accent dark:text-custom-dark-primary">
              Sesiones Personalizadas
            </span>{" "}
            enfocadas en resolver dudas o dificultades específicas que puedas
            tener durante tu proceso de aprendizaje. Ambas modalidades están
            diseñadas para adaptarse a tus necesidades y estilo de aprendizaje.
          </p>
          {tech.roadmap.length > 0 && <Roadmap tech={tech} />}
          <Packs />
          <Calendar tech={tech.name} />
          <FAQ />
        </>
      ) : (
        <p className="font-semibold text-xl mt-8 text-red-600/60">
          Próximamente...
        </p>
      )}
    </div>
  );
}

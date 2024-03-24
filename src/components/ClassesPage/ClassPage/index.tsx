"use client";

import { TechnologyType } from "@/types";
import { BreadcrumbClass } from "./BreadcrumbClass";
import { Button } from "@/components/ui/button";
import { Link as LinkReactScroll } from "react-scroll";
import { Calendar } from "./Calendar";
import { Roadmap } from "./Roadmap";

export function ClassPage({ tech }: { tech: TechnologyType }) {
  return (
    <div className="flex flex-col w-full max-w-6xl px-4 py-2 md:py-10 mx-auto lg:px-16 text-custom-light-text dark:text-custom-dark-text flex-1">
      <BreadcrumbClass tech={tech} />
      <div className="flex justify-between items-center mt-10">
        <p className="text-5xl font-bold text-custom-light-accent dark:text-custom-dark-primary">
          {tech.name}
        </p>
        <LinkReactScroll to="schedule-class" smooth={true} duration={500}>
          <Button variant="destructive">Agendar una clase</Button>
        </LinkReactScroll>
      </div>
      <p className="max-w-[80ch] mt-8">{tech.description}</p>
      {tech.roadmap.length > 0 && <Roadmap tech={tech} />}
      <Calendar />
    </div>
  );
}

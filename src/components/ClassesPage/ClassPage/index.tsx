"use client";

import { TechnologyType } from "@/types";
import { BreadcrumbClass } from "./BreadcrumbClass";
import { Button } from "@/components/ui/button";
import { Link as LinkReactScroll } from "react-scroll";
import { Calendar } from "./Calendar";
import { Packs } from "./Packs";
import { FAQ } from "./FAQ";
import { Badge } from "@/components/ui/badge";
import { Modalities } from "./Modalities";
import { TabsModalities } from "./TabsModalities";

export function ClassPage({ tech }: { tech: TechnologyType }) {
  return (
    <div className="flex flex-col w-full max-w-6xl px-4 py-2 md:py-10 mx-auto lg:px-16 text-custom-light-text dark:text-custom-dark-text flex-1">
      <BreadcrumbClass tech={tech} />
      <div className="flex flex-col gap-5 justify-between items-center sm:items-start mt-10">
        {tech.status == 2 && (
          <Badge variant="default">¡Tu primera clase es gratuita!</Badge>
        )}
        <p className="text-6xl font-bold text-custom-light-accent dark:text-custom-dark-primary">
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
          <Modalities />
          <TabsModalities tech={tech} />
          <Packs />
          {/* <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3dqEeg0bnh6eDnWVPmUgIWcjbQMKif1EBir_Y3dqPy1bKNizcCwjR3nqGMdQpAlOzm6lOO0DZb?gv=true"
            style={{ border: 0 }}
            className="dark:bg-white dark:tex-red-600"
            width="100%"
            height="640"
          ></iframe> */}
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

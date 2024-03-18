"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomFlowbiteTheme, Timeline } from "flowbite-react";
import {
  HiOutlineAcademicCap,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { ProjectRow } from "./ProjectRow";
import { useState } from "react";
import { ProjectType } from "@/types";
import { personalProjects } from "@/utils/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: false,
});

const customTheme: CustomFlowbiteTheme["timeline"] = {
  root: {
    direction: {
      vertical:
        "relative border-l border-custom-light-text/20 dark:border-custom-dark-text/20",
    },
  },
  item: {
    point: {
      marker: {
        base: {
          vertical:
            "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-custom-light-accent bg-custom-light-accent dark:border-custom-dark-primary dark:bg-custom-dark-primary",
        },
      },
    },
  },
};

export const PersonalProjectsSection = () => {
  const [personalProjectsSort, setPersonalProjectsSort] =
    useState<ProjectType[]>(personalProjects);
  const [position, setPosition] = useState<string>("toOld");

  const onValueChange = (value: string) => {
    if (value !== position) {
      if (value === "toRecent") {
        setPosition(value);
        setPersonalProjectsSort(personalProjectsSort.reverse());
      } else if (value === "toOld") {
        setPosition(value);
        setPersonalProjectsSort(personalProjectsSort.reverse());
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4 border border-gray-200 dark:border-white/10 p-3.5 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium flex items-center gap-2.5">
          <HiOutlineAcademicCap className="w-6 h-6" />
          <span>Proyectos Personales</span>
        </p>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {position == "toRecent" ? (
                <HiOutlineSortDescending className="w-4 h-4" />
              ) : (
                <HiOutlineSortAscending className="w-4 h-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`${poppins.className} font-poppins`}
          >
            <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={onValueChange}
            >
              <DropdownMenuRadioItem value="toOld">
                <span>Reciente a más antiguo</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="toRecent">
                <span>Antiguo a más reciente</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="h-152 md:h-136">
        <div className="px-1.5">
          <Timeline theme={customTheme}>
            {personalProjectsSort.map(
              (
                {
                  title,
                  badges,
                  slug,
                  description,
                  github,
                  web,
                  icons,
                  images,
                },
                i
              ) => (
                <ProjectRow
                  key={i}
                  badges={badges}
                  slug={slug}
                  title={title}
                  images={images}
                  icons={icons}
                  web={web}
                  description={description}
                  github={github}
                />
              )
            )}
          </Timeline>
        </div>
      </ScrollArea>
    </div>
  );
};

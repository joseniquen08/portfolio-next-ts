import { ScrollArea } from "@/components/ui/scroll-area";
import { Timeline } from "flowbite-react";
import { HiOutlineAcademicCap, HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";
import { ProjectRow } from "./ProjectRow";
import { useState } from "react";
import { ProjectType } from "@/types";
import { personalProjects } from "@/utils/constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Poppins } from "next/font/google";

interface Props {
  locale: string | undefined;
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false,
});

export const PersonalProjectsSection = ({ locale }: Props) => {
  const [personalProjectsSort, setPersonalProjectsSort] = useState<ProjectType[]>(personalProjects);
  const [position, setPosition] = useState<string>("toRecent");

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
  }

  return (
    <div className="flex flex-col gap-2 md:gap-4 border border-gray-200 dark:border-white/10 p-3.5 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-xl md:text-2xl font-medium flex items-center gap-2.5">
          <HiOutlineAcademicCap className="w-6 h-6" />
          <span>Personales</span>
        </p>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center h-8 w-8 rounded-md border dark:border-custom-dark-text/30">
              {position == "toRecent" ? (
                <HiOutlineSortDescending className="w-4 h-4" />
                ) : (
                <HiOutlineSortAscending className="w-4 h-4" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`${poppins.className} font-poppins`}>
            <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={onValueChange}>
              <DropdownMenuRadioItem value="toRecent">
                <span>Antiguo a más reciente</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="toOld">
                <span>Reciente a más antiguo</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="h-152 md:h-136">
        <div className="px-1.5">
          <Timeline>
            {personalProjectsSort.map(({ title, badges, slug, description, github, web, icons, images }, i) => (
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
                locale={locale}
              />
            ))}
          </Timeline>
        </div>
      </ScrollArea>
    </div>
  );
}
import en from '@public/locales/en/projects';
import es from '@public/locales/es/projects';
import { useRouter } from 'next/router';
import { ProjectRow } from './ProjectRow';
import { personalProjects, workProjects } from '@/utils/constants';
import { Timeline } from 'flowbite-react';
import { HiOutlineAcademicCap, HiOutlineBriefcase } from 'react-icons/hi';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Projects = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

  return (
    <div
      id="projects"
      className="max-w-5xl px-5 pt-24 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl text-custom-ligth-text dark:text-custom-dark-text"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex justify-center md:justify-start">
            <p className="py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-ligth-primary dark:text-custom-dark-primary">
              {t.title}
            </p>
          </div>
          <div className="hidden md:block w-10 h-1 rounded-lg bg-custom-ligth-accent dark:bg-custom-dark-accent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-xl md:text-2xl font-medium flex items-center gap-2.5">
              <HiOutlineBriefcase className="w-6 h-6" />
              <span>Laborales</span>
            </p>
            <ScrollArea className="h-120">
              <div className="px-2">
                <Timeline>
                  {workProjects.map(({ title, badges, slug, description, github, web, icons, images }, i) => (
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
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-xl md:text-2xl font-medium flex items-center gap-2.5">
              <HiOutlineAcademicCap className="w-6 h-6" />
              <span>Personales</span>
            </p>
            <ScrollArea className="h-120">
              <div className="px-2">
                <Timeline>
                  {personalProjects.map(({ title, badges, slug, description, github, web, icons, images }, i) => (
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
        </div>
      </div>
    </div>
  );
};

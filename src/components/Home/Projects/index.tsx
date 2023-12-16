import fetcher from '@/lib/fetcher';
import en from '@public/locales/en/projects';
import es from '@public/locales/es/projects';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ProjectRow } from './ProjectRow';

export const Projects = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;
  const { data } = useSWR('/api/projects', fetcher);

  return (
    <div
      id="projects"
      className="max-w-5xl px-5 pt-24 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl dark:text-white"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex justify-center md:justify-start">
            <p className="py-1 pr-2 text-3xl font-bold tracking-tight text-center text-transparent md:text-4xl w-max md:text-left bg-clip-text bg-gradient-to-r from-custom-accent to-custom-accent dark:to-custom-accent">
              {t.title}
            </p>
          </div>
          <div className="hidden md:block w-10 h-1 rounded-lg bg-stone-500 dark:bg-white"></div>
        </div>
        {data ? (
          <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-2 md:gap-12">
            {data.projects.map(
              ({ id, title, image, icons, web, description, github }: any) => (
                <ProjectRow
                  key={id}
                  id={id}
                  title={title}
                  image={image}
                  icons={icons}
                  web={web}
                  description={description}
                  github={github}
                  locale={locale}
                />
              )
            )}
            {/* {data.projects.map(
              ({ id, title, image, web, description, github }: any) => (
                <ProjectCard
                  key={id}
                  id={id}
                  title={title}
                  image={image}
                  web={web}
                  description={description}
                  github={github}
                  locale={locale}
                />
              )
            )} */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

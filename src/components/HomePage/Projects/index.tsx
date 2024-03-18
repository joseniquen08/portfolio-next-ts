import { WorkProjectsSection } from "./WorkProjectsSection";
import { PersonalProjectsSection } from "./PersonalProjectsSection";

export const Projects = () => {
  return (
    <div
      id="projects"
      className="max-w-5xl px-4 pt-24 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl text-custom-light-text dark:text-custom-dark-text w-full"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex justify-center md:justify-start">
            <p className="py-1 pr-2 text-3xl font-bold tracking-tight text-center md:text-4xl w-max md:text-left text-custom-light-accent dark:text-custom-dark-primary">
              Experiencia
            </p>
          </div>
          <div className="hidden md:block w-10 h-1 rounded-lg bg-custom-light-primary dark:bg-custom-dark-accent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3.5">
          <WorkProjectsSection />
          <PersonalProjectsSection />
        </div>
      </div>
    </div>
  );
};

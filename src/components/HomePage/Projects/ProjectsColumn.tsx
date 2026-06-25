import type { ReactNode } from "react";
import { ProjectType } from "@/types";
import { ProjectRow } from "./ProjectRow";

interface Props {
  label: string;
  icon: ReactNode;
  projects: ProjectType[];
}

export const ProjectsColumn = ({ label, icon, projects }: Props) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-custom-light-accent/50 dark:text-custom-dark-accent-text/50">
          {icon}
        </span>
        <span className="text-xs font-medium tracking-wide text-custom-light-accent/50 dark:text-custom-dark-accent-text/50">
          {label}
        </span>
      </div>

      {/* Timeline */}
      <ul className="relative ml-1.5 border-l border-custom-light-primary/20 dark:border-custom-dark-accent-text/20 py-2 pr-2 space-y-6">
        {projects.map((project, i) => (
          <ProjectRow key={i} {...project} />
        ))}
      </ul>
    </div>
  );
};

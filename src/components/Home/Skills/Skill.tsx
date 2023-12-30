import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  name: string;
}

export const Skill = ({ icon, name }: Props) => {
  return (
    <div className="border border-custom-ligth-primary/30 dark:border-custom-dark-primary/40 rounded-lg py-4 px-1 flex flex-col items-center space-y-3.5 hover:bg-custom-ligth-primary hover:bg-opacity-5 dark:hover:bg-custom-dark-primary/10 dark:hover:backdrop-blur cursor-default">
      {icon}
      <p className="font-medium">{name}</p>
    </div>
  );
};

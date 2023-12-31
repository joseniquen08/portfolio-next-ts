import { SkillType } from "@/types";

type Props = SkillType & {
  locale: string | undefined;
}

export const Skill = ({ icon, name, experience, locale }: Props) => {
  return (
    <div className="border border-custom-ligth-primary/30 dark:border-custom-dark-primary/40 rounded-lg py-4 px-1 flex flex-col items-center space-y-0 hover:bg-custom-ligth-primary hover:bg-opacity-5 dark:hover:bg-custom-dark-primary/10 dark:hover:backdrop-blur cursor-default">
      {icon}
      <p className="font-medium pt-3">{name}</p>
      <p className="text-custom-ligth-text/60 dark:text-custom-dark-text/60 text-xs font-medium">{locale === 'en' ? experience.en : experience.es}</p>
    </div>
  );
};

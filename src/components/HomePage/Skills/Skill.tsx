import { SkillType } from "@/types";

export const Skill = ({ icon, name }: SkillType) => {
  return (
    <div className="flex items-center gap-2 text-custom-light-text dark:text-custom-dark-text [&_svg]:fill-current [&_path]:fill-current">
      <span className="flex-none">{icon}</span>
      <span className="text-sm">{name}</span>
    </div>
  );
};

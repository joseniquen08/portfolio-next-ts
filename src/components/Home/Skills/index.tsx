import { skills } from '@/utils/constants';
import en from '@public/locales/en/skills';
import es from '@public/locales/es/skills';
import { useRouter } from 'next/router';
import { Skill } from './Skill';

export const Skills = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

  return (
    <div
      id="skills"
      className="max-w-5xl px-5 pt-24 pb-12 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl text-custom-ligth-text dark:text-custom-dark-text"
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
        <div className="py-5 space-y-6">
          <div className="w-full">
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {skills.map(({ name, icon }, i) => (
                <Skill key={i} icon={icon} name={name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

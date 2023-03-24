import { skills } from '@/utils/constants';
import { transitionScreenVariants } from '@/utils/variants';
import en from '@public/locales/en/skills';
import es from '@public/locales/es/skills';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Skill } from './Skill';

export const Skills = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

  return (
    <div
      id="skills"
      className="max-w-5xl px-5 pt-24 pb-12 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl dark:text-white"
    >
      <div className="space-y-6">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={transitionScreenVariants()}
          className="space-y-1"
        >
          <div className="flex justify-center md:justify-start">
            <p className="py-1 text-4xl italic font-bold tracking-tight text-center text-transparent md:text-5xl w-max md:text-left bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600 dark:to-sky-500">
              {t.title}
            </p>
          </div>
          <div className="hidden md:block w-8 h-[1px] bg-stone-500 dark:bg-white"></div>
        </motion.div>
        <div className="py-5 space-y-6">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4 text-sm font-medium tracking-wide md:grid-cols-2 lg:grid-cols-3 sm:text-base lg:text-lg">
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                variants={transitionScreenVariants(0.1)}
                className="px-5 py-6 space-y-4 rounded-lg bg-stone-500 bg-opacity-5 dark:bg-white dark:bg-opacity-5"
              >
                <div className="flex w-full">
                  <p className="flex-none text-xl font-semibold cursor-default lg:text-lg">
                    {t.types.languages}
                  </p>
                </div>
                <div className="space-y-2 text-base">
                  {skills.languages.map(({ id, img, name }) => (
                    <Skill key={id} image={img} name={name} />
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                variants={transitionScreenVariants(0.2)}
                className="px-5 py-6 space-y-4 rounded-lg bg-stone-500 bg-opacity-5 dark:bg-white dark:bg-opacity-5"
              >
                <div className="flex w-full">
                  <p className="flex-none text-xl font-semibold cursor-default lg:text-lg">
                    {t.types.lib_and_fram}
                  </p>
                </div>
                <div className="space-y-2 text-base">
                  {skills.lib_fram.map(({ id, img, name }) => (
                    <Skill key={id} image={img} name={name} />
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                variants={transitionScreenVariants(0.3)}
                className="px-5 py-6 space-y-4 rounded-lg bg-stone-500 bg-opacity-5 dark:bg-white dark:bg-opacity-5"
              >
                <div className="flex w-full">
                  <p className="flex-none text-xl font-semibold cursor-default lg:text-lg">
                    {t.types.tools}
                  </p>
                </div>
                <div className="space-y-2 text-base">
                  {skills.tools.map(({ id, img, name }) => (
                    <Skill key={id} image={img} name={name} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

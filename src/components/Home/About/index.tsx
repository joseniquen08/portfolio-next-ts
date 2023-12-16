import en from '@public/locales/en/about';
import es from '@public/locales/es/about';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { NowPlaying } from './NowPlaying';

export const About = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

  return (
    <motion.div
      id="about"
      className="max-w-5xl px-4 pt-24 pb-0 mx-auto sm:px-10 2xl:max-w-6xl lg:px-16 text-stone-600 dark:text-white"
    >
      <div className="flex flex-col items-center space-y-8 lg:items-start">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex flex-col items-center md:items-start">
              <p className="py-1 pr-2 text-3xl font-bold tracking-tight text-center text-transparent md:text-4xl w-max md:text-left bg-clip-text bg-gradient-to-r from-light-blue-400 to-light-blue-400 dark:to-light-blue-400">
                {t.title}
              </p>
            </div>
            <div className="hidden md:block w-10 h-1 rounded-lg bg-stone-500 dark:bg-white"></div>
          </div>
          <div className="space-y-6 text-lg font-normal leading-7 md:leading-8 md:text-lg">
            <p className="text-center md:text-start">{t.about_me}</p>
            <p className="text-center md:text-start">{t.hobbies}</p>
          </div>
        </div>
        <div className="relative w-full max-w-xs lg:max-w-sm">
          <NowPlaying />
        </div>
      </div>
    </motion.div>
  );
};

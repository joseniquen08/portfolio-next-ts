import fetcher from '@/lib/fetcher';
import { transitionScreenVariants } from '@/utils/variants';
import en from '@public/locales/en/projects';
import es from '@public/locales/es/projects';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { CardProject } from './CardProject';

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
        {data ? (
          <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-2 md:gap-12">
            {data.projects.map(
              ({ id, title, image, web, description, github }: any) => (
                <CardProject
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
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

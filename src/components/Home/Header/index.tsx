import perfil from '@public/images/perfil.png';
import en from '@public/locales/en/header';
import es from '@public/locales/es/header';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si';
import { LinkSocialNetwork } from './LinkSocialNetwork';

export const Header = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

  return (
    <div className="flex flex-col-reverse w-full max-w-5xl px-2 pt-12 mx-auto space-y-8 space-y-reverse lg:space-y-0 lg:flex-row lg:px-16 lg:pt-28 lg:pb-16 2xl:max-w-6xl">
      <div className="flex flex-col justify-center flex-none space-y-10">
        <div className="flex flex-col justify-center space-y-1 lg:space-y-2.5 text-center lg:text-left">
          <p className="text-3xl font-semibold lg:text-4xl dark:text-white text-stone-700">
            {t.hi}
          </p>
          <p className="py-1 text-5xl font-bold leading-tight tracking-tighter text-transparent break-words lg:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            {t.name}
          </p>
          <p className="text-3xl font-semibold tracking-tight break-words lg:text-4xl text-stone-500 dark:text-white">
            {t.junior}
          </p>
        </div>
        <div className="flex justify-center pl-1 space-x-5 text-lg lg:space-x-7 lg:justify-start dark:text-white text-slate-900">
          <LinkSocialNetwork href="https://github.com/joseniquen08">
            <SiGithub className="h-7 w-7" />
          </LinkSocialNetwork>
          <LinkSocialNetwork href="https://www.linkedin.com/in/jose-niquen">
            <SiLinkedin className="h-7 w-7" />
          </LinkSocialNetwork>
          <LinkSocialNetwork href="https://www.instagram.com/jose.niquen">
            <SiInstagram className="h-7 w-7" />
          </LinkSocialNetwork>
        </div>
      </div>
      <div className="flex justify-center w-full lg:justify-end">
        <div className="flex flex-col items-center space-y-6 lg:space-y-0">
          <div className="w-60 lg:w-72">
            <motion.div
              whileHover="hover"
              className="relative h-60 w-60 lg:w-72 lg:h-72"
            >
              <Image
                src={perfil}
                priority
                alt="Perfil"
                className="absolute z-20 rounded-full saturate-150"
              />
              <motion.div
                animate={{ scale: 0.98 }}
                variants={{ hover: { scale: 1.05 } }}
                className="absolute z-10 hidden scale-90 border-2 border-[#00FF96] rounded-full w-60 h-60 lg:block lg:w-72 lg:h-72 -bottom-0 -right-0"
              ></motion.div>
              <motion.div
                animate={{ scale: 0.98 }}
                variants={{ hover: { scale: 1.1 } }}
                className="absolute z-10 hidden scale-90 border-2 border-[#00A1FF] rounded-full w-60 h-60 lg:block lg:w-72 lg:h-72 -bottom-0 -right-0"
              ></motion.div>
            </motion.div>
          </div>
          {/* <div className="relative w-72">
            <div className="w-full lg:absolute lg:top-6">
              <NowPlaying />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

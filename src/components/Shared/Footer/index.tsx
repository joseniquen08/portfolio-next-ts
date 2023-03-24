import { useRouter } from 'next/router';
import { HiOutlinePlusSm } from 'react-icons/hi';
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiNextdotjs,
  SiTailwindcss,
} from 'react-icons/si';
import en from '../../../../public/locales/en/footer';
import es from '../../../../public/locales/es/footer';
import { LinkSocialNetwork } from './LinkSocialNetwork';

export const Footer = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

  return (
    <footer className="text-stone-900 dark:text-white">
      <div className="max-w-6xl px-4 pt-6 pb-10 mx-auto sm:px-10 lg:px-16 md:py-6">
        <div className="relative flex flex-col items-center justify-between w-full space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col z-20 md:flex-row space-y-3 md:space-y-0 space-x-0 md:space-x-2.5 items-center justify-center">
            <p className="text-sm md:text-base">{t.made_with}</p>
            <div className="flex items-center space-x-1.5">
              <SiNextdotjs className="w-16 h-16 md:w-9 md:h-9" />
              <HiOutlinePlusSm className="w-6 h-6 md:w-4 md:h-4" />
              <SiTailwindcss className="w-16 h-16 md:w-9 md:h-9" />
            </div>
          </div>
          <p className="inset-0 z-10 flex items-center justify-center text-lg font-medium text-center md:absolute md:font-normal">
            {t.author}
          </p>
          <div className="z-20 flex justify-center space-x-4 text-lg md:space-x-2">
            <LinkSocialNetwork href="https://github.com/joseniquen08">
              <SiGithub className="w-6 h-6" />
            </LinkSocialNetwork>
            <LinkSocialNetwork href="https://www.linkedin.com/in/jose-niquen">
              <SiLinkedin className="w-6 h-6" />
            </LinkSocialNetwork>
            <LinkSocialNetwork href="https://www.instagram.com/jose.niquen">
              <SiInstagram className="w-6 h-6" />
            </LinkSocialNetwork>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { ButtonContact } from '@/components/Shared/Navbar/ButtonContact';
import { MenuBurger } from '@/components/Shared/Navbar/MenuBurger';
import { MenuLanguage } from '@/components/Shared/Navbar/MenuLanguage';
import { MenuTheme } from '@/components/Shared/Navbar/MenuTheme';
import { ModalContact } from '@/components/Shared/Navbar/ModalContact';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import en from '../../../../public/locales/en/navbar';
import es from '../../../../public/locales/es/navbar';

export const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [showBg, setShowBg] = useState(false);
  const [themeSelected, setThemeSelected] = useState<
    'light' | 'dark' | undefined
  >(undefined);
  const [themeSystem, setThemeSystem] = useState('light');
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : es;

  useEffect(() => {
    if (!('theme' in localStorage)) {
      setThemeSelected(undefined);
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementsByTagName('HTML')[0].setAttribute('class', 'dark');
        setThemeSystem('dark');
      } else {
        setThemeSystem('light');
      }
    } else {
      document
        .getElementsByTagName('HTML')[0]
        .setAttribute('class', localStorage.getItem('theme') || '');
      if (localStorage.getItem('theme') === 'dark') {
        setThemeSelected('dark');
      } else if (localStorage.getItem('theme') === 'light') {
        setThemeSelected('light');
      }
    }
  }, [themeSelected]);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 24) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    });
  }

  const changeTheme = (theme: 'light' | 'dark' | undefined) => {
    if (theme === undefined) {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementsByTagName('HTML')[0].setAttribute('class', 'dark');
      } else {
        document
          .getElementsByTagName('HTML')[0]
          .setAttribute('class', theme ? '' : 'sys');
      }
    } else {
      localStorage.setItem('theme', theme);
      document.getElementsByTagName('HTML')[0].setAttribute('class', theme);
    }
    setThemeSelected(theme);
  };

  const closeContactModal = () => {
    setContactModalIsOpen(false);
  };

  const openContactModal = () => {
    setContactModalIsOpen(true);
  };

  return (
    <>
      <nav
        className={`dark:text-white text-gray-700 mt-1 z-40 sticky top-0 w-full bg-white bg-gradient-to-r from-gray-50 to-gray-50/95 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-900/95 ${
          showBg
            ? 'border-b shadow-lg shadow-gray-200/50 dark:shadow-slate-900/50'
            : ''
        }`}
      >
        <div className="relative flex flex-row items-center justify-between px-3 py-3 lg:py-2 sm:px-4 lg:px-16">
          <div className="flex items-center">
            <div className="flex items-center md:hidden">
              <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
                <MenuBurger toggle={() => toggleOpen()} />
              </motion.nav>
            </div>
            <div className="z-10 flex items-center px-2 ml-1">
              <Link href="/" legacyBehavior>
                <motion.a
                  whileTap={{ scale: 0.9 }}
                  className="relative w-10 h-10 cursor-pointer lg:h-12 lg:w-12"
                >
                  <Image
                    src={`/images/${
                      themeSelected === 'dark'
                        ? 'logo_blanco.png'
                        : themeSelected === 'light'
                        ? 'logo.png'
                        : themeSystem === 'dark'
                        ? 'logo_blanco.png'
                        : 'logo.png'
                    }`}
                    alt="Perfil"
                    layout="fill"
                    className="z-20 object-scale-down"
                  />
                </motion.a>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <ul className="top-0 left-0 z-0 flex flex-row items-center justify-center w-full h-full text-xl font-medium md:space-x-4 lg:space-x-6 dark:font-normal">
              <motion.li whileTap={{ scale: 0.9 }}>
                <Link href="/#about" legacyBehavior>
                  <a className="px-3 py-2 text-lg rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-5">
                    {t.ul.about_me}
                  </a>
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 0.9 }}>
                <Link href="/#projects" legacyBehavior>
                  <a className="px-3 py-2 text-lg rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-5">
                    {t.ul.projects}
                  </a>
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 0.9 }}>
                <Link href="/#skills" legacyBehavior>
                  <a className="px-3 py-2 text-lg rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-5">
                    {t.ul.skills}
                  </a>
                </Link>
              </motion.li>
            </ul>
          </div>
          <div className="flex flex-row items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <MenuLanguage />
            <MenuTheme
              themeSelected={themeSelected}
              setThemeSelected={setThemeSelected}
              themeSystem={themeSystem}
              changeTheme={changeTheme}
            />
            <div className="pr-1.5">
              <ButtonContact openContactModal={openContactModal} />
            </div>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            initial={false}
            transition={{ type: 'spring' }}
            animate={isOpen ? 'open' : 'closed'}
            variants={{
              closed: { opacity: 0, display: 'none' },
              open: { opacity: 1, display: 'block' },
            }}
            exit={{ opacity: 0, display: 'none' }}
            className="absolute w-full font-medium text-gray-800 bg-gray-200 shadow-xl md:hidden dark:text-white dark:bg-slate-800 shadow-gray-200/50 dark:shadow-slate-800/50"
          >
            <div className="px-2.5 sm:px-4 py-3 space-y-1.5">
              <Link href="/#about" legacyBehavior>
                <a
                  onClick={() => toggleOpen()}
                  className="block cursor-pointer rounded-xl focus:bg-gray-300 dark:focus:bg-slate-900 tracking-wide px-3 py-1.5"
                >
                  {t.ul.about_me}
                </a>
              </Link>
              <Link href="/#projects" legacyBehavior>
                <a
                  onClick={() => toggleOpen()}
                  className="block cursor-pointer rounded-xl focus:bg-gray-300 dark:focus:bg-slate-900 tracking-wide px-3 py-1.5"
                >
                  {t.ul.projects}
                </a>
              </Link>
              <Link href="/#skills" legacyBehavior>
                <a
                  onClick={() => toggleOpen()}
                  className="block cursor-pointer rounded-xl focus:bg-gray-300 dark:focus:bg-slate-900 tracking-wide px-3 py-1.5"
                >
                  {t.ul.skills}
                </a>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </nav>
      <ModalContact
        theme={themeSelected}
        contactModalIsOpen={contactModalIsOpen}
        closeContactModal={closeContactModal}
      />
    </>
  );
};

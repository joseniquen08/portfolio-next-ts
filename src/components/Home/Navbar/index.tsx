import { ButtonContact } from '@/components/Shared/Navbar/ButtonContact';
import { MenuBurger } from '@/components/Shared/Navbar/MenuBurger';
import { MenuLanguage } from '@/components/Shared/Navbar/MenuLanguage';
import { MenuTheme } from '@/components/Shared/Navbar/MenuTheme';
import { ModalContact } from '@/components/Shared/Navbar/ModalContact';
import logo from '@public/images/logo.png';
import logo_blanco from '@public/images/logo_blanco.png';
import en from '@public/locales/en/navbar';
import es from '@public/locales/es/navbar';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Link as LinkReactScroll, animateScroll } from 'react-scroll';

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
    if (window.scrollY > 24) {
      setShowBg(true);
    } else {
      setShowBg(false);
    }
  }, [themeSelected]);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 24) {
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

  const scrollTop = () => {
    animateScroll.scrollToTop();
  };

  return (
    <>
      <nav
        className={`dark:text-custom-dark-text text-custom-ligth-text mt-1 z-40 sticky top-0 w-full ${
          showBg
            ? 'dark:border-b border-b-dark-blue-700 shadow-lg shadow-gray-200/50 dark:shadow-custom-dark-bg/50 backdrop-blur bg-custom-ligth-bg/75 dark:bg-custom-dark-bg/75'
            : 'bg-gradient-to-r from-custom-ligth-bg to-custom-ligth-bg/95 dark:bg-gradient-to-r dark:from-custom-dark-bg dark:to-custom-dark-bg/95 bg-custom-ligth-bg'
        }`}
      >
        <div className="relative flex flex-row items-center justify-between max-w-5xl px-3 py-3 mx-auto lg:py-2 sm:px-4 lg:px-16 2xl:max-w-6xl">
          <div className="flex items-center">
            <div className="flex items-center md:hidden">
              <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
                <MenuBurger toggle={() => toggleOpen()} />
              </motion.nav>
            </div>
            <div className="z-10 flex items-center px-2 ml-1 lg:px-0 lg:m-0">
              <motion.a
                whileTap={{ scale: 0.9 }}
                onClick={scrollTop}
                className="relative flex items-center w-10 h-10 cursor-pointer lg:h-12 lg:w-12"
              >
                <Image
                  src={
                    themeSelected === 'dark'
                      ? logo_blanco
                      : themeSelected === 'light'
                      ? logo
                      : themeSystem === 'dark'
                      ? logo_blanco
                      : logo
                  }
                  alt="logo"
                  className="z-20 object-scale-down"
                />
              </motion.a>
            </div>
          </div>
          <div className="hidden md:block">
            <ul className="top-0 left-0 z-0 flex flex-row items-center justify-center w-full h-full text-xl font-medium md:space-x-2 lg:space-x-4 dark:font-normal">
              <motion.li whileTap={{ scale: 0.9 }}>
                <LinkReactScroll
                  to="projects"
                  smooth={true}
                  duration={500}
                  className="px-3 py-2 text-lg rounded-lg cursor-pointer hover:bg-custom-ligth-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5"
                >
                  {t.ul.projects}
                </LinkReactScroll>
              </motion.li>
              <motion.li whileTap={{ scale: 0.9 }}>
                <LinkReactScroll
                  to="about"
                  smooth={true}
                  duration={500}
                  className="px-3 py-2 text-lg rounded-lg cursor-pointer hover:bg-custom-ligth-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5"
                >
                  {t.ul.about_me}
                </LinkReactScroll>
              </motion.li>
              <motion.li whileTap={{ scale: 0.9 }}>
                <LinkReactScroll
                  to="skills"
                  smooth={true}
                  duration={500}
                  className="px-3 py-2 text-lg rounded-lg cursor-pointer hover:bg-custom-ligth-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5"
                >
                  {t.ul.skills}
                </LinkReactScroll>
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
            className="absolute w-full font-medium text-custom-ligth-text bg-custom-ligth-bg shadow-xl md:hidden dark:text-custom-dark-text dark:bg-custom-dark-bg shadow-gray-200/50 dark:shadow-custom-dark-bg/50"
          >
            <div className="px-2.5 sm:px-4 py-3 space-y-1.5">
              <LinkReactScroll
                onClick={() => toggleOpen()}
                to="projects"
                smooth={true}
                duration={500}
                className="block cursor-pointer rounded-xl focus:bg-custom-ligth-bg dark:focus:bg-custom-dark-bg tracking-wide px-3 py-1.5"
              >
                {t.ul.projects}
              </LinkReactScroll>
              <LinkReactScroll
                onClick={() => toggleOpen()}
                to="about"
                smooth={true}
                duration={500}
                className="block cursor-pointer rounded-xl focus:bg-custom-ligth-bg dark:focus:bg-custom-dark-bg tracking-wide px-3 py-1.5"
              >
                {t.ul.about_me}
              </LinkReactScroll>
              <LinkReactScroll
                onClick={() => toggleOpen()}
                to="skills"
                smooth={true}
                duration={500}
                className="block cursor-pointer rounded-xl focus:bg-custom-ligth-bg dark:focus:bg-custom-dark-bg tracking-wide px-3 py-1.5"
              >
                {t.ul.skills}
              </LinkReactScroll>
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

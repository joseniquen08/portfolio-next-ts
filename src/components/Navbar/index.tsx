"use client";

import { useCycle, motion, AnimatePresence, Cycle } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link as LinkReactScroll, animateScroll } from "react-scroll";
import logo from "@public/images/logo.webp";
import logo_blanco from "@public/images/logo_blanco.webp";
import { MenuBurger } from "./MenuBurger";
import { MenuTheme } from "./MenuTheme";
import { ButtonContact } from "./ButtonContact";
import { ModalContact } from "./ModalContact";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [showBg, setShowBg] = useState<boolean>(false);
  const [themeSelected, setThemeSelected] = useState<
    "light" | "dark" | undefined
  >(undefined);
  const [themeSystem, setThemeSystem] = useState<string>("light");
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!("theme" in localStorage)) {
      setThemeSelected(undefined);
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.getElementsByTagName("HTML")[0].setAttribute("class", "dark");
        setThemeSystem("dark");
      } else {
        setThemeSystem("light");
      }
    } else {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("class", localStorage.getItem("theme") || "");
      if (localStorage.getItem("theme") === "dark") {
        setThemeSelected("dark");
      } else if (localStorage.getItem("theme") === "light") {
        setThemeSelected("light");
      }
    }

    if (window.scrollY > 24) setShowBg(true);
    else setShowBg(false);
  }, [themeSelected, pathname]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 24) setShowBg(true);
      else setShowBg(false);
    });
  }

  function changeTheme(theme: "light" | "dark" | undefined) {
    if (theme === undefined) {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.getElementsByTagName("HTML")[0].setAttribute("class", "dark");
      } else {
        document
          .getElementsByTagName("HTML")[0]
          .setAttribute("class", theme ? "" : "sys");
      }
    } else {
      localStorage.setItem("theme", theme);
      document.getElementsByTagName("HTML")[0].setAttribute("class", theme);
    }
    setThemeSelected(theme);
  }

  function closeContactModal() {
    setContactModalIsOpen(false);
  }

  function openContactModal() {
    setContactModalIsOpen(true);
  }

  function scrollTop() {
    animateScroll.scrollToTop();
  }

  return (
    <>
      <nav
        className={`dark:text-custom-dark-text text-custom-light-text mt-1 z-40 sticky top-0 w-full ${
          showBg
            ? "dark:border-b dark:border-b-custom-dark-text/20 shadow-lg shadow-gray-200/50 dark:shadow-custom-dark-bg/50 backdrop-blur bg-custom-light-bg/60 dark:bg-custom-dark-bg/60"
            : "bg-white bg-gradient-to-r from-custom-light-bg to-custom-light-bg/95 dark:bg-gradient-to-r dark:from-custom-dark-bg dark:to-custom-dark-bg/95"
        }`}
      >
        <div className="relative flex flex-row items-center justify-between max-w-5xl px-3 py-3 mx-auto lg:py-2 sm:px-4 lg:px-16 2xl:max-w-6xl">
          <div className="flex items-center">
            <div className="flex items-center md:hidden">
              <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
                <MenuBurger toggle={() => toggleOpen()} />
              </motion.nav>
            </div>
            <div className="z-10 flex items-center px-2 ml-1 lg:px-0 lg:m-0">
              {pathname == "/" ? (
                <motion.a
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollTop}
                  className="relative flex items-center w-10 h-10 cursor-pointer lg:h-11 lg:w-11"
                >
                  <Image
                    src={
                      themeSelected === "dark"
                        ? logo_blanco
                        : themeSelected === "light"
                        ? logo
                        : themeSystem === "dark"
                        ? logo_blanco
                        : logo
                    }
                    alt="logo"
                    className="z-20 object-scale-down"
                  />
                </motion.a>
              ) : (
                <Link
                  href="/"
                  className="relative flex items-center w-10 h-10 cursor-pointer lg:h-11 lg:w-11"
                >
                  <Image
                    src={
                      themeSelected === "dark"
                        ? logo_blanco
                        : themeSelected === "light"
                        ? logo
                        : themeSystem === "dark"
                        ? logo_blanco
                        : logo
                    }
                    alt="logo"
                    className="z-20 object-scale-down"
                  />
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <ul className="top-0 left-0 z-0 flex flex-row items-center justify-center w-full h-full font-medium md:space-x-2 lg:space-x-4 dark:font-normal">
              {pathname == "/" ? <ListHome /> : <ListOtherPages />}
              <motion.li whileTap={{ scale: 0.9 }}>
                <Link
                  href="/classes"
                  className="px-3 py-2 text-base rounded-lg cursor-pointer hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5 relative"
                >
                  Clases
                  <Badge
                    variant="destructive"
                    className="absolute -top-[0.315rem] -right-4 text-2xs px-1.5 border-none"
                  >
                    Nuevo
                  </Badge>
                </Link>
              </motion.li>
            </ul>
          </div>
          <div className="flex flex-row items-center space-x-1 sm:space-x-2 lg:space-x-3">
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
            transition={{ type: "spring" }}
            animate={{
              opacity: isOpen ? 1 : 0,
              visibility: isOpen ? "visible" : "hidden",
            }}
            className="absolute w-full font-medium text-custom-light-text bg-custom-light-bg shadow-xl md:hidden dark:text-custom-dark-text dark:bg-custom-dark-bg shadow-gray-200/50 dark:shadow-custom-dark-bg/50"
          >
            <div className="px-2.5 sm:px-4 py-3 space-y-1.5">
              {pathname == "/" ? (
                <ListHomeMobile toggleOpen={toggleOpen} />
              ) : (
                <ListOtherPagesMobile toggleOpen={toggleOpen} />
              )}
              <Link
                onClick={() => toggleOpen()}
                href="/classes"
                className="block cursor-pointer rounded-xl focus:bg-custom-light-bg dark:focus:bg-custom-dark-bg tracking-wide text-sm px-3 py-1.5"
              >
                Clases
                <Badge
                  variant="destructive"
                  className="ml-2 text-2xs px-1.5 border-none"
                >
                  Nuevo
                </Badge>
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
}

function ListHome() {
  return (
    <>
      <motion.li whileTap={{ scale: 0.9 }}>
        <LinkReactScroll
          to="projects"
          smooth={true}
          duration={500}
          className="px-3 py-2 text-base rounded-lg cursor-pointer hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5"
        >
          Experiencia
        </LinkReactScroll>
      </motion.li>
      <motion.li whileTap={{ scale: 0.9 }}>
        <LinkReactScroll
          to="about"
          smooth={true}
          duration={500}
          className="px-3 py-2 text-base rounded-lg cursor-pointer hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5"
        >
          Sobre mí
        </LinkReactScroll>
      </motion.li>
      <motion.li whileTap={{ scale: 0.9 }}>
        <LinkReactScroll
          to="skills"
          smooth={true}
          duration={500}
          className="px-3 py-2 text-base rounded-lg cursor-pointer hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5"
        >
          Habilidades
        </LinkReactScroll>
      </motion.li>
    </>
  );
}

function ListHomeMobile({ toggleOpen }: { toggleOpen: Cycle }) {
  return (
    <>
      <LinkReactScroll
        onClick={() => toggleOpen()}
        to="projects"
        smooth={true}
        duration={500}
        className="block cursor-pointer rounded-xl focus:bg-custom-light-bg dark:focus:bg-custom-dark-bg tracking-wide text-sm px-3 py-1.5"
      >
        Experiencia
      </LinkReactScroll>
      <LinkReactScroll
        onClick={() => toggleOpen()}
        to="about"
        smooth={true}
        duration={500}
        className="block cursor-pointer rounded-xl focus:bg-custom-light-bg dark:focus:bg-custom-dark-bg tracking-wide text-sm px-3 py-1.5"
      >
        Sobre mí
      </LinkReactScroll>
      <LinkReactScroll
        onClick={() => toggleOpen()}
        to="skills"
        smooth={true}
        duration={500}
        className="block cursor-pointer rounded-xl focus:bg-custom-light-bg dark:focus:bg-custom-dark-bg tracking-wide text-sm px-3 py-1.5"
      >
        Habilidades
      </LinkReactScroll>
    </>
  );
}

function ListOtherPages() {
  return (
    <>
      <motion.li whileTap={{ scale: 0.9 }}>
        <Link href="/#projects" legacyBehavior>
          <a className="px-3 py-2 text-base rounded-lg cursor-pointer hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5">
            Experiencia
          </a>
        </Link>
      </motion.li>
      <motion.li whileTap={{ scale: 0.9 }}>
        <Link href="/#about" legacyBehavior>
          <a className="px-3 py-2 text-base rounded-lg cursor-pointer hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5">
            Sobre mí
          </a>
        </Link>
      </motion.li>
      <motion.li whileTap={{ scale: 0.9 }}>
        <Link href="/#skills" legacyBehavior>
          <a className="px-3 py-2 text-base rounded-lg cursor-pointer hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5">
            Habilidades
          </a>
        </Link>
      </motion.li>
    </>
  );
}

function ListOtherPagesMobile({ toggleOpen }: { toggleOpen: Cycle }) {
  return (
    <>
      <Link
        onClick={() => toggleOpen()}
        href="/#projects"
        className="block cursor-pointer rounded-xl focus:bg-custom-light-bg dark:focus:bg-custom-dark-bg tracking-wide text-sm px-3 py-1.5"
      >
        Experiencia
      </Link>
      <Link
        onClick={() => toggleOpen()}
        href="/#about"
        className="block cursor-pointer rounded-xl focus:bg-custom-light-bg dark:focus:bg-custom-dark-bg tracking-wide text-sm px-3 py-1.5"
      >
        Sobre mí
      </Link>
      <Link
        onClick={() => toggleOpen()}
        href="/#skills"
        className="block cursor-pointer rounded-xl focus:bg-custom-light-bg dark:focus:bg-custom-dark-bg tracking-wide text-sm px-3 py-1.5"
      >
        Habilidades
      </Link>
    </>
  );
}

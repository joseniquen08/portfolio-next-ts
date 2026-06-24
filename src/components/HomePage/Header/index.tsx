"use client";

import Image from "next/image";
import perfil from "@public/images/perfil.png";
import { LinkSocialNetwork } from "./LinkSocialNetwork";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StatusLine } from "./StatusLine";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

export function Header() {
  const prefersReduced = useReducedMotion();
  const anim = (delay: number) =>
    prefersReduced ? {} : fadeUp(delay);

  return (
    <div className="w-full">
      {/* Hero two-column layout */}
      <div className="flex flex-col-reverse w-full max-w-5xl px-4 pt-12 mx-auto space-y-8 space-y-reverse lg:space-y-0 lg:flex-row lg:px-16 lg:pt-28 lg:pb-10 2xl:max-w-6xl">
        {/* Left: text */}
        <div className="flex flex-col justify-center flex-none space-y-10">
          <div className="flex flex-col lg:items-start items-center justify-center space-y-2 lg:space-y-3 text-center lg:text-left">
            <motion.p
              className="font-mono text-xs tracking-widest uppercase text-custom-light-accent/60 dark:text-custom-dark-accent-text/60"
              {...anim(0.05)}
            >
              software_engineer
            </motion.p>
            <motion.p
              className="font-display py-1 text-4xl xs:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-transparent break-words bg-clip-text bg-gradient-to-r from-custom-light-accent via-custom-light-primary to-custom-light-accent dark:from-custom-dark-accent-text dark:via-custom-dark-primary dark:to-custom-dark-accent-text"
              {...anim(0.15)}
            >
              José Ñiquen
            </motion.p>
            <motion.p
              className="font-display text-2xl font-semibold tracking-tight break-words lg:text-3xl text-custom-light-text dark:text-custom-dark-text"
              {...anim(0.25)}
            >
              Software Engineer & Instructor
            </motion.p>
          </div>
          <motion.div
            className="flex justify-center pl-1 space-x-5 text-lg lg:space-x-7 lg:justify-start dark:text-custom-dark-text text-custom-light-text"
            {...anim(0.35)}
          >
            <LinkSocialNetwork href="https://github.com/joseniquen08">
              <SiGithub className="h-7 w-7" />
            </LinkSocialNetwork>
            <LinkSocialNetwork href="https://www.linkedin.com/in/jose-niquen">
              <FaLinkedin className="h-7 w-7" />
            </LinkSocialNetwork>
            <LinkSocialNetwork href="https://www.instagram.com/joseniquen_">
              <SiInstagram className="h-7 w-7" />
            </LinkSocialNetwork>
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-start gap-3"
            {...anim(0.45)}
          >
            <Button variant="brand" size="lg" className="text-lg font-semibold" asChild>
              <Link href="/classes">Agenda una clase</Link>
            </Button>
            <Button variant="brandOutline" size="lg" className="text-lg" asChild>
              <Link href="/#projects">Mi experiencia</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: portrait with duotono rings */}
        <motion.div
          className="flex justify-center w-full lg:justify-end"
          {...anim(0.1)}
        >
          <div className="flex flex-col items-center">
            {/* Duotono portrait frame */}
            <div className="relative w-60 h-60 lg:w-72 lg:h-72">
              {/* Lime ring — offset top-left */}
              <div className="absolute inset-0 rounded-full border-2 border-custom-light-primary dark:border-custom-dark-primary opacity-60 -translate-x-2 -translate-y-2" />
              {/* Purple ring — offset bottom-right */}
              <div className="absolute inset-0 rounded-full border-2 border-custom-light-accent dark:border-custom-dark-accent-text opacity-40 translate-x-2 translate-y-2" />
              {/* Portrait */}
              <Image
                src={perfil}
                priority
                alt="Perfil"
                className="absolute inset-0 z-10 w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status line — spans full width */}
      <motion.div
        className="pb-8 lg:pb-12"
        {...anim(0.55)}
      >
        <StatusLine />
      </motion.div>
    </div>
  );
}

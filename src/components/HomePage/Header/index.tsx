"use client";

import Image from "next/image";
import perfil from "@public/images/perfil.png";
import { LinkSocialNetwork } from "./LinkSocialNetwork";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex flex-col-reverse w-full max-w-5xl px-4 pt-12 mx-auto space-y-8 space-y-reverse lg:space-y-0 lg:flex-row lg:px-16 lg:pt-28 lg:pb-16 2xl:max-w-6xl">
      <div className="flex flex-col justify-center flex-none space-y-10">
        <div className="flex flex-col lg:items-start items-center justify-center space-y-1 lg:space-y-2.5 text-center lg:text-left">
          <p className="text-2xl xs:text-3xl font-semibold lg:text-4xl dark:text-custom-dark-text text-custom-light-text">
            ¡Bienvenid@!
          </p>
          <p className="py-1 text-4xl xs:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-transparent break-words bg-clip-text bg-gradient-to-r from-custom-light-accent via-custom-light-primary to-custom-light-accent dark:from-custom-dark-accent dark:via-custom-dark-primary dark:to-custom-dark-accent">
            Soy José Ñiquen
          </p>
          <p className="text-3xl font-semibold tracking-tight break-words lg:text-4xl text-custom-light-text dark:text-custom-dark-text">
            FullStack Developer
          </p>
        </div>
        <div className="flex justify-center pl-1 space-x-5 text-lg lg:space-x-7 lg:justify-start dark:text-custom-dark-text text-custom-light-text">
          <LinkSocialNetwork href="https://github.com/joseniquen08">
            <SiGithub className="h-7 w-7" />
          </LinkSocialNetwork>
          <LinkSocialNetwork href="https://www.linkedin.com/in/jose-niquen">
            <SiLinkedin className="h-7 w-7" />
          </LinkSocialNetwork>
          <LinkSocialNetwork href="https://www.instagram.com/joseniquen_">
            <SiInstagram className="h-7 w-7" />
          </LinkSocialNetwork>
        </div>
        <div className="flex justify-center lg:justify-start">
          <Button variant="destructive" size="lg" className="text-lg" asChild>
            <Link href="/classes">Agenda una clase conmigo</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center w-full lg:justify-end">
        <div className="flex flex-col items-center space-y-6 lg:space-y-0">
          <div className="w-60 lg:w-72">
            <div className="relative h-60 w-60 lg:w-72 lg:h-72">
              <Image
                src={perfil}
                priority
                alt="Perfil"
                className="absolute z-20 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

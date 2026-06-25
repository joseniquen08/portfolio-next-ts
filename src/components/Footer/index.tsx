import { SiGithub, SiInstagram, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { LinkSocialNetwork } from "./LinkSocialNetwork";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-custom-light-text dark:text-custom-dark-text">
      <div className="max-w-5xl px-4 pt-6 pb-10 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl">
        <div className="font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-2.5 rounded-lg border border-custom-light-primary/20 dark:border-custom-dark-accent-text/20 bg-custom-light-primary/5 dark:bg-custom-dark-accent-text/5 text-custom-light-text/60 dark:text-custom-dark-text/60">
          {/* Left: built with */}
          <span className="flex items-center gap-1.5">
            <span className="opacity-60">Hecho con</span>
            <SiNextdotjs className="w-3.5 h-3.5" />
            <span className="opacity-40">+</span>
            <SiTailwindcss className="w-3.5 h-3.5" />
          </span>

          {/* Center: copyright */}
          <span className="flex flex-col items-center gap-0.5 text-center">
            <span>© {year} José Ñiquen.</span>
            <span className="opacity-50 text-[10px]">
              gracias de ❤️{" "}
              <span className="text-custom-light-text/70 dark:text-custom-dark-text/70 font-semibold">
                Rosse Villegas
              </span>
            </span>
          </span>

          {/* Right: social icons */}
          <span className="flex items-center gap-2">
            <LinkSocialNetwork href="https://github.com/joseniquen08">
              <SiGithub className="w-4 h-4" />
            </LinkSocialNetwork>
            <LinkSocialNetwork href="https://www.linkedin.com/in/jose-niquen">
              <FaLinkedin className="w-4 h-4" />
            </LinkSocialNetwork>
            <LinkSocialNetwork href="https://www.instagram.com/joseniquen_">
              <SiInstagram className="w-4 h-4" />
            </LinkSocialNetwork>
          </span>
        </div>
      </div>
    </footer>
  );
};

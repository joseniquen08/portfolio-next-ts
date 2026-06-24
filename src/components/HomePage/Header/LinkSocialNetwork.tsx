import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export const LinkSocialNetwork = ({ href, children }: Props) => {
  return (
    <motion.div whileHover="hover" className="relative w-14 h-14 group">
      <motion.div
        className="w-14 h-14 bg-custom-light-text/5 dark:bg-custom-dark-text/5 rounded-xl group-hover:bg-custom-light-text/10 dark:group-hover:bg-custom-dark-text/10"
        transition={{
          ease: "easeInOut",
          duration: 0.65,
        }}
        variants={{
          hover: {
            rotate: 180,
            scale: 1.15,
          },
        }}
      ></motion.div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 flex items-center justify-center w-14 h-14"
      >
        {children}
      </a>
    </motion.div>
  );
};

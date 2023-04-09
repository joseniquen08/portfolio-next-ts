import { motion } from 'framer-motion';

interface Props {
  href: string;
  children: JSX.Element;
}

export const LinkSocialNetwork = ({ href, children }: Props) => {
  return (
    <motion.div whileHover="hover" className="relative w-14 h-14 group">
      <motion.div
        className="w-14 h-14 bg-slate-900 bg-opacity-5 dark:bg-white dark:bg-opacity-5 rounded-xl group-hover:bg-opacity-10"
        transition={{
          ease: 'easeInOut',
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

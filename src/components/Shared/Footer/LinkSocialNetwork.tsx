import { motion } from 'framer-motion';

interface Props {
  href: string;
  children: JSX.Element;
}

export const LinkSocialNetwork = ({ href, children }: Props) => {
  return (
    <motion.div whileHover="hover" className="relative w-11 h-11 group">
      <motion.div
        className="w-11 h-11 group-hover:bg-custom-ligth-text group-hover:bg-opacity-5 rounded-xl dark:group-hover:bg-custom-dark-text dark:group-hover:bg-opacity-5"
        transition={{
          ease: 'easeInOut',
          duration: 0.65,
        }}
        variants={{
          hover: {
            rotate: 180,
          },
        }}
      ></motion.div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 flex items-center justify-center w-11 h-11"
      >
        {children}
      </a>
    </motion.div>
  );
};

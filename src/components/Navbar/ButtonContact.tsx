import { motion } from "framer-motion";

interface Props {
  openContactModal: () => void;
}

export const ButtonContact = ({ openContactModal }: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={openContactModal}
      type="button"
      className="border border-custom-light-accent/40 dark:border-custom-dark-accent-text/40 text-sm md:text-base lg:text-base text-custom-light-accent dark:text-custom-dark-accent-text hover:bg-custom-light-accent/5 dark:hover:bg-custom-dark-accent-text/5 font-normal focus:outline-none py-1.5 w-24 lg:w-28 rounded-lg relative transition-colors duration-200"
    >
      Contacto
      <span className="absolute flex w-3 h-3 -top-1 -right-1">
        <span className="absolute inline-flex w-full h-full bg-custom-light-primary dark:bg-custom-dark-primary rounded-full opacity-75 animate-ping"></span>
        <span className="relative inline-flex w-3 h-3 bg-custom-light-primary dark:bg-custom-dark-primary rounded-full"></span>
      </span>
    </motion.button>
  );
};

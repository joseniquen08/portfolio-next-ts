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
      className="bg-custom-light-accent dark:bg-custom-dark-accent shadow-lg text-sm md:text-base lg:text-base shadow-custom-light-accent/50 dark:shadow-custom-dark-accent/50 text-custom-dark-text hover:bg-opacity-90 dark:bg-opacity-100 font-normal focus:outline-none dark:hover:bg-opacity-90 py-1.5 w-24 lg:w-28 rounded-lg relative"
    >
      Contacto
      <span className="absolute flex w-3 h-3 -top-1 -right-1">
        <span className="absolute inline-flex w-full h-full bg-custom-light-primary dark:bg-custom-dark-text rounded-full opacity-75 animate-ping"></span>
        <span className="relative inline-flex w-3 h-3 bg-custom-light-primary dark:bg-custom-dark-text rounded-full"></span>
      </span>
    </motion.button>
  );
};

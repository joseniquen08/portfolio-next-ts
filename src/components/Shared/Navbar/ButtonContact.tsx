import en from '@public/locales/en/navbar';
import es from '@public/locales/es/navbar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface Props {
  openContactModal: () => void;
}

export const ButtonContact = ({ openContactModal }: Props) => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={openContactModal}
      type="button"
      className="bg-custom-primary shadow-lg text-sm md:text-base lg:text-lg shadow-custom-primary/50 text-custom-text hover:bg-opacity-90 dark:bg-opacity-100 font-normal focus:outline-none dark:hover:bg-opacity-90 py-1.5 w-24 lg:w-32 rounded-lg relative"
    >
      {t.button.contact}
      <span className="absolute flex w-3 h-3 -top-1 -right-1">
        <span className="absolute inline-flex w-full h-full bg-custom-text rounded-full opacity-75 animate-ping"></span>
        <span className="relative inline-flex w-3 h-3 bg-custom-text rounded-full"></span>
      </span>
    </motion.button>
  );
};

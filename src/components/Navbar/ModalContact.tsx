"use client";

import { Dialog, DialogBackdrop, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { HiOutlineX } from "react-icons/hi";
import { SiGithub, SiInstagram, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

interface Props {
  theme: "light" | "dark" | undefined;
  contactModalIsOpen: boolean;
  closeContactModal: () => void;
}

const SOCIAL_LINKS = [
  {
    href: "https://api.whatsapp.com/send?phone=51933839178",
    icon: SiWhatsapp,
    label: "WhatsApp",
  },
  {
    href: "https://github.com/joseniquen08",
    icon: SiGithub,
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/joseniquen_",
    icon: SiInstagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/jose-niquen",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
];

export const ModalContact = ({
  theme,
  contactModalIsOpen,
  closeContactModal,
}: Props) => {
  return (
    <Transition appear show={contactModalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 font-sans"
        onClose={closeContactModal}
      >
        <div className="min-h-screen px-2.5 text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0" />
          </TransitionChild>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-xl border border-custom-light-primary/20 dark:border-custom-dark-accent-text/20">
              <div className="px-6 pt-8 pb-8 space-y-6 bg-gradient-to-r from-custom-light-bg to-custom-light-bg/95 dark:bg-gradient-to-r dark:from-custom-dark-bg dark:to-custom-dark-bg/95">
                {/* Close button */}
                <button
                  onClick={closeContactModal}
                  className="absolute top-4 right-4 text-custom-light-text/40 dark:text-custom-dark-text/40 hover:text-custom-light-text dark:hover:text-custom-dark-text transition-colors"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="space-y-3">
                  <DialogTitle
                    as="h3"
                    className="font-display text-2xl font-bold leading-tight tracking-tight text-custom-light-accent dark:text-custom-dark-text"
                  >
                    Contáctame
                  </DialogTitle>
                  <p className="text-base text-custom-light-text/50 dark:text-custom-dark-text/60 leading-relaxed">
                    ¿Tienes un proyecto en mente o una pregunta? Encuéntrame en mis redes.
                  </p>
                </div>

                {/* Social links — 4 columns */}
                <ul className="grid grid-cols-4 gap-3">
                  {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                    <li key={label}>
                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="flex flex-col items-center gap-2 px-3 py-3 rounded-lg border border-custom-light-text/10 dark:border-custom-dark-text/10 text-custom-light-text/60 dark:text-custom-dark-text/60 hover:text-custom-light-accent dark:hover:text-custom-dark-accent-text hover:border-custom-light-accent/30 dark:hover:border-custom-dark-accent-text/30 transition-colors duration-200"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{label}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

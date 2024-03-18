import emailjs from "@emailjs/browser";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { ChangeEvent, FormEvent, Fragment, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { HiCheckCircle, HiOutlineX } from "react-icons/hi";
import {
  SiInstagram,
  SiLinkedin,
  SiTelegram,
  SiWhatsapp,
} from "react-icons/si";
import { useTimeoutFn } from "react-use";
import { ButtonLoading } from "./ButtonLoading";

interface Props {
  theme: "light" | "dark" | undefined;
  contactModalIsOpen: boolean;
  closeContactModal: () => void;
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: false,
});

export const ModalContact = ({
  theme,
  contactModalIsOpen,
  closeContactModal,
}: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [checkedReCaptcha, setCheckedReCaptcha] = useState(false);
  const [errorReCaptcha, setErrorReCaptcha] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [contact, setContact] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [, , resetIsShowing] = useTimeoutFn(() => setSendSuccess(false), 3000);

  const { user_name, user_email, message } = contact;

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContact({
      ...contact,
      [target.name]: target.value,
    });
  };

  const handleCheck = () => {
    setCheckedReCaptcha(true);
    setErrorReCaptcha(false);
  };

  const changeDisabled = () => {
    setCheckedReCaptcha(false);
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendLoading(true);

    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_SERVICE_ID_EMAIL}`,
        `${process.env.NEXT_PUBLIC_TEMPLATE_ID_EMAIL}`,
        form.current || "",
        `${process.env.NEXT_PUBLIC_USER_ID_EMAIL}`
      )
      .then(
        (result: any) => {
          if (result.text === "OK") {
            setSendLoading(false);
            setSendSuccess(true);
            setContact({ user_name: "", user_email: "", message: "" });
            recaptchaRef?.current?.reset();
            setCheckedReCaptcha(false);
            resetIsShowing();
          }
        },
        (error: any) => {
          setSendLoading(false);
          setCheckedReCaptcha(false);
          if (
            error.text ===
            "reCAPTCHA: The g-recaptcha-response parameter not found"
          ) {
            setErrorReCaptcha(true);
          }
        }
      );
  };

  return (
    <Transition appear show={contactModalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-50 overflow-y-auto bg-black/80 ${poppins.className} font-poppins`}
        onClose={closeContactModal}
      >
        <div className="min-h-screen px-2.5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-5xl overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-xl border border-custom-light-primary dark:border-custom-dark-primary">
              <div className="px-6 pt-8 pb-6 space-y-3 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-8 md:px-8 md:pt-10 md:pb-10 bg-gradient-to-r from-custom-light-bg to-custom-light-bg/95 dark:bg-gradient-to-r dark:from-custom-dark-bg dark:to-custom-dark-bg/95">
                <div className="space-y-4 md:col-span-1 md:space-y-5 md:px-3">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold leading-6 tracking-tight text-custom-light-primary md:text-5xl dark:text-custom-dark-text"
                  >
                    Contáctame
                  </Dialog.Title>
                  <div>
                    <p className="text-base font-medium text-justify text-custom-light-text/50 dark:text-custom-dark-text/60 md:text-lg">
                      Me interesan los retos que pongan a prueba mis
                      habilidades. Si necesitas que te realice algún trabajo o
                      simplemente tienes una pregunta, no dudes en contactarme.
                    </p>
                  </div>
                  <ul className="flex space-x-3">
                    <li>
                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href="https://api.whatsapp.com/send?phone=51933839178"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#25D366] bg-opacity-100 dark:bg-opacity-30 dark:hover:bg-opacity-40 hover:bg-opacity-90 text-custom-dark-text"
                      >
                        <SiWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
                      </motion.a>
                    </li>
                    <li>
                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href="https://api.whatsapp.com/send?phone=51933839178"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#26A5E4] bg-opacity-100 dark:bg-opacity-30 dark:hover:bg-opacity-40 hover:bg-opacity-90 text-custom-dark-text"
                      >
                        <SiTelegram className="w-6 h-6 md:w-7 md:h-7" />
                      </motion.a>
                    </li>
                    <li>
                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href="https://api.whatsapp.com/send?phone=51933839178"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#E4405F] bg-opacity-100 dark:bg-opacity-30 dark:hover:bg-opacity-40 hover:bg-opacity-90 text-custom-dark-text"
                      >
                        <SiInstagram className="w-6 h-6 md:w-7 md:h-7" />
                      </motion.a>
                    </li>
                    <li>
                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href="https://api.whatsapp.com/send?phone=51933839178"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#0A66C2] bg-opacity-100 dark:bg-opacity-30 dark:hover:bg-opacity-40 hover:bg-opacity-90 text-custom-dark-text"
                      >
                        <SiLinkedin className="w-6 h-6 md:w-7 md:h-7" />
                      </motion.a>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-1 md:px-3">
                  <div className="mt-3.5 bg-custom-light-primary/10 dark:bg-custom-dark-primary/10 px-5 md:px-6 py-6 rounded-2xl">
                    <div className="relative h-104 md:h-108">
                      <Transition
                        as={Fragment}
                        show={sendSuccess}
                        enter="transform transition duration-[400ms]"
                        enterFrom="opacity-0 rotate-[-120deg] scale-50"
                        enterTo="opacity-100 rotate-0 scale-100"
                        leave="transform duration-200 transition ease-in-out"
                        leaveFrom="opacity-100 rotate-0 scale-100 "
                        leaveTo="opacity-0 scale-95 "
                      >
                        <div className="absolute inset-0 z-10">
                          <div className="flex flex-col items-center justify-center w-full h-full space-y-3 font-medium text-white rounded-xl to-green-500 from-green-600 bg-gradient-to-r">
                            <HiCheckCircle className="w-16 h-16" />
                            <p className="text-2xl">Mensaje enviado</p>
                          </div>
                        </div>
                      </Transition>
                      <form ref={form} onSubmit={sendEmail}>
                        <div className="space-y-3 text-custom-light-text dark:text-custom-dark-text p-0.5">
                          <div className="space-y-1.5 md:space-y-2">
                            <label
                              htmlFor="user_name"
                              className="block font-medium"
                            >
                              Nombre completo
                            </label>
                            <input
                              type="text"
                              name="user_name"
                              id="user_name"
                              value={user_name}
                              onChange={(e) => handleInputChange(e)}
                              required
                              placeholder="p.ej. Juan García"
                              className="block w-full px-4 py-2 text-sm border rounded-lg placeholder:text-custom-light-text/70 dark:placeholder:text-custom-dark-text/50 border-custom-light-text/10 focus:border-custom-light-text/10 dark:border-custom-dark-secondary/40 dark:bg-gray-900/50 focus:outline-none focus:shadow-lg dark:focus:shadow-custom-dark-secondary/50 focus:ring-0"
                            />
                          </div>
                          <div className="space-y-1.5 md:space-y-2">
                            <label
                              htmlFor="user_email"
                              className="block font-medium"
                            >
                              Correo electrónico
                            </label>
                            <input
                              type="email"
                              name="user_email"
                              id="user_email"
                              value={user_email}
                              onChange={(e) => handleInputChange(e)}
                              required
                              placeholder="p.ej. juan_garcia@gmail.com"
                              className="block w-full px-4 py-2 text-sm border rounded-lg placeholder:text-custom-light-text/70 dark:placeholder:text-custom-dark-text/50 border-custom-light-text/10 focus:border-custom-light-text/10 dark:border-custom-dark-secondary/40 dark:bg-gray-900/50 focus:outline-none focus:shadow-lg dark:focus:shadow-custom-dark-secondary/50 focus:ring-0"
                            />
                          </div>
                          <div className="space-y-1.5 md:space-y-2">
                            <label
                              htmlFor="message"
                              className="block font-medium"
                            >
                              Mensaje
                            </label>
                            <textarea
                              name="message"
                              rows={4}
                              id="message"
                              value={message}
                              required
                              onChange={(e) => handleInputChange(e)}
                              placeholder="Escriba su mensaje aquí"
                              className="block w-full px-4 py-2 text-sm border rounded-lg placeholder:text-custom-light-text/70 dark:placeholder:text-custom-dark-text/50 border-custom-light-text/10 focus:border-custom-light-text/10 dark:border-custom-dark-secondary/40 dark:bg-gray-900/50 focus:outline-none focus:shadow-lg dark:focus:shadow-custom-dark-secondary/50 focus:ring-0"
                            ></textarea>
                          </div>
                          <div className="w-full">
                            {errorReCaptcha ? (
                              <span className="text-sm text-red-500">
                                Selecciona el ReCAPTCHA por favor
                              </span>
                            ) : (
                              <></>
                            )}
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                              size="normal"
                              onChange={handleCheck}
                              onExpired={changeDisabled}
                              theme={theme}
                              hl="es"
                            />
                          </div>
                          <div className="z-0 flex items-center justify-end">
                            {sendLoading ? (
                              <ButtonLoading />
                            ) : (
                              <button
                                type="submit"
                                disabled={checkedReCaptcha ? false : true}
                                className="w-24 text-sm font-medium text-custom-dark-text bg-custom-light-primary dark:bg-custom-dark-primary shadow-lg md:w-28 h-9 disabled:opacity-50 disabled:hover:bg-custom-light-primary dark:disabled:hover:bg-custom-dark-primary md:text-base shadow-custom-light-primary/50 rounded-xl hover:bg-custom-light-primary/90 dark:hover:bg-custom-dark-primary/90 focus:outline-none"
                              >
                                Enviar
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute md:hidden top-6 right-5">
                <button
                  onClick={closeContactModal}
                  type="button"
                  className="focus:outline-none bg-custom-light-text/5 hover:bg-custom-light-text/10 dark:bg-custom-dark-text/10 dark:hover:bg-custom-dark-text/20 text-custom-light-text dark:text-custom-dark-text rounded-full p-1.5"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

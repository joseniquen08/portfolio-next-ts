import emailjs from '@emailjs/browser';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { HiCheckCircle, HiOutlineX } from 'react-icons/hi';
import {
  SiInstagram,
  SiLinkedin,
  SiTelegram,
  SiWhatsapp,
} from 'react-icons/si';
import { useTimeoutFn } from 'react-use';
import en from '../../../../public/locales/en/modal_contact';
import es from '../../../../public/locales/es/modal_contact';
import { ButtonLoading } from './ButtonLoading';

interface Props {
  theme: 'light' | 'dark' | undefined;
  contactModalIsOpen: boolean;
  closeContactModal: () => void;
}

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
    user_name: '',
    user_email: '',
    message: '',
  });
  const { locale } = useRouter();
  const t = locale === 'en' ? en : es;

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
        form.current || '',
        `${process.env.NEXT_PUBLIC_USER_ID_EMAIL}`
      )
      .then(
        (result: any) => {
          if (result.text === 'OK') {
            setSendLoading(false);
            setSendSuccess(true);
            setContact({ user_name: '', user_email: '', message: '' });
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
            'reCAPTCHA: The g-recaptcha-response parameter not found'
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
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-500/50 font-poppins"
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
            <div className="relative inline-block w-full max-w-5xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="px-6 pt-8 pb-6 space-y-3 bg-white md:grid md:grid-cols-2 md:space-y-0 md:gap-x-8 md:px-8 md:pt-10 md:pb-10 bg-gradient-to-r from-gray-50 to-gray-50/95 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-900/95">
                <div className="space-y-4 md:col-span-1 md:space-y-5 md:px-3">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 tracking-tight text-gray-900 md:text-5xl dark:text-white"
                  >
                    {t.title}
                  </Dialog.Title>
                  <div className="">
                    <p className="text-base text-justify text-gray-500 md:text-lg">
                      {t.body}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-1 md:px-3">
                  <Tab.Group>
                    <Tab.List className="flex flex-col sm:flex-row w-full text-sm md:text-base space-y-1.5 md:space-y-0 md:space-x-3 rounded-xl">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full"
                      >
                        <Tab
                          className={({ selected }) =>
                            `w-full py-2.5 leading-5 font-semibold rounded-lg ${
                              selected
                                ? 'bg-blue-700 text-white shadow-lg shadow-blue-600/50'
                                : 'dark:bg-white dark:bg-opacity-5 dark:text-white rounded-xl font-medium bg-gray-200 bg-opacity-70'
                            }`
                          }
                        >
                          {t.types.form}
                        </Tab>
                      </motion.div>
                      <div className="flex items-center justify-center">
                        <p className="font-medium dark:text-white">
                          {t.types.or}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full"
                      >
                        <Tab
                          className={({ selected }) =>
                            `w-full py-2.5 leading-5 font-semibold rounded-lg ${
                              selected
                                ? 'bg-blue-700 text-white shadow-lg shadow-blue-600/50'
                                : 'dark:bg-white dark:bg-opacity-5 dark:text-white rounded-xl font-medium bg-gray-200 bg-opacity-70'
                            }`
                          }
                        >
                          {t.types.buttons}
                        </Tab>
                      </motion.div>
                    </Tab.List>
                    <Tab.Panels className="mt-3.5 bg-gray-200 bg-opacity-50 dark:bg-gray-50 dark:bg-opacity-5 px-5 md:px-6 py-6 rounded-2xl">
                      <Tab.Panel className="relative h-104 md:h-108">
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
                              <p className="text-2xl">
                                {t.form.success_message}
                              </p>
                            </div>
                          </div>
                        </Transition>
                        <form ref={form} onSubmit={sendEmail}>
                          <div className="space-y-3 dark:text-white p-0.5">
                            <div className="space-y-1.5 md:space-y-2">
                              <label
                                htmlFor="user_name"
                                className="block font-medium"
                              >
                                {t.form.full_name.title}
                              </label>
                              <input
                                type="text"
                                name="user_name"
                                id="user_name"
                                value={user_name}
                                onChange={(e) => handleInputChange(e)}
                                required
                                placeholder={t.form.full_name.placeholder}
                                className="block w-full px-4 py-2 text-sm border rounded-lg placeholder:text-gray-500 border-gray-300/70 dark:border-transparent dark:bg-gray-900/50 dark:text-white focus:outline-none focus:border-transparent focus:shadow-lg focus:shadow-blue-600/50 focus:ring-blue-500 focus:ring-1"
                              />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                              <label
                                htmlFor="user_email"
                                className="block font-medium"
                              >
                                {t.form.email.title}
                              </label>
                              <input
                                type="email"
                                name="user_email"
                                id="user_email"
                                value={user_email}
                                onChange={(e) => handleInputChange(e)}
                                required
                                placeholder={t.form.email.placeholder}
                                className="block w-full px-4 py-2 text-sm border rounded-lg placeholder:text-gray-500 border-gray-300/70 dark:border-transparent dark:placeholder-gray-500 dark:bg-gray-900/50 dark:text-white focus:outline-none focus:border-transparent focus:shadow-lg focus:shadow-blue-600/50 focus:ring-blue-500 focus:ring-1"
                              />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                              <label
                                htmlFor="message"
                                className="block font-medium"
                              >
                                {t.form.message.title}
                              </label>
                              <textarea
                                name="message"
                                rows={3}
                                id="message"
                                value={message}
                                required
                                onChange={(e) => handleInputChange(e)}
                                placeholder={t.form.message.placeholder}
                                className="block w-full px-4 py-2 text-sm border rounded-lg resize-none placeholder:text-gray-500 border-gray-300/70 dark:border-transparent dark:placeholder-gray-500 dark:bg-gray-900/50 dark:text-white focus:outline-none focus:border-transparent focus:shadow-lg focus:shadow-blue-600/50 focus:ring-blue-500 focus:ring-1"
                              ></textarea>
                            </div>
                            <div className="w-full">
                              {errorReCaptcha ? (
                                <span className="text-sm text-red-500">
                                  {t.form.error_recaptcha}
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
                                hl={locale}
                              />
                            </div>
                            <div className="z-0 flex items-center justify-end">
                              {sendLoading ? (
                                <ButtonLoading />
                              ) : (
                                <button
                                  type="submit"
                                  disabled={checkedReCaptcha ? false : true}
                                  className="w-24 text-sm font-medium text-white bg-blue-600 shadow-lg md:w-28 h-9 disabled:opacity-50 disabled:hover:bg-blue-600 md:text-base shadow-blue-600/50 rounded-xl hover:bg-blue-700 focus:outline-none"
                                >
                                  {t.button}
                                </button>
                              )}
                            </div>
                          </div>
                        </form>
                      </Tab.Panel>
                      <Tab.Panel className="h-104 md:h-108">
                        <div className="flex flex-col justify-center w-full h-full space-y-6 font-medium text-white md:text-lg">
                          <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://api.whatsapp.com/send?phone=51933839178"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center py-2.5 space-x-2 w-full rounded-xl [background-color:#25D366] shadow-lg shadow-[#25D366]/50"
                          >
                            <SiWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
                            <p>Whatsapp</p>
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://t.me/joseniquen"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center py-2.5 space-x-2 w-full rounded-xl [background-color:#26A5E4] shadow-lg shadow-[#26A5E4]/50"
                          >
                            <SiTelegram className="w-6 h-6 md:w-7 md:h-7" />
                            <p>Telegram</p>
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://www.instagram.com/jose.niquen/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center py-2.5 space-x-2 w-full rounded-xl [background-color:#E4405F] shadow-lg shadow-[#E4405F]/50"
                          >
                            <SiInstagram className="w-6 h-6 md:w-7 md:h-7" />
                            <p>Instagram</p>
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://www.linkedin.com/in/jose-niquen/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center py-2.5 space-x-2 w-full rounded-xl [background-color:#0A66C2] shadow-lg shadow-[#0A66C2]/50"
                          >
                            <SiLinkedin className="w-6 h-6 md:w-7 md:h-7" />
                            <p>LinkedIn</p>
                          </motion.a>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
              <div className="absolute md:hidden top-6 right-5">
                <button
                  onClick={closeContactModal}
                  type="button"
                  className="focus:outline-none bg-gray-200/80 dark:bg-slate-700 dark:text-white rounded-full p-1.5"
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

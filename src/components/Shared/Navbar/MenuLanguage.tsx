import { Menu, RadioGroup, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { HiCheckCircle, HiOutlineTranslate } from 'react-icons/hi';

export const MenuLanguage = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLng = (e: string) => {
    router.push(router.asPath, router.asPath, { locale: e, scroll: false });
  };

  return (
    <Menu as="section" className="relative">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Menu.Button className="flex items-center justify-center py-1.5 lg:py-2 px-2 sm:px-3 font-medium text-stone-700 dark:text-white lg:text-lg space-x-1 lg:space-x-1.5 focus:outline-none hover:bg-gray-100 dark:hover:bg-white dark:hover:bg-opacity-5 rounded-xl">
          <HiOutlineTranslate className="w-5 h-5 lg:w-6 lg:h-6" />
          <p>{locale}</p>
        </Menu.Button>
      </motion.div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white rounded-lg shadow-lg focus:outline-none dark:bg-slate-900">
          <div className="bg-white border rounded-lg bg-opacity-10 dark:border-transparent">
            <div className="px-2.5 py-2">
              <Menu.Item as="div">
                <RadioGroup value={locale} onChange={changeLng}>
                  <div className="space-y-1.5 text-sm lg:text-base">
                    <RadioGroup.Option value="en">
                      {({ checked }) => (
                        <button
                          type="button"
                          className={`${
                            checked
                              ? 'bg-blue-600 text-white font-medium'
                              : 'hover:bg-gray-200/60 dark:hover:bg-white dark:hover:bg-opacity-10'
                          } px-3 py-1.5 lg:py-1 focus:outline-none rounded-lg flex items-center justify-center space-x-1`}
                        >
                          <p>en</p>
                          <div
                            className={`${
                              checked ? 'text-white' : 'text-transparent'
                            }`}
                          >
                            <HiCheckCircle className="w-5 h-5" />
                          </div>
                        </button>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="es">
                      {({ checked }) => (
                        <button
                          type="button"
                          className={`${
                            checked
                              ? 'bg-blue-600 text-white font-medium'
                              : 'hover:bg-gray-200/60 dark:hover:bg-white dark:hover:bg-opacity-10'
                          } px-3 py-1.5 lg:py-1 focus:outline-none rounded-lg flex items-center justify-center space-x-1`}
                        >
                          <p>es</p>
                          <div
                            className={`${
                              checked ? 'text-white' : 'text-transparent'
                            }`}
                          >
                            <HiCheckCircle className="w-5 h-5" />
                          </div>
                        </button>
                      )}
                    </RadioGroup.Option>
                  </div>
                </RadioGroup>
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

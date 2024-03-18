import { Menu, RadioGroup, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import {
  HiOutlineDesktopComputer,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";

interface Props {
  themeSelected: "light" | "dark" | undefined;
  setThemeSelected: Dispatch<SetStateAction<"light" | "dark" | undefined>>;
  themeSystem: string;
  changeTheme: (theme: "light" | "dark" | undefined) => void;
}

export const MenuTheme = ({
  themeSelected,
  setThemeSelected,
  themeSystem,
  changeTheme,
}: Props) => {
  const [themeInLocalStorage, setThemeInLocalStorage] = useState(false);

  useEffect(() => {
    if ("theme" in localStorage) {
      setThemeInLocalStorage(true);
    } else {
      setThemeInLocalStorage(false);
    }
  }, [themeSelected]);

  return (
    <Menu as="section" className="relative sm:mr-1">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Menu.Button className="flex items-center justify-center p-1.5 lg:p-2 text-4xl hover:bg-custom-light-primary dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-5 rounded-xl focus:outline-none">
          {themeInLocalStorage ? (
            themeSelected === "dark" ? (
              <HiOutlineMoon className="w-6 h-6 text-custom-light-primary dark:text-custom-dark-primary" />
            ) : (
              <HiOutlineSun className="w-6 h-6 text-yellow-500" />
            )
          ) : themeSystem === "dark" ? (
            <HiOutlineMoon className="w-6 h-6 text-custom-light-text dark:text-custom-dark-text" />
          ) : (
            <HiOutlineSun className="w-6 h-6 text-custom-light-text dark:text-custom-dark-text" />
          )}
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
        <Menu.Items className="absolute right-0 z-40 mt-2 origin-top-right bg-custom-light-bg rounded-lg shadow-lg focus:outline-none dark:bg-custom-dark-bg">
          <div className="bg-custom-light-bg dark:bg-custom-dark-bg border rounded-lg bg-opacity-10 dark:border-transparent">
            <div className="px-2.5 py-2">
              <Menu.Item as="div" className="focus:outline-none">
                <RadioGroup value={themeSelected} onChange={setThemeSelected}>
                  <div className="space-y-1.5 text-sm lg:text-base">
                    <RadioGroup.Option value="light">
                      {({ checked }) => (
                        <button
                          type="button"
                          onClick={() => changeTheme("light")}
                          className={`${
                            checked
                              ? "bg-custom-light-primary dark:bg-custom-dark-primary text-custom-light-text font-medium"
                              : "hover:bg-custom-light-text/5 dark:hover:bg-custom-dark-text dark:hover:bg-opacity-10"
                          } w-full px-3 py-2 lg:py-1 focus:outline-none rounded-lg flex items-center justify-start space-x-2`}
                        >
                          <div
                            className={`${
                              checked
                                ? "text-custom-light-text"
                                : "text-custom-light-text dark:text-custom-dark-text"
                            }`}
                          >
                            <HiOutlineSun className="w-5 h-5" />
                          </div>
                          <p>Claro</p>
                        </button>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="dark">
                      {({ checked }) => (
                        <button
                          type="button"
                          onClick={() => changeTheme("dark")}
                          className={`${
                            checked
                              ? "bg-custom-light-primary dark:bg-custom-dark-primary text-custom-light-text font-medium"
                              : "hover:bg-custom-light-text/5 dark:hover:bg-custom-dark-text dark:hover:bg-opacity-10"
                          } w-full px-3 py-2 lg:py-1 focus:outline-none rounded-lg flex items-center justify-start space-x-2`}
                        >
                          <div
                            className={`${
                              checked
                                ? "text-custom-light-text"
                                : "text-custom-light-text dark:text-custom-dark-text"
                            }`}
                          >
                            <HiOutlineMoon className="w-5 h-5" />
                          </div>
                          <p>Oscuro</p>
                        </button>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value={undefined}>
                      {({ checked }) => (
                        <button
                          type="button"
                          onClick={() => changeTheme(undefined)}
                          className={`${
                            checked
                              ? "bg-custom-light-primary dark:bg-custom-dark-primary text-custom-light-text font-medium"
                              : "hover:bg-custom-light-text/5 dark:hover:bg-custom-dark-text dark:hover:bg-opacity-10"
                          } w-full px-3 py-2 lg:py-1 focus:outline-none rounded-lg flex items-center justify-start space-x-2`}
                        >
                          <div
                            className={`${
                              checked
                                ? "text-custom-light-text"
                                : "text-custom-light-text dark:text-custom-dark-text"
                            }`}
                          >
                            <HiOutlineDesktopComputer className="w-5 h-5" />
                          </div>
                          <p>Sistema</p>
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

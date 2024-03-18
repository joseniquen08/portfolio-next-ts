"use client";

import { Badge } from "@/components/ui/badge";
import { ProjectType } from "@/types";
import { CustomFlowbiteTheme, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  HiArrowSmLeft,
  HiOutlineExternalLink,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { SiGithub } from "react-icons/si";

interface Props {
  data: ProjectType;
}

const customTheme: CustomFlowbiteTheme["tooltip"] = {
  arrow: {
    style: {
      dark: "bg-gray-300 dark:bg-custom-dark-accent",
    },
  },
  style: {
    dark: "bg-gray-300 text-custom-light-text dark:bg-custom-dark-accent dark:text-custom-dark-text",
  },
};

export const Header = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center flex-none space-y-10">
      <div className="flex flex-col md:flex-row gap-2 lg:gap-2.5">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center flex-none w-12 h-12 rounded-full text-custom-light-text dark:text-custom-dark-text dark:hover:bg-custom-dark-text hover:bg-opacity-5 dark:hover:bg-opacity-10 hover:bg-custom-light-text"
        >
          <HiArrowSmLeft className="w-8 h-8" />
        </button>
        <div className="flex flex-col space-y-4 px-4 md:px-0">
          <p className="text-2xl mt-1.5 lg:text-3xl font-semibold dark:text-custom-dark-text text-custom-light-text">
            {data.title}
          </p>
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-3 flex-wrap bg-custom-light-text/5 dark:bg-custom-dark-text/10 px-5 py-2.5 rounded-xl">
              {data.icons.map(({ name, icon }, i) => (
                <div key={i}>
                  <Tooltip
                    key={i}
                    content={name}
                    theme={customTheme}
                    placement="bottom"
                  >
                    {icon}
                  </Tooltip>
                </div>
              ))}
            </div>
            {data.github !== "" && (
              <a
                href={data.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 px-5 py-2.5 bg-custom-light-text/5 hover:bg-custom-light-text/10 dark:text-custom-dark-text dark:bg-custom-dark-text/10 dark:hover:bg-custom-dark-text/20 rounded-xl"
              >
                <SiGithub className="w-7 h-7" />
                <span className="text-lg font-medium">GitHub</span>
                <HiOutlineExternalLink className="w-5 h-5" />
              </a>
            )}
            <a
              href={data.web}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2.5 px-5 py-2.5 bg-custom-light-text/5 hover:bg-custom-light-text/10 dark:text-custom-dark-text dark:bg-custom-dark-text/10 dark:hover:bg-custom-dark-text/20 rounded-xl"
            >
              <HiOutlineGlobeAlt className="w-7 h-7" />
              <span className="text-lg font-medium">Web</span>
              <HiOutlineExternalLink className="w-5 h-5" />
            </a>
          </div>
          <div className="flex space-x-2 items-center py-0.5">
            {data.badges.map(({ name }, i) => (
              <Badge
                key={i}
                variant="role"
                className="rounded-full px-4 py-1 text-sm"
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

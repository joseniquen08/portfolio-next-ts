import { dataProjectType } from '@/types';
import { Tooltip } from 'flowbite-react';
import { useRouter } from 'next/router';
import {
  HiArrowSmLeft,
  HiOutlineExternalLink,
  HiOutlineGlobeAlt,
} from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

interface Props {
  data: dataProjectType;
}

export const Header = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center flex-none space-y-10">
      <div className="flex space-x-2 lg:space-x-2.5 text-center lg:text-left">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center flex-none w-12 h-12 rounded-full text-stone-700 dark:text-white dark:hover:bg-white hover:bg-opacity-5 dark:hover:bg-opacity-10 hover:bg-stone-900"
        >
          <HiArrowSmLeft className="w-8 h-8" />
        </button>
        {data ? (
          <div className="flex flex-col space-y-4">
            <p className="text-2xl mt-1.5 lg:text-3xl font-semibold dark:text-white text-stone-700">
              {data.title}
            </p>
            <div className="flex space-x-4">
              <div className="flex space-x-4 dark:bg-white dark:bg-opacity-[0.15] bg-stone-900 bg-opacity-5 px-5 py-2.5 rounded-xl">
                {data.icons.map((icon: string) => (
                  <div key={icon}>
                    <Tooltip content={icon.toUpperCase()} placement="bottom">
                      <div className="flex items-center justify-center text-center lg:space-y-1 w-7 h-7">
                        <div
                          className="w-full h-full bg-center bg-cover"
                          style={{
                            backgroundImage: `url(/images/${icon}.png)`,
                          }}
                        ></div>
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div>
              <a
                href={data.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 px-5 py-2.5 bg-stone-300/40 hover:bg-stone-300/60 dark:text-white dark:bg-white/10 dark:hover:bg-white/20 rounded-xl"
              >
                <SiGithub className="w-7 h-7" />
                <span className="text-lg font-medium">GitHub</span>
                <HiOutlineExternalLink className="w-5 h-5" />
              </a>
              <a
                href={data.web}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 px-5 py-2.5 bg-stone-300/40 hover:bg-stone-300/60 dark:text-white dark:bg-white/10 dark:hover:bg-white/20 rounded-xl"
              >
                <HiOutlineGlobeAlt className="w-7 h-7" />
                <span className="text-lg font-medium">Web</span>
                <HiOutlineExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

import { Tooltip } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineEye, HiOutlineGlobeAlt } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

interface Props {
  id: string;
  image: string;
  title: string;
  description: {
    en: string;
    es: string;
  };
  icons: string[];
  web: string;
  github: string;
  locale: string | undefined;
}

export const ProjectRow = ({
  id,
  image,
  title,
  description,
  icons,
  web,
  github,
  locale,
}: Props) => {
  return (
    <div className='col-span-2 flex gap-8'>
      <div className="relative w-1/2 h-60 xs:h-80 md:h-52 lg:h-64 2xl:h-72 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt="image_random"
          layout="fill"
          priority
          className="z-0 object-cover object-center w-full img opacity-40 md:opacity-100"
        />
      </div>
      <div className="w-1/2 py-2 flex flex-col items-start space-y-2 justify-between">
        <div className="flex flex-col space-y-1">
          <p className="text-3xl font-semibold" style={{ textWrap: "balance" }}>{title}</p>
          <p>{locale === 'en' ? description.en : description.es}</p>
          <div className="flex space-x-2">
            <a
              href={web}
              target="_blank"
              rel="noreferrer"
              className="p-2 block text-white bg-custom-secondary/80 hover:bg-custom-secondary/95 rounded-xl"
            >
              <HiOutlineGlobeAlt className="w-6 h-6" />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="p-2 block text-white bg-custom-secondary/80 hover:bg-custom-secondary/95 rounded-xl"
            >
              <SiGithub className="w-6 h-6" />
            </a>
            <Link href={`project/${id}`} legacyBehavior>
              <a className="p-2 block text-white bg-custom-secondary/80 hover:bg-custom-secondary/95 rounded-xl">
                <HiOutlineEye className="w-6 h-6" />
              </a>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-end w-full">
          <div className="flex space-x-3.5 py-2">
            {icons.map((icon: string) => (
              <div key={icon}>
                <Tooltip content={icon.toUpperCase()} placement="bottom">
                  <div className="flex items-center justify-center text-center lg:space-y-1 w-8 h-8">
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
        </div>
      </div>
    </div>
  );
};

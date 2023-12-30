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
  web: string;
  github: string;
  locale: string | undefined;
}

export const ProjectCard = ({
  id,
  image,
  title,
  description,
  web,
  github,
  locale,
}: Props) => {
  return (
    <div>
      <div className="relative">
        <div className="relative z-20 h-full overflow-hidden cursor-pointer card rounded-xl bg-slate-700">
          <div className="relative h-60 xs:h-80 md:h-52 lg:h-64 2xl:h-72">
            <Image
              src={image}
              alt="image_random"
              fill={true}
              priority
              className="z-0 object-cover object-center w-full img opacity-40 md:opacity-100"
            />
          </div>
          <div className="absolute bottom-0 flex items-center w-full h-10 px-6 text-white footer sm:duration-500 sm:translate-y-full bg-slate-900/70">
            <p className="text-lg font-medium">{title}</p>
          </div>
          <p className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white alert md:hidden md:font-normal">
            {locale === 'en' ? description.en : description.es}
          </p>
          <a
            href={web}
            target="_blank"
            rel="noreferrer"
            className="absolute p-2 text-white links sm:duration-500 sm:-translate-y-20 top-4 right-5 bg-slate-900/40 hover:bg-slate-900/60 rounded-xl"
          >
            <HiOutlineGlobeAlt className="w-6 h-6" />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="absolute p-2 text-white links sm:duration-500 sm:-translate-y-20 top-4 left-5 bg-slate-900/40 hover:bg-slate-900/60 rounded-xl"
          >
            <SiGithub className="w-6 h-6" />
          </a>
          <Link href={`project/${id}`} legacyBehavior>
            <a className="absolute p-2 text-white links sm:duration-500 sm:translate-y-32 bottom-14 right-5 bg-slate-900/40 hover:bg-slate-900/60 rounded-xl">
              <HiOutlineEye className="w-6 h-6" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

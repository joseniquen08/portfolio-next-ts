import { Badge } from '@/components/ui/badge';
import { ProjectType } from '@/types';
import { CustomFlowbiteTheme, Timeline, Tooltip } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineEye, HiOutlineGlobeAlt } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

type Props = ProjectType & {
  locale: string | undefined;
}

const customTheme: CustomFlowbiteTheme['tooltip'] = {
  arrow: {
    style: {
      dark: "bg-gray-300 dark:bg-custom-dark-primary",
    },
  },
  style: {
    dark: "bg-gray-300 text-custom-ligth-text dark:bg-custom-dark-primary dark:text-custom-dark-text",
  },
}

export const ProjectRow = ({
  badges,
  slug,
  images,
  title,
  description,
  icons,
  web,
  github,
  locale,
}: Props) => {
  return (
    <Timeline.Item className="mb-8">
      <Timeline.Point />
      <Timeline.Content>
        <Timeline.Time>
          <div className="flex space-x-2 items-center py-0.5">
            {badges.map(({ name }, i) => (
              <Badge key={i} variant="role" className="rounded-full">{name}</Badge>
            ))}
          </div>
        </Timeline.Time>
        <Timeline.Title>{title}</Timeline.Title>
        <Timeline.Body className="flex flex-col space-y-4">
          <p>{locale === 'en' ? description.en : description.es}</p>
          <div className="flex gap-3.5 flex-wrap">
            {icons.map(({ name, icon }, i) => (
              <Tooltip key={i} content={name} theme={customTheme} placement="bottom">
                {icon}
              </Tooltip>
            ))}
          </div>
          <div className="relative h-60 xs:h-80 md:h-52 lg:h-56 2xl:h-64 rounded-xl overflow-hidden bg-black dark:bg-transparent">
            <Image
              src={images[0]}
              alt="image_random"
              fill={true}
              priority
              className="z-0 object-cover object-center w-full img opacity-40 dark:opacity-20"
            />
            <div className="absolute left-2 bottom-2 flex space-x-2">
              <a
                href={web}
                target="_blank"
                rel="noreferrer"
                className="p-2 block text-custom-ligth-bg dark:text-custom-dark-text border-2 border-custom-ligth-bg dark:border-custom-dark-text hover:bg-custom-ligth-primary/5 dark:hover:bg-custom-dark-primary/30 rounded-xl"
              >
                <HiOutlineGlobeAlt className="w-5 h-5" />
              </a>
              {github !== "" && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 block text-custom-ligth-bg dark:text-custom-dark-text border-2 border-custom-ligth-bg dark:border-custom-dark-text hover:bg-custom-ligth-primary/5 dark:hover:bg-custom-dark-primary/30 rounded-xl"
                >
                  <SiGithub className="w-5 h-5" />
                </a>
              )}
              <Link href={`project/${slug}`} legacyBehavior>
                <a className="p-2 block text-custom-ligth-bg dark:text-custom-dark-text border-2 border-custom-ligth-bg dark:border-custom-dark-text hover:bg-custom-ligth-primary/5 dark:hover:bg-custom-dark-primary/30 rounded-xl">
                  <HiOutlineEye className="w-5 h-5" />
                </a>
              </Link>
            </div>
          </div>
        </Timeline.Body>
      </Timeline.Content>
    </Timeline.Item>
  );
};

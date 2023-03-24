import fetcher from '@/lib/fetcher';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { FaRedoAlt, FaSpotify } from 'react-icons/fa';
import useSWR from 'swr';

export const NowPlaying = () => {
  const { data, mutate } = useSWR('/api/now-playing', fetcher);

  const control = useAnimation();

  return (
    <div className="w-full mb-2 overflow-hidden">
      {!data?.songUrl ? (
        <div className="flex items-center justify-center w-full p-3 space-x-2 cursor-default rounded-xl dark:bg-white dark:bg-opacity-5 bg-slate-900 bg-opacity-5">
          <FaSpotify className="text-[#1ED760] h-7 w-7" />
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Not Playing
          </p>
          <span className="absolute flex w-4 h-4 -top-1 -right-1">
            <span className="relative inline-flex w-4 h-4 bg-gray-300 rounded-full dark:bg-gray-600"></span>
          </span>
        </div>
      ) : (
        <div>
          <motion.a
            whileTap={{ scale: 0.95, overflow: 'visible' }}
            href={data.songUrl}
            className="flex items-start space-x-1.5 lg:space-x-2.5 w-full rounded-xl dark:bg-white dark:bg-opacity-5 bg-slate-900 bg-opacity-5 p-3 hover:bg-opacity-10 dark:hover:bg-opacity-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative flex-none overflow-hidden w-14 h-14 lg:w-16 lg:h-16 rounded-xl">
              <Image
                src={data.albumImageUrl}
                layout="fill"
                alt="image"
                className="w-full"
                priority
              />
            </div>
            <div className="flex flex-col justify-end min-w-0 font-semibold dark:font-medium pr-0.5">
              <p className="text-xs text-[#1ED760] truncate">{data.album}</p>
              <h2 className="text-xs truncate lg:text-sm text-stone-400">
                {data.artist}
              </h2>
              <p className="text-base truncate lg:text-lg text-stone-600 dark:text-slate-50 max-w-max">
                {data.title}
              </p>
            </div>
          </motion.a>
          <span className="absolute flex w-5 h-5 lg:w-[1.6rem] lg:h-[1.6rem] -top-[0.4rem] -right-[0.4rem]">
            <span className="absolute inline-flex w-full h-full bg-[#1ED760] rounded-full opacity-75 animate-ping"></span>
            <FaSpotify className="text-[#1ED760] w-5 h-5 lg:w-[1.6rem] lg:h-[1.6rem]" />
          </span>
          <motion.span
            whileHover={{ scale: 1.1, overflow: 'visible' }}
            whileTap={{ scale: 0.95, overflow: 'visible' }}
            onClick={() => {
              control.start({
                rotate: 360,
                transition: {
                  repeat: 1,
                  repeatType: 'mirror',
                  from: 0,
                  to: 360,
                  ease: 'easeInOut',
                  duration: 0.65,
                },
              });
              mutate();
            }}
            className="absolute bg-slate-900 bg-opacity-95 hover:bg-opacity-50 rounded-full flex items-center justify-center w-6 h-6 lg:w-[1.8rem] lg:h-[1.8rem] -bottom-[0.5rem] -right-[0.5rem] cursor-pointer"
          >
            <motion.span animate={control}>
              <FaRedoAlt className="text-gray-400 w-4 h-4 lg:w-[1rem] lg:h-[1rem]" />
            </motion.span>
          </motion.span>
        </div>
      )}
    </div>
  );
};

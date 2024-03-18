import fetcher from "@/lib/fetcher";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaPause, FaPlay, FaRedoAlt, FaSpotify } from "react-icons/fa";
import useSWR from "swr";

export const NowPlaying = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { data, mutate } = useSWR("/api/now-playing", fetcher);

  const control = useAnimation();

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  const onLoadedMetadata = () => {
    const seconds = Math.round(audioRef.current?.duration || 0);
    setDuration(seconds);
    if (progressBarRef.current !== null) {
      progressBarRef.current.max = `${audioRef.current?.duration}`;
    }
  };

  const tooglePToP = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current?.pause();
      cancelAnimationFrame(animationRef.current || 0);
    }
  };

  const whilePlaying = () => {
    if (progressBarRef.current !== null) {
      progressBarRef.current.value = `${audioRef.current?.currentTime}`;
    }
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);

    if (audioRef.current !== null) {
      if (audioRef.current.ended) {
        setCurrentTime(0);
        setIsPlaying(false);
        if (audioRef.current !== null) {
          audioRef.current.currentTime = 0;
        }
        return;
      }
    }
  };

  const changeRange = () => {
    if (audioRef.current !== null) {
      audioRef.current.currentTime = parseInt(
        `${progressBarRef.current?.value}`
      );
    }
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    setCurrentTime(Math.round(parseFloat(`${progressBarRef.current?.value}`)));
    if (progressBarRef.current !== null) {
      progressBarRef.current.style.setProperty(
        "--seek-before-width",
        `${
          (parseFloat(progressBarRef.current?.value) /
            parseFloat(progressBarRef.current?.max)) *
          100
        }%`
      );
    }
  };

  const leadingZero = (time: number) => {
    return time < 10 ? "0" + time : +time;
  };

  return (
    <div className="w-full mb-2 overflow-hidden">
      {!data?.songUrl ? (
        <div className="flex items-center justify-center w-full px-3 py-4 space-x-2 cursor-default rounded-xl dark:bg-custom-dark-text dark:bg-opacity-10 bg-custom-light-text bg-opacity-5">
          <FaSpotify className="text-[#1ED760] h-7 w-7" />
          <p className="text-lg font-medium text-custom-light-text dark:text-custom-dark-text">
            Sin reproducir música
          </p>
        </div>
      ) : (
        <div>
          <div className="flex flex-col w-full py-3.5 px-4 space-y-3 rounded-xl dark:bg-white dark:bg-opacity-5 bg-slate-400 bg-opacity-5 hover:bg-opacity-10 dark:hover:bg-opacity-10 border dark:border-custom-dark-text/20">
            <div className="flex items-start w-full space-x-2.5">
              <div className="relative flex-none w-16 h-16 overflow-hidden rounded-xl">
                <Image
                  src={data.albumImageUrl}
                  alt="image"
                  width={64}
                  height={64}
                  className="w-full"
                  priority
                />
              </div>
              <div className="flex flex-col justify-end min-w-0 font-semibold dark:font-medium pr-0.5">
                <p className="text-xs text-[#1ED760] truncate">{data.album}</p>
                <h2 className="text-sm truncate text-stone-400">
                  {data.artist}
                </h2>
                <a
                  href={data.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg truncate text-stone-600 dark:text-slate-50 max-w-max hover:underline"
                >
                  {data.title}
                </a>
              </div>
            </div>
            {data.songPreview !== null ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => tooglePToP()}
                  type="button"
                  className="flex items-center justify-center flex-none w-8 h-8 text-green-600 rounded-full shadow-md bg-slate-100 ring-1 ring-slate-900/5"
                  aria-label="Pause"
                >
                  {!isPlaying ? (
                    <FaPlay size={14} className="" />
                  ) : (
                    <FaPause size={14} className="" />
                  )}
                </button>
                <div className="flex flex-col w-full pt-2">
                  <div className="relative w-full">
                    <audio
                      ref={audioRef}
                      src={data.songPreview}
                      preload="metadata"
                      onLoadedMetadata={onLoadedMetadata}
                    />
                    <input
                      ref={progressBarRef}
                      onChange={changeRange}
                      type="range"
                      min="0"
                      max="100"
                      step="0.01"
                      defaultValue="0"
                      className="progress-bar-audio"
                    />
                  </div>
                  <div className="flex justify-between text-xs font-medium leading-6 tabular-nums">
                    <p className="text-slate-100">{`${leadingZero(
                      currentTime % 60 === currentTime
                        ? 0
                        : Math.trunc(currentTime / 60)
                    )}:${leadingZero(currentTime % 60)}`}</p>
                    <p className="text-slate-100">
                      {duration &&
                        !isNaN(duration) &&
                        `${leadingZero(
                          duration % 60 === duration
                            ? 0
                            : Math.trunc(duration / 60)
                        )}:${leadingZero(duration % 60)}`}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-full backdrop-blur bg-custom-light-bg/60 dark:bg-custom-dark-bg/60 border dark:border-custom-dark-text/20">
                <p className="text-sm font-medium text-center">
                  Previa no disponible
                </p>
              </div>
            )}
          </div>
          <span className="absolute flex w-5 h-5 lg:w-[1.6rem] lg:h-[1.6rem] -top-[0.4rem] -right-[0.4rem]">
            <span className="absolute inline-flex w-full h-full bg-[#1ED760] rounded-full opacity-75 animate-ping"></span>
            <FaSpotify className="text-[#1ED760] w-5 h-5 lg:w-[1.6rem] lg:h-[1.6rem]" />
          </span>
          <motion.span
            whileHover={{ scale: 1.1, overflow: "visible" }}
            whileTap={{ scale: 0.95, overflow: "visible" }}
            onClick={() => {
              control.start({
                rotate: 360,
                transition: {
                  repeat: 1,
                  repeatType: "mirror",
                  from: 0,
                  to: 360,
                  ease: "easeInOut",
                  duration: 0.65,
                },
              });
              mutate();
            }}
            className="absolute bg-slate-500 bg-opacity-10 dark:bg-opacity-30 rounded-full flex items-center justify-center w-6 h-6 lg:w-[1.8rem] lg:h-[1.8rem] -bottom-[0.5rem] -right-[0.5rem] cursor-pointer"
          >
            <motion.span animate={control}>
              <FaRedoAlt className="text-custom-light-accent w-4 h-4 lg:w-[1rem] lg:h-[1rem]" />
            </motion.span>
          </motion.span>
        </div>
      )}
    </div>
  );
};

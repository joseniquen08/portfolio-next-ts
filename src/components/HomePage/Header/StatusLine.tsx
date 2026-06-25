"use client";

import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import useSWR from "swr";

export const StatusLine = () => {
  const { data } = useSWR("/api/now-playing", fetcher, {
    refreshInterval: 60_000,
  });
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("es-PE", {
          timeZone: "America/Lima",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  const isPlaying = Boolean(data?.songUrl);
  const trackLabel = isPlaying
    ? `${data.title} — ${data.artist}`
    : "sin reproducir";

  return (
    <div className="w-full max-w-5xl px-4 mx-auto sm:px-8 lg:px-16 2xl:max-w-6xl mt-6 lg:mt-0">
      <div className="font-mono text-xs inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-2.5 rounded-lg border border-custom-light-primary/20 dark:border-custom-dark-accent-text/20 bg-custom-light-primary/5 dark:bg-custom-dark-accent-text/5 text-custom-light-text/60 dark:text-custom-dark-text/60">
        {/* Spotify now playing */}
        <span className="flex items-center gap-1.5 min-w-0">
          <span className="relative flex-none w-3.5 h-3.5">
            {isPlaying && (
              <span className="absolute inset-0 rounded-full bg-[#1ED760] opacity-50 animate-ping" />
            )}
            <FaSpotify
              className={`relative w-3.5 h-3.5 ${
                isPlaying ? "text-[#1ED760]" : "opacity-40"
              }`}
            />
          </span>
          {isPlaying ? (
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans truncate max-w-[24ch] sm:max-w-[40ch] text-custom-light-text dark:text-custom-dark-text hover:underline underline-offset-2"
            >
              {trackLabel}
            </a>
          ) : (
            <span className="font-sans truncate max-w-[24ch] sm:max-w-[40ch]">
              {trackLabel}
            </span>
          )}
        </span>

        <span
          className="hidden sm:inline text-custom-light-primary/40 dark:text-custom-dark-accent-text/30"
          aria-hidden
        >
          {"•"}
        </span>

        {/* Local time */}
        <span className="flex items-center gap-1.5 tabular-nums">
          <HiOutlineClock className="w-3.5 h-3.5 opacity-50 flex-none" />
          <span>
            {time || "--:--"}
            <span className="ml-1 opacity-50">Lima</span>
          </span>
        </span>
      </div>
    </div>
  );
};

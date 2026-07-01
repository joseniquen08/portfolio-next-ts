"use client";

import { cn } from "@/utils/shadcn";
import { Job } from "./status";

interface Props {
  jobs: Job[];
  activeJobId: string | null;
  onChange: (jobId: string | null) => void;
}

export function JobFilter({ jobs, activeJobId, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          "px-3 py-1.5 rounded-md border text-xs transition-colors cursor-pointer",
          activeJobId === null
            ? "border-zinc-500 bg-zinc-800 text-white"
            : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
        )}
      >
        Todos
      </button>
      {jobs.map((job) => (
        <button
          key={job.id}
          type="button"
          onClick={() => onChange(job.id)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs transition-colors cursor-pointer",
            activeJobId === job.id
              ? "border-zinc-500 bg-zinc-800 text-white"
              : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
          )}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: job.color ?? "#6b7280" }}
          />
          {job.name}
        </button>
      ))}
    </div>
  );
}

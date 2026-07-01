"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, parseISO, isPast } from "date-fns";
import { es } from "date-fns/locale";
import { HiOutlineCalendar } from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import { Job, Task, PRIORITY_META, STATUS_META, TaskPriority, TaskStatus } from "./status";

interface Props {
  task: Task;
  job?: Job;
  onClick: () => void;
}

export function TaskCard({ task, job, onClick }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const priority = PRIORITY_META[task.priority as TaskPriority] ?? PRIORITY_META.medium;
  const status = STATUS_META[task.status as TaskStatus] ?? STATUS_META.pending;
  const dueDate = task.due_date ? parseISO(task.due_date) : null;
  const overdue = dueDate && task.status !== "done" && isPast(dueDate);
  const isDone = task.status === "done";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : isDone ? 0.65 : 1,
      }}
      onClick={onClick}
      className={cn(
        "rounded-lg border border-zinc-800 bg-zinc-900 p-3 cursor-grab active:cursor-grabbing",
        "border-l-2 hover:bg-zinc-800/60 transition-colors",
        status.accent
      )}
    >
      <p
        className={cn(
          "text-sm leading-snug",
          isDone ? "text-zinc-500 line-through" : "text-white"
        )}
      >
        {task.title}
      </p>

      <div className="flex items-center gap-2 mt-2.5 flex-wrap">
        {job && (
          <span
            className="flex items-center gap-1 text-[11px] text-zinc-400 max-w-[9rem] truncate"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: job.color ?? "#6b7280" }}
            />
            {job.name}
          </span>
        )}

        <span className="flex items-center gap-1 text-[11px] text-zinc-500">
          <span className={cn("w-1.5 h-1.5 rounded-full", priority.dot)} />
          {priority.label}
        </span>

        {dueDate && (
          <span
            className={cn(
              "flex items-center gap-1 text-[11px]",
              overdue ? "text-red-400" : "text-zinc-500"
            )}
          >
            <HiOutlineCalendar className="w-3 h-3" />
            {format(dueDate, "d MMM", { locale: es })}
          </span>
        )}
      </div>
    </div>
  );
}

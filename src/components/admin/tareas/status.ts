import { Tables } from "@/types/database.types";

export type Job = Tables<"jobs">;
export type Task = Tables<"tasks">;

export type TaskStatus = "pending" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export const STATUS_COLUMNS: { key: TaskStatus; label: string }[] = [
  { key: "pending", label: "Pendiente" },
  { key: "in_progress", label: "En progreso" },
  { key: "done", label: "Hecho" },
];

export const STATUS_META: Record<TaskStatus, { accent: string }> = {
  pending: { accent: "border-l-zinc-600" },
  in_progress: { accent: "border-l-blue-500" },
  done: { accent: "border-l-emerald-500" },
};

export const PRIORITY_META: Record<TaskPriority, { label: string; dot: string }> = {
  low: { label: "Baja", dot: "bg-zinc-500" },
  medium: { label: "Media", dot: "bg-amber-500" },
  high: { label: "Alta", dot: "bg-red-500" },
};

const PRIORITY_ORDER: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };

export function tasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks
    .filter((t) => t.status === status)
    .sort((a, b) => {
      const byPriority =
        PRIORITY_ORDER[a.priority as TaskPriority] - PRIORITY_ORDER[b.priority as TaskPriority];
      if (byPriority !== 0) return byPriority;
      // No due date sorts last within the same priority
      if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date);
      if (a.due_date) return -1;
      if (b.due_date) return 1;
      return a.sort_order - b.sort_order;
    });
}

"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { HiPlus } from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import { Button } from "@/components/ui/button";
import { TaskCard } from "./TaskCard";
import { Job, Task, TaskStatus } from "./status";

interface Props {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  jobsById: Map<string, Job>;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

export function KanbanColumn({ status, label, tasks, jobsById, onAddTask, onEditTask }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col min-w-[280px] w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-zinc-300">
          {label} <span className="text-zinc-600">({tasks.length})</span>
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddTask}
          className="h-7 w-7 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800"
        >
          <HiPlus className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-lg border border-dashed border-zinc-800 p-2 space-y-2 min-h-[120px] transition-colors",
          isOver && "border-zinc-600 bg-zinc-900/40"
        )}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              job={jobsById.get(task.job_id)}
              onClick={() => onEditTask(task)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

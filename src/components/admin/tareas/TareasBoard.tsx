"use client";

import { useState, useEffect, useMemo, useTransition } from "react";
import { HiPlus, HiOutlineCog } from "react-icons/hi";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { moveTask } from "@/app/(admin)/admin/(protected)/laboral/tareas/actions";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { TaskDialog } from "./TaskDialog";
import { JobDialog } from "./JobDialog";
import { JobFilter } from "./JobFilter";
import { Job, Task, TaskStatus, STATUS_COLUMNS, tasksByStatus } from "./status";

interface Props {
  jobs: Job[];
  tasks: Task[];
}

export function TareasBoard({ jobs, tasks }: Props) {
  const [orderedTasks, setOrderedTasks] = useState(tasks);
  const [, startTransition] = useTransition();
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => setOrderedTasks(tasks), [tasks]);

  const jobsById = useMemo(() => new Map(jobs.map((j) => [j.id, j])), [jobs]);
  const activeJobs = useMemo(() => jobs.filter((j) => j.is_active), [jobs]);

  const visibleTasks = activeJobId
    ? orderedTasks.filter((t) => t.job_id === activeJobId)
    : orderedTasks;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragStart(event: DragStartEvent) {
    const task = orderedTasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  // Live-preview the move across columns while dragging over a different status
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeTask = orderedTasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overStatus = STATUS_COLUMNS.some((c) => c.key === over.id)
      ? (over.id as TaskStatus)
      : orderedTasks.find((t) => t.id === over.id)?.status;

    if (!overStatus || overStatus === activeTask.status) return;

    setOrderedTasks((prev) =>
      prev.map((t) => (t.id === activeTask.id ? { ...t, status: overStatus } : t))
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const task = orderedTasks.find((t) => t.id === active.id);
    if (!task) return;

    const finalStatus = (
      STATUS_COLUMNS.some((c) => c.key === over.id)
        ? over.id
        : orderedTasks.find((t) => t.id === over.id)?.status ?? task.status
    ) as TaskStatus;

    let next = orderedTasks;
    const columnTasks = tasksByStatus(next, finalStatus).filter((t) => t.id !== task.id);
    const overIndex = orderedTasks.findIndex((t) => t.id === over.id);
    const overTask = orderedTasks[overIndex];
    const insertAt = overTask && overTask.status === finalStatus
      ? columnTasks.findIndex((t) => t.id === overTask.id)
      : columnTasks.length;

    const reorderedColumn = [
      ...columnTasks.slice(0, Math.max(insertAt, 0)),
      task,
      ...columnTasks.slice(Math.max(insertAt, 0)),
    ];

    next = next.map((t) => (t.id === task.id ? { ...t, status: finalStatus } : t));
    setOrderedTasks(next);

    startTransition(() =>
      moveTask(task.id, finalStatus, reorderedColumn.map((t) => t.id))
    );
  }

  const [taskDialog, setTaskDialog] = useState<{
    open: boolean; task?: Task; defaultStatus?: TaskStatus;
  }>({ open: false });
  const [jobDialogOpen, setJobDialogOpen] = useState(false);

  if (jobs.length === 0) {
    return (
      <>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
          <p className="text-sm font-medium text-white mb-1">
            Aún no tienes trabajos registrados
          </p>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-5">
            Crea tus trabajos concurrentes para poder organizar las tareas de cada uno.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setJobDialogOpen(true)}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-0 gap-1.5"
          >
            <HiPlus className="w-3.5 h-3.5" />
            Nuevo trabajo
          </Button>
        </div>
        <JobDialog open={jobDialogOpen} jobs={jobs} onClose={() => setJobDialogOpen(false)} />
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <JobFilter jobs={jobs} activeJobId={activeJobId} onChange={setActiveJobId} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setJobDialogOpen(true)}
          className="text-zinc-500 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs h-8 gap-1.5"
        >
          <HiOutlineCog className="w-3.5 h-3.5" />
          Trabajos
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUS_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.key}
              status={col.key}
              label={col.label}
              tasks={tasksByStatus(visibleTasks, col.key)}
              jobsById={jobsById}
              onAddTask={() => setTaskDialog({ open: true, defaultStatus: col.key })}
              onEditTask={(task) => setTaskDialog({ open: true, task })}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} job={jobsById.get(activeTask.job_id)} onClick={() => {}} />}
        </DragOverlay>
      </DndContext>

      <TaskDialog
        open={taskDialog.open}
        task={taskDialog.task}
        defaultStatus={taskDialog.defaultStatus}
        jobs={activeJobs}
        nextSortOrder={tasksByStatus(orderedTasks, taskDialog.task?.status as TaskStatus ?? taskDialog.defaultStatus ?? "pending").length}
        onClose={() => setTaskDialog({ open: false })}
      />
      <JobDialog open={jobDialogOpen} jobs={jobs} onClose={() => setJobDialogOpen(false)} />
    </div>
  );
}

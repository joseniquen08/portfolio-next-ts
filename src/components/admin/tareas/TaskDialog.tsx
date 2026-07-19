"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { HiOutlineCalendar } from "react-icons/hi";
import { toast } from "sonner";
import { createTask, updateTask, deleteTask } from "@/app/(admin)/admin/(protected)/laboral/tareas/actions";
import { cn } from "@/utils/shadcn";
import { Job, Task, TaskStatus, PRIORITY_META, TaskPriority } from "./status";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// ─── Date picker (single day) — closes on select instead of staying open ───────

function DatePickerField({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
}: {
  value: string | undefined;
  onChange: (v: string | undefined) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = value ? parseISO(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "w-full justify-start text-left font-normal",
            "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600",
            !value && "text-zinc-500"
          )}
        >
          <HiOutlineCalendar className="mr-2 h-4 w-4 shrink-0 text-zinc-400" />
          {selected ? format(selected, "d 'de' MMMM yyyy", { locale: es }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            onChange(date ? format(date, "yyyy-MM-dd") : undefined);
            setOpen(false);
          }}
        />
        {value && (
          <div className="p-2 border-t border-zinc-800">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange(undefined);
                setOpen(false);
              }}
              className="w-full text-zinc-400 hover:text-white"
            >
              Quitar fecha
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

const schema = z.object({
  title:       z.string().min(1, "Requerido"),
  description: z.string().optional(),
  job_id:      z.string().min(1, "Requerido"),
  priority:    z.enum(["low", "medium", "high"]),
  due_date:    z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open:          boolean;
  task?:         Task;
  defaultStatus?: TaskStatus;
  jobs:          Job[];
  nextSortOrder: number;
  onClose:       () => void;
}

export function TaskDialog({ open, task, defaultStatus, jobs, nextSortOrder, onClose }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!task;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      job_id: jobs[0]?.id ?? "",
      priority: "medium",
      due_date: undefined,
    },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      task
        ? {
            title: task.title,
            description: task.description ?? "",
            job_id: task.job_id,
            priority: (task.priority as TaskPriority) ?? "medium",
            due_date: task.due_date ?? undefined,
          }
        : {
            title: "",
            description: "",
            job_id: jobs[0]?.id ?? "",
            priority: "medium",
            due_date: undefined,
          }
    );
  }, [open, task, jobs, form]);

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        const payload = {
          ...values,
          description: values.description || null,
          due_date: values.due_date || null,
        };
        if (isEdit && task) {
          await updateTask(task.id, payload);
          toast.success("Tarea actualizada");
        } else {
          await createTask({
            ...payload,
            status: defaultStatus ?? "pending",
            sort_order: nextSortOrder,
          });
          toast.success("Tarea creada");
        }
        onClose();
      } catch {
        toast.error("No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  function handleDelete() {
    if (!task) return;
    startTransition(async () => {
      try {
        await deleteTask(task.id);
        toast.success("Tarea eliminada");
        onClose();
      } catch {
        toast.error("No se pudo eliminar. Intenta de nuevo.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEdit ? "Editar tarea" : "Nueva tarea"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs">
            Los campos con <span className="text-red-400">*</span> son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Título <span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Preparar demo, revisar PR…"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Descripción <span className="text-zinc-600 font-normal">(opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalles adicionales…"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Trabajo <span className="text-red-400">*</span>
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Selecciona un trabajo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          <span className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: job.color ?? "#6b7280" }}
                            />
                            {job.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Prioridad</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {(Object.keys(PRIORITY_META) as TaskPriority[]).map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => field.onChange(key)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm transition-colors cursor-pointer",
                            field.value === key
                              ? "border-zinc-500 bg-zinc-800 text-white"
                              : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                          )}
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full", PRIORITY_META[key].dot)} />
                          {PRIORITY_META[key].label}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-zinc-300">
                      Fecha límite <span className="text-zinc-600 font-normal">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <DatePickerField
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Seleccionar fecha"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <DialogFooter className="gap-2 pt-1">
              {isEdit && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="mr-auto text-red-500 hover:text-red-400 hover:bg-red-950/30 cursor-pointer"
                >
                  Eliminar
                </Button>
              )}
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-white text-zinc-900 hover:bg-white/90 cursor-pointer"
              >
                {isPending ? "Guardando…" : isEdit ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

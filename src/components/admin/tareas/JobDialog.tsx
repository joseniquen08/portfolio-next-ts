"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { HiPlus, HiOutlinePencil, HiOutlineTrash, HiArrowLeft } from "react-icons/hi";
import { createJob, updateJob, deleteJob } from "@/app/(admin)/admin/(protected)/laboral/tareas/actions";
import { cn } from "@/utils/shadcn";
import { Job } from "./status";

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

const JOB_COLORS = [
  "#3b82f6", "#0ea5e9", "#22c55e", "#10b981",
  "#14b8a6", "#ef4444", "#ec4899", "#a855f7",
  "#6366f1", "#f97316", "#f59e0b", "#6b7280",
];

const schema = z.object({
  name:  z.string().min(1, "Requerido"),
  color: z.string(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open:    boolean;
  jobs:    Job[];
  onClose: () => void;
}

export function JobDialog({ open, jobs, onClose }: Props) {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Job | "new" | null>(null);

  useEffect(() => {
    if (!open) setEditing(null);
  }, [open]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", color: JOB_COLORS[0] },
  });

  useEffect(() => {
    if (editing === "new") {
      form.reset({ name: "", color: JOB_COLORS[0] });
    } else if (editing) {
      form.reset({ name: editing.name, color: editing.color ?? JOB_COLORS[0] });
    }
  }, [editing, form]);

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        if (editing && editing !== "new") {
          await updateJob(editing.id, values);
          toast.success("Trabajo actualizado");
        } else {
          await createJob({ ...values, sort_order: jobs.length });
          toast.success("Trabajo creado");
        }
        setEditing(null);
      } catch {
        toast.error("No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  function handleToggleActive(job: Job) {
    startTransition(() => updateJob(job.id, { is_active: !job.is_active }));
  }

  function handleDelete(job: Job) {
    startTransition(async () => {
      try {
        await deleteJob(job.id);
        toast.success("Trabajo eliminado");
      } catch {
        toast.error("No se pudo eliminar. Sus tareas se eliminarán también.");
      }
    });
  }

  const selectedColor = form.watch("color");
  const isFormView = editing !== null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            {isFormView && (
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <HiArrowLeft className="w-4 h-4" />
              </button>
            )}
            {isFormView
              ? editing === "new" ? "Nuevo trabajo" : "Editar trabajo"
              : "Trabajos"}
          </DialogTitle>
          {!isFormView && (
            <DialogDescription className="text-zinc-500 text-xs">
              Los trabajos inactivos se ocultan al crear tareas nuevas, pero sus tareas existentes se conservan.
            </DialogDescription>
          )}
        </DialogHeader>

        {isFormView ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">
                      Nombre <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Empresa A, Freelance, Startup B…"
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
                name="color"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-1.5 flex-wrap pt-1">
                        {JOB_COLORS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => form.setValue("color", c)}
                            className={cn(
                              "w-6 h-6 rounded-full border-2 transition-all cursor-pointer shrink-0",
                              selectedColor === c
                                ? "border-white scale-110"
                                : "border-transparent hover:border-zinc-400 hover:scale-105"
                            )}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditing(null)}
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-white text-zinc-900 hover:bg-white/90 cursor-pointer"
                >
                  {isPending ? "Guardando…" : editing === "new" ? "Crear" : "Actualizar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: job.color ?? "#6b7280" }}
                  />
                  <span className={cn("text-sm flex-1 truncate", !job.is_active && "text-zinc-500")}>
                    {job.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(job)}
                    disabled={isPending}
                    className="text-[11px] text-zinc-500 hover:text-zinc-300 cursor-pointer"
                  >
                    {job.is_active ? "Activo" : "Inactivo"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(job)}
                    className="text-zinc-500 hover:text-white cursor-pointer"
                  >
                    <HiOutlinePencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(job)}
                    disabled={isPending}
                    className="text-zinc-500 hover:text-red-400 cursor-pointer"
                  >
                    <HiOutlineTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditing("new")}
              className="w-full text-zinc-500 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs h-8 gap-1.5"
            >
              <HiPlus className="w-3.5 h-3.5" />
              Nuevo trabajo
            </Button>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer w-full"
                >
                  Cerrar
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

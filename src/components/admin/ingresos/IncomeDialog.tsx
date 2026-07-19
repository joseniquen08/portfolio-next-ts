"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { HiOutlineCalendar } from "react-icons/hi";
import { toast } from "sonner";
import {
  createIncomeEntry,
  updateIncomeEntry,
  deleteIncomeEntry,
} from "@/app/(admin)/admin/(protected)/financiero/ingresos/actions";
import { cn } from "@/utils/shadcn";
import { Job, IncomeEntry, CURRENCY_CODES, currencySymbol } from "./status";
import { CurrencyInput } from "@/components/admin/tarjetas/CurrencyInput";

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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// ─── Date picker (single day) — mirrors StatementDialog's DatePickerField ──────

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
          <div className="border-t border-zinc-700 p-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange(undefined);
                setOpen(false);
              }}
              className="w-full text-zinc-400 hover:text-white text-xs"
            >
              Quitar fecha
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

// ─── Schema ────────────────────────────────────────────────────────────────────

const schema = z.object({
  job_id:        z.string().min(1, "Requerido"),
  description:   z.string().optional(),
  amount:        z.number().min(0.01, "Debe ser mayor a 0"),
  currency:      z.string().min(1, "Requerido"),
  entry_date:    z.string().min(1, "Requerido"),
  expected_date: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open:    boolean;
  entry?:  IncomeEntry;
  jobs:    Job[];
  nextSortOrder: number;
  onClose: () => void;
}

const DEFAULT_VALUES: FormValues = {
  job_id: "",
  description: "",
  amount: 0,
  currency: "PEN",
  entry_date: "",
  expected_date: undefined,
};

export function IncomeDialog({ open, entry, jobs, nextSortOrder, onClose }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!entry;

  const firstActiveJobId = jobs.find((j) => j.is_active)?.id ?? jobs[0]?.id ?? "";

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...DEFAULT_VALUES, job_id: firstActiveJobId },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      entry
        ? {
            job_id: entry.job_id,
            description: entry.description ?? "",
            amount: entry.amount,
            currency: entry.currency,
            entry_date: entry.entry_date,
            expected_date: entry.expected_date ?? undefined,
          }
        : { ...DEFAULT_VALUES, job_id: firstActiveJobId }
    );
  }, [open, entry, jobs, form, firstActiveJobId]);

  const currency = form.watch("currency");

  function handleDelete() {
    if (!entry) return;
    startTransition(async () => {
      try {
        await deleteIncomeEntry(entry.id);
        toast.success("Ingreso eliminado");
        onClose();
      } catch {
        toast.error("No se pudo eliminar. Intenta de nuevo.");
      }
    });
  }

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        const payload = {
          job_id: values.job_id,
          description: values.description || null,
          amount: values.amount,
          currency: values.currency,
          entry_date: values.entry_date,
          expected_date: values.expected_date || null,
        };
        if (isEdit && entry) {
          await updateIncomeEntry(entry.id, payload);
          toast.success("Ingreso actualizado");
        } else {
          await createIncomeEntry({ ...payload, sort_order: nextSortOrder });
          toast.success("Ingreso creado");
        }
        onClose();
      } catch {
        toast.error("No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEdit ? "Editar ingreso" : "Nuevo ingreso"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs">
            Los campos con <span className="text-red-400">*</span> son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        <SelectItem key={job.id} value={job.id} disabled={!job.is_active}>
                          <span className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: job.color ?? "#6b7280" }}
                            />
                            {job.name}
                            {!job.is_active && (
                              <span className="text-zinc-600 text-xs">(inactivo)</span>
                            )}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Descripción <span className="text-zinc-600 font-normal">(opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sueldo, proyecto freelance…"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Monto <span className="text-red-400 normal-case">*</span>
              </p>
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-16 w-20 shrink-0 bg-zinc-800 border-zinc-700 text-sm font-semibold text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        {CURRENCY_CODES.map((code) => (
                          <SelectItem key={code} value={code}>
                            {code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1 min-w-0">
                      <FormControl>
                        <CurrencyInput
                          value={field.value}
                          onChange={field.onChange}
                          symbol={currencySymbol(currency)}
                          autoFocus={!isEdit}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="space-y-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Fechas
              </p>

              <FormField
                control={form.control}
                name="entry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">
                      Fecha del ingreso <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePickerField
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Seleccionar fecha"
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-600 text-[11px]">
                      Fecha de la factura, hito o cobro de este ingreso.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expected_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">
                      Fecha esperada de cobro <span className="text-zinc-600 font-normal">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <DatePickerField
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Seleccionar fecha"
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-600 text-[11px]">
                      Cuándo esperas cobrarlo. Pasada esta fecha sin cobrar, se marca como vencido.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

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

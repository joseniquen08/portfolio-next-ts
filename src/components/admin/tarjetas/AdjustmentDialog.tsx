"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Tables } from "@/types/database.types";
import {
  upsertAdjustment,
  deleteAdjustment,
} from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import { periodTitle } from "./status";
import { CurrencyInput } from "./CurrencyInput";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Adjustment = Tables<"period_adjustments">;

const schema = z.object({
  amount: z.number(),
  note:   z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open:        boolean;
  period?:     string;
  adjustment?: Adjustment;
  onClose:     () => void;
}

export function AdjustmentDialog({ open, period, adjustment, onClose }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!adjustment;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 0, note: "" },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      adjustment
        ? { amount: adjustment.amount, note: adjustment.note ?? "" }
        : { amount: 0, note: "" }
    );
  }, [open, adjustment, form]);

  function onSubmit(values: FormValues) {
    if (!period) return;
    startTransition(async () => {
      try {
        await upsertAdjustment({
          id:     adjustment?.id,
          period,
          amount: values.amount,
          note:   values.note || null,
        });
        toast.success(isEdit ? "Ajuste actualizado" : "Ajuste añadido");
        onClose();
      } catch {
        toast.error("No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  function handleDelete() {
    if (!adjustment) return;
    startTransition(async () => {
      try {
        await deleteAdjustment(adjustment.id);
        toast.success("Ajuste eliminado");
        onClose();
      } catch {
        toast.error("No se pudo eliminar. Intenta de nuevo.");
      }
    });
  }

  const title = period
    ? `Ajuste — ${periodTitle(period)}`
    : isEdit ? "Editar ajuste" : "Nuevo ajuste";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs">
            Los campos con <span className="text-red-400">*</span> son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* ── Monto ──────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Monto <span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      symbol="S/"
                      allowNegative
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-600">
                    Toca el <span className="text-zinc-400 font-mono">+</span> para cambiar a negativo y restar al total del mes.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* ── Nota ───────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Nota{" "}
                    <span className="text-zinc-600 font-normal">(opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ej. Abono extra, pago parcial, cargo compartido…"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-600">
                    Aparece al pasar el cursor sobre el ajuste en la tabla.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* ── Footer ─────────────────────────────────────────────── */}
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
                {isPending ? "Guardando…" : isEdit ? "Actualizar" : "Añadir"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

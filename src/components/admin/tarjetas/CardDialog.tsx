"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Tables } from "@/types/database.types";
import {
  createCard,
  updateCard,
  deleteCard,
  createLimitChange,
} from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import { cn } from "@/utils/shadcn";
import { CreditLimitHistory } from "./CreditLimitHistory";
import { CreditLimitChange } from "./status";

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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type CreditCard = Tables<"credit_cards">;

// 12 familias × 3 tonos (oscuro · medio · claro)
const COLOR_GROUPS: { label: string; value: string }[][] = [
  [
    { label: "Zinc oscuro",      value: "#374151" },
    { label: "Zinc",             value: "#6b7280" },
    { label: "Zinc claro",       value: "#9ca3af" },
  ],
  [
    { label: "Azul oscuro",      value: "#1d4ed8" },
    { label: "Azul",             value: "#3b82f6" },
    { label: "Azul claro",       value: "#93c5fd" },
  ],
  [
    { label: "Cielo oscuro",     value: "#0369a1" },
    { label: "Cielo",            value: "#0ea5e9" },
    { label: "Cielo claro",      value: "#7dd3fc" },
  ],
  [
    { label: "Verde oscuro",     value: "#15803d" },
    { label: "Verde",            value: "#22c55e" },
    { label: "Verde claro",      value: "#86efac" },
  ],
  [
    { label: "Esmeralda oscuro", value: "#047857" },
    { label: "Esmeralda",        value: "#10b981" },
    { label: "Esmeralda claro",  value: "#6ee7b7" },
  ],
  [
    { label: "Teal oscuro",      value: "#0f766e" },
    { label: "Teal",             value: "#14b8a6" },
    { label: "Teal claro",       value: "#5eead4" },
  ],
  [
    { label: "Rojo oscuro",      value: "#b91c1c" },
    { label: "Rojo",             value: "#ef4444" },
    { label: "Rojo claro",       value: "#fca5a5" },
  ],
  [
    { label: "Rosa oscuro",      value: "#be185d" },
    { label: "Rosa",             value: "#ec4899" },
    { label: "Rosa claro",       value: "#f9a8d4" },
  ],
  [
    { label: "Morado oscuro",    value: "#7e22ce" },
    { label: "Morado",           value: "#a855f7" },
    { label: "Morado claro",     value: "#d8b4fe" },
  ],
  [
    { label: "Índigo oscuro",    value: "#4338ca" },
    { label: "Índigo",           value: "#6366f1" },
    { label: "Índigo claro",     value: "#a5b4fc" },
  ],
  [
    { label: "Naranja oscuro",   value: "#c2410c" },
    { label: "Naranja",          value: "#f97316" },
    { label: "Naranja claro",    value: "#fdba74" },
  ],
  [
    { label: "Ámbar oscuro",     value: "#b45309" },
    { label: "Ámbar",            value: "#f59e0b" },
    { label: "Ámbar claro",      value: "#fde68a" },
  ],
];

const SUPPORTED_CURRENCIES = [
  { code: "PEN", label: "S/ Soles" },
  { code: "USD", label: "$ Dólares" },
  { code: "EUR", label: "€ Euros" },
  { code: "GBP", label: "£ Libras" },
] as const;

const schema = z.object({
  name:                z.string().min(1, "Requerido"),
  currencies:          z.array(z.string()).min(1, "Selecciona al menos una moneda"),
  color:               z.string().optional(),
  default_payment_day:     z.number().int().min(1, "Requerido (1–31)").max(31, "Requerido (1–31)"),
  default_cycle_start_day: z.number().int().min(1, "Requerido (1–31)").max(31, "Requerido (1–31)"),
  default_cycle_end_day:   z.number().int().min(1, "Requerido (1–31)").max(31, "Requerido (1–31)"),
  initial_credit_limit:    z.number().min(0).optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open:               boolean;
  card?:              CreditCard;
  nextSortOrder:      number;
  creditLimitChanges: CreditLimitChange[];
  onClose:            () => void;
}

export function CardDialog({ open, card, nextSortOrder, creditLimitChanges, onClose }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!card;
  const cardLimitChanges = card ? creditLimitChanges.filter((c) => c.card_id === card.id) : [];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:                "",
      currencies:          ["PEN"],
      color:               COLOR_GROUPS[0][1].value,
      default_payment_day:     undefined,
      default_cycle_start_day: undefined,
      default_cycle_end_day:   undefined,
      initial_credit_limit:    undefined,
    },
  });

  const selectedColor = form.watch("color");

  useEffect(() => {
    if (!open) return;
    form.reset(
      card
        ? {
            name:                    card.name,
            currencies:              card.currencies ?? ["PEN"],
            color:                   card.color ?? COLOR_GROUPS[0][1].value,
            default_payment_day:     card.default_payment_day ?? undefined,
            default_cycle_start_day: card.default_cycle_start_day ?? undefined,
            default_cycle_end_day:   card.default_cycle_end_day ?? undefined,
            initial_credit_limit:    undefined,
          }
        : {
            name:                    "",
            currencies:              ["PEN"],
            color:                   COLOR_GROUPS[0][1].value,
            default_payment_day:     undefined,
            default_cycle_start_day: undefined,
            default_cycle_end_day:   undefined,
            initial_credit_limit:    undefined,
          }
    );
  }, [open, card, form]);

  function onSubmit(values: FormValues) {
    const { initial_credit_limit, ...payload } = values;
    startTransition(async () => {
      try {
        if (isEdit && card) {
          await updateCard(card.id, {
            ...payload,
            color: payload.color ?? undefined,
            sort_order: card.sort_order,
          } as Parameters<typeof updateCard>[1]);
          toast.success("Tarjeta actualizada");
        } else {
          const newCard = await createCard({
            ...payload,
            color: payload.color ?? undefined,
            sort_order: nextSortOrder,
          });
          if (initial_credit_limit && initial_credit_limit > 0) {
            // First-ever record for this card: no known start date, so it's
            // marked "Inicial" (null) — applies retroactively until a real
            // dated entry narrows it down via the history section later.
            await createLimitChange({
              card_id: newCard.id,
              amount: initial_credit_limit,
              currency: payload.currencies[0],
              start_date: null,
              note: "Límite inicial",
            });
          }
          toast.success("Tarjeta creada");
        }
        onClose();
      } catch {
        toast.error("No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  function handleDelete() {
    if (!card) return;
    const limitCount = cardLimitChanges.length;
    const limitNote = limitCount > 0
      ? ` y ${limitCount} ${limitCount === 1 ? "registro" : "registros"} de línea de crédito`
      : "";
    if (!window.confirm(`Eliminar "${card.name}" también elimina todos sus estados de cuenta, adelantos${limitNote}. ¿Continuar?`)) {
      return;
    }
    startTransition(async () => {
      try {
        await deleteCard(card.id);
        toast.success("Tarjeta eliminada");
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
            {isEdit ? "Editar tarjeta" : "Nueva tarjeta"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs">
            Los campos con <span className="text-red-400">*</span> son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* ── Nombre ─────────────────────────────────────────────── */}
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
                      placeholder="IBK, OH!, Falabella…"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-600">
                    Nombre corto para identificar la tarjeta en la tabla.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* ── Monedas ────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="currencies"
              render={({ field }) => {
                const selected: string[] = field.value ?? [];
                function toggle(code: string) {
                  if (selected.includes(code)) {
                    if (selected.length > 1) field.onChange(selected.filter((c) => c !== code));
                  } else {
                    field.onChange([...selected, code]);
                  }
                }
                return (
                  <FormItem>
                    <FormLabel className="text-zinc-300">
                      Monedas <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {SUPPORTED_CURRENCIES.map(({ code, label }) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => toggle(code)}
                            className={cn(
                              "px-3 py-1.5 rounded-md border text-sm transition-colors cursor-pointer",
                              selected.includes(code)
                                ? "border-zinc-500 bg-zinc-800 text-white"
                                : "border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-300"
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                );
              }}
            />

            {/* ── Color ──────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="color"
              render={() => (
                <FormItem>
                  <FormLabel className="text-zinc-300">
                    Color <span className="text-zinc-600 font-normal">(opcional)</span>
                  </FormLabel>
                  <FormControl>
                    {/* 3 rows × 12 cols: row = tone (dark/mid/light), col = family */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      {[0, 1, 2].map((toneIdx) => (
                        <div key={toneIdx} className="flex gap-1.5">
                          {COLOR_GROUPS.map((group, gi) => {
                            const c = group[toneIdx];
                            return (
                              <button
                                key={gi}
                                type="button"
                                onClick={() => form.setValue("color", c.value)}
                                className={cn(
                                  "w-6 h-6 rounded-full border-2 transition-all cursor-pointer shrink-0",
                                  selectedColor === c.value
                                    ? "border-white scale-110"
                                    : "border-transparent hover:border-zinc-400 hover:scale-105"
                                )}
                                style={{ backgroundColor: c.value }}
                                title={c.label}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription className="text-zinc-600">
                    Aparece como punto de color junto al nombre en la tabla.
                  </FormDescription>
                </FormItem>
              )}
            />

            <Separator className="bg-zinc-800" />

            {/* ── Días (opcional) ────────────────────────────────────── */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Días por defecto
              </p>

              {/* Vencimiento — fila propia para no apretarse */}
              <FormField
                control={form.control}
                name="default_payment_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300 text-sm">Vencimiento <span className="text-red-400">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={31}
                        placeholder="Día (1–31)"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const v = parseInt(e.target.value);
                          field.onChange(isNaN(v) ? null : v);
                        }}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-600 text-[11px]">
                      Día del mes en que vence el pago.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Ciclo de facturación — dos columnas */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="default_cycle_start_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300 text-sm">Inicio de ciclo <span className="text-red-400">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={31}
                          placeholder="Día (1–31)"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const v = parseInt(e.target.value);
                            field.onChange(isNaN(v) ? null : v);
                          }}
                          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                        />
                      </FormControl>
                      <FormDescription className="text-zinc-600 text-[11px]">
                        Día en que inicia el ciclo.
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="default_cycle_end_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300 text-sm">Fin de ciclo <span className="text-red-400">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={31}
                          placeholder="Día (1–31)"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const v = parseInt(e.target.value);
                            field.onChange(isNaN(v) ? null : v);
                          }}
                          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                        />
                      </FormControl>
                      <FormDescription className="text-zinc-600 text-[11px]">
                        Día en que cierra el ciclo.
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {isEdit && card ? (
              <>
                <Separator className="bg-zinc-800" />
                <CreditLimitHistory
                  cardId={card.id}
                  currencies={card.currencies?.length ? card.currencies : ["PEN"]}
                  changes={cardLimitChanges}
                />
              </>
            ) : (
              <>
                <Separator className="bg-zinc-800" />
                <FormField
                  control={form.control}
                  name="initial_credit_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300 text-sm">
                        Línea de crédito inicial <span className="text-zinc-600 font-normal">(opcional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="Ej. 5000"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            field.onChange(isNaN(v) ? undefined : v);
                          }}
                          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
                        />
                      </FormControl>
                      <FormDescription className="text-zinc-600 text-[11px]">
                        En {SUPPORTED_CURRENCIES.find((c) => c.code === (form.watch("currencies")?.[0] ?? "PEN"))?.label ?? "S/ Soles"}. Podés ajustarla después desde el historial de la tarjeta.
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </>
            )}

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
                {isPending ? "Guardando…" : isEdit ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

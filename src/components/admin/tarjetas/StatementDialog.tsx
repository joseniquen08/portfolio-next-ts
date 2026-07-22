"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseISO, subMonths } from "date-fns";
import { HiPlus, HiX } from "react-icons/hi";
import { toast } from "sonner";
import { CurrencyInput } from "./CurrencyInput";
import { DatePickerField } from "./DatePickerField";
import { StatementAdvances } from "./StatementAdvances";
import { Tables } from "@/types/database.types";
import {
  upsertStatement,
  deleteStatement,
} from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import { cn } from "@/utils/shadcn";
import { periodTitle, currencySymbol, amountEntries, computeSettlement, StatementWithAdvances } from "./status";

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
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type CreditCard = Tables<"credit_cards">;
type Statement  = Tables<"card_statements">;

// ─── Currencies ────────────────────────────────────────────────────────────────

const SUPPORTED_CURRENCIES = ["PEN", "USD", "EUR", "GBP"] as const;

// ─── Schema ────────────────────────────────────────────────────────────────────

const statusEnum = z.enum(["estimado", "por_pagar", "pagado"]);

const schema = z.object({
  amountRows: z.array(z.object({
    currency: z.string().min(1),
    amount:   z.number().min(0, "Debe ser ≥ 0"),
  })).min(1, "Agrega al menos un monto"),
  status:      statusEnum,
  due_date:    z.string().optional(),
  cycle_start: z.string().optional(),
  cycle_end:   z.string().optional(),
  insurance_amount: z.number().min(0, "Debe ser ≥ 0"),
});

type FormValues = z.infer<typeof schema>;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function deriveStatus(s: Statement): FormValues["status"] {
  if (s.is_paid)      return "pagado";
  if (s.is_estimated) return "estimado";
  return "por_pagar";
}

function statusToFlags(status: FormValues["status"]) {
  return {
    is_paid:      status === "pagado",
    is_estimated: status === "estimado",
  };
}

function defaultDueDate(card: CreditCard, period: string): string | undefined {
  if (!card.default_payment_day) return undefined;
  const [y, m] = period.split("-");
  const maxDay = new Date(parseInt(y), parseInt(m), 0).getDate();
  const day = Math.min(card.default_payment_day, maxDay);
  return `${y}-${m}-${String(day).padStart(2, "0")}`;
}

function cycleDate(day: number | null | undefined, period: string, monthsBack: number): string | undefined {
  if (!day) return undefined;
  const d = subMonths(parseISO(period), monthsBack);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const maxDay = new Date(y, m, 0).getDate();
  return `${y}-${String(m).padStart(2, "0")}-${String(Math.min(day, maxDay)).padStart(2, "0")}`;
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  open:       boolean;
  card?:      CreditCard;
  period?:    string;
  statement?: StatementWithAdvances;
  onClose:    () => void;
}

// ─── Dialog ────────────────────────────────────────────────────────────────────

export function StatementDialog({ open, card, period, statement, onClose }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!statement;
  const periodMonthEnd   = period ? subMonths(parseISO(period), 1) : undefined;
  const periodMonthStart = period ? subMonths(parseISO(period), 2) : undefined;

  // When advances already fully cover the statement, "pagado" is the only
  // consistent status — deleting/reducing advances is what should change
  // it, not a manual override that the next advance edit would silently undo.
  const fullyCoveredByAdvances = statement
    ? computeSettlement(statement.amounts, statement.advances ?? []).fullyCovered
    : false;

  // Desgravamen must be actively entered/confirmed. Pre-populated on edit
  // (the value is already visible, which satisfies the "confirmation" intent);
  // must be explicitly touched by the user when creating a new statement.
  const [insuranceTouched, setInsuranceTouched] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountRows: [{ currency: "PEN", amount: 0 }],
      status:      "por_pagar",
      due_date:    undefined,
      cycle_start: undefined,
      cycle_end:   undefined,
      insurance_amount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "amountRows",
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (!open) return;
    const cardCurrencies = card?.currencies ?? ["PEN"];
    const defaultRows = cardCurrencies.map((c) => ({ currency: c, amount: 0 }));
    if (statement) {
      const entries = amountEntries(statement.amounts);
      form.reset({
        amountRows: entries.length > 0
          ? entries.map(([currency, amount]) => ({ currency, amount }))
          : defaultRows,
        status:      deriveStatus(statement),
        due_date:    statement.due_date    ?? undefined,
        cycle_start: statement.cycle_start ?? undefined,
        cycle_end:   statement.cycle_end   ?? undefined,
        insurance_amount: Number(statement.insurance_amount ?? 0),
      });
      // Already visibly populated on edit — counts as confirmed.
      setInsuranceTouched(true);
    } else {
      form.reset({
        amountRows: defaultRows,
        status:      "por_pagar",
        due_date:    card && period ? defaultDueDate(card, period)        : undefined,
        cycle_start: card && period ? cycleDate(card.default_cycle_start_day, period, 2) : undefined,
        cycle_end:   card && period ? cycleDate(card.default_cycle_end_day,   period, 1) : undefined,
        insurance_amount: 0,
      });
      setInsuranceTouched(false);
    }
  }, [open, statement, card, period, form]);

  function onSubmit(values: FormValues) {
    if (!card || !period) return;
    if (!insuranceTouched) {
      form.setError("insurance_amount", { type: "manual", message: "Ingresa el desgravamen" });
      return;
    }
    // Convert rows to amounts record
    const amounts: Record<string, number> = {};
    for (const row of values.amountRows) {
      amounts[row.currency] = (amounts[row.currency] ?? 0) + row.amount;
    }
    startTransition(async () => {
      try {
        await upsertStatement({
          card_id:     card.id,
          period,
          amounts,
          due_date:    values.due_date    ?? null,
          cycle_start: values.cycle_start ?? null,
          cycle_end:   values.cycle_end   ?? null,
          insurance_amount: values.insurance_amount,
          ...statusToFlags(values.status),
        });
        toast.success(isEdit ? "Estado de cuenta actualizado" : "Estado de cuenta guardado");
        onClose();
      } catch {
        toast.error("No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  function handleDelete() {
    if (!card || !period) return;
    const advanceCount = statement?.advances?.length ?? 0;
    if (advanceCount > 0) {
      const plural = advanceCount === 1 ? "adelanto registrado" : "adelantos registrados";
      if (!window.confirm(`Este estado de cuenta tiene ${advanceCount} ${plural}. Eliminarlo también elimina esos adelantos. ¿Continuar?`)) {
        return;
      }
    }
    startTransition(async () => {
      try {
        await deleteStatement(card.id, period);
        toast.success("Estado de cuenta eliminado");
        onClose();
      } catch {
        toast.error("No se pudo eliminar. Intenta de nuevo.");
      }
    });
  }

  // Currencies enabled for this card (fallback to all supported if unset)
  const cardCurrencies = (card?.currencies?.length
    ? card.currencies.filter((c) => (SUPPORTED_CURRENCIES as readonly string[]).includes(c))
    : SUPPORTED_CURRENCIES) as readonly string[];

  // Which currencies haven't been added yet
  const usedCurrencies = form.watch("amountRows").map((r) => r.currency);
  const availableCurrencies = cardCurrencies.filter((c) => !usedCurrencies.includes(c));

  const title = card && period
    ? `${card.name} — ${periodTitle(period)}`
    : isEdit ? "Editar estado de cuenta" : "Nuevo estado de cuenta";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-white"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-white text-lg">{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* ── Monto ──────────────────────────────────────────────── */}
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Monto <span className="text-red-400 normal-case">*</span>
              </p>
              <div className="space-y-2">
                {fields.map((field, index) => {
                  const rowCurrency = form.watch(`amountRows.${index}.currency`);
                  return (
                    <div key={field.id} className="flex items-center gap-2">
                      {/* Currency select — compact, matches input height */}
                      <Select
                        value={rowCurrency}
                        onValueChange={(v) => form.setValue(`amountRows.${index}.currency`, v)}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-16 w-auto shrink-0 rounded-md border border-zinc-700 bg-zinc-800 px-3 text-sm font-semibold text-white",
                            "focus:outline-none focus:ring-1 focus:ring-zinc-500 cursor-pointer"
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value={rowCurrency} className="focus:bg-zinc-700 focus:text-white">
                            {rowCurrency}
                          </SelectItem>
                          {cardCurrencies.filter(
                            (c) => c !== rowCurrency && !usedCurrencies.includes(c)
                          ).map((c) => (
                            <SelectItem key={c} value={c} className="focus:bg-zinc-700 focus:text-white">
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormField
                        control={form.control}
                        name={`amountRows.${index}.amount`}
                        render={({ field: f }) => (
                          <FormItem className="flex-1 min-w-0">
                            <FormControl>
                              <CurrencyInput
                                value={f.value}
                                onChange={f.onChange}
                                symbol={currencySymbol(rowCurrency)}
                                autoFocus={index === 0}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-md shrink-0",
                            "text-zinc-600 hover:text-red-400 hover:bg-red-950/20",
                            "border border-transparent hover:border-red-900/40 transition-colors cursor-pointer"
                          )}
                        >
                          <HiX className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {availableCurrencies.length > 0 && (
                <button
                  type="button"
                  onClick={() => append({ currency: availableCurrencies[0], amount: 0 })}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  <HiPlus className="w-3.5 h-3.5" />
                  Agregar moneda
                </button>
              )}
            </div>

            {/* ── Estado ─────────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                    Estado <span className="text-red-400 normal-case">*</span>
                  </p>
                  <FormControl>
                    {/* Segmented control — no radio chrome */}
                    <div className="flex rounded-lg border border-zinc-800 overflow-hidden divide-x divide-zinc-800">
                      {(
                        [
                          { value: "estimado",  label: "Estimado",  dot: "bg-amber-500"   },
                          { value: "por_pagar", label: "Por pagar", dot: "bg-sky-500"     },
                          { value: "pagado",    label: "Pagado",    dot: "bg-emerald-500" },
                        ] as const
                      ).map((opt) => {
                        const locked = fullyCoveredByAdvances && opt.value !== "pagado";
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            disabled={locked}
                            onClick={() => field.onChange(opt.value)}
                            title={locked ? "Los adelantos ya cubren el total. Elimina o reduce los adelantos para cambiar este estado." : undefined}
                            className={cn(
                              "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors",
                              locked
                                ? "text-zinc-700 cursor-not-allowed"
                                : "cursor-pointer",
                              !locked && field.value === opt.value
                                ? "bg-zinc-800 text-white"
                                : !locked && "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
                            )}
                          >
                            <span className={cn("w-2 h-2 rounded-full shrink-0", locked ? "bg-zinc-700" : opt.dot)} />
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  {fullyCoveredByAdvances && (
                    <p className="text-[11px] text-zinc-600">
                      Los adelantos cubren el total de este período — el estado queda fijo en &quot;Pagado&quot;.
                    </p>
                  )}
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* ── Desgravamen ────────────────────────────────────────── */}
            <FormField
              control={form.control}
              name="insurance_amount"
              render={({ field }) => (
                <FormItem>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                    Desgravamen <span className="text-red-400 normal-case">*</span>
                  </p>
                  <FormControl>
                    <CurrencyInput
                      value={field.value}
                      onChange={(v) => {
                        field.onChange(v);
                        setInsuranceTouched(true);
                        form.clearErrors("insurance_amount");
                      }}
                      symbol={currencySymbol(card?.currencies?.[0])}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            <Separator className="bg-zinc-800" />

            {/* ── Fechas ─────────────────────────────────────────────── */}
            <div className="space-y-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Fechas <span className="normal-case font-normal text-zinc-600">(opcional)</span>
              </p>

              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-400 text-xs">Vencimiento</FormLabel>
                    <FormControl>
                      <DatePickerField
                        value={field.value}
                        onChange={field.onChange}
                        periodMonth={periodMonthEnd}
                        placeholder="Seleccionar fecha"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div>
                <p className="text-xs text-zinc-400 mb-2">Ciclo de facturación</p>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="cycle_start"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-500 text-xs">Inicio</FormLabel>
                        <FormControl>
                          <DatePickerField
                            value={field.value}
                            onChange={field.onChange}
                            periodMonth={periodMonthStart}
                            placeholder="Inicio"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cycle_end"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-500 text-xs">Fin</FormLabel>
                        <FormControl>
                          <DatePickerField
                            value={field.value}
                            onChange={field.onChange}
                            periodMonth={periodMonthEnd}
                            placeholder="Fin"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* ── Adelantos ──────────────────────────────────────────── */}
            <StatementAdvances statement={statement} currencies={cardCurrencies} />

            {/* ── Footer ─────────────────────────────────────────────── */}
            <DialogFooter className="gap-2 pt-2">
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
                {isPending ? "Guardando…" : isEdit ? "Actualizar" : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

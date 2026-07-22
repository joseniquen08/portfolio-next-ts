"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { HiOutlineCalendar } from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

/**
 * Shared date picker field for the tarjetas admin module.
 * Extracted from StatementDialog so StatementAdvances/CreditLimitHistory
 * can reuse the same control instead of duplicating it.
 */
export function DatePickerField({
  value,
  onChange,
  periodMonth,
  placeholder = "Seleccionar fecha",
}: {
  value: string | undefined;
  onChange: (v: string | undefined) => void;
  periodMonth?: Date;
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
          {selected
            ? format(selected, "d 'de' MMMM yyyy", { locale: es })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? periodMonth}
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

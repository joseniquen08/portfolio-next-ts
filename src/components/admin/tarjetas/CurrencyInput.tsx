"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/shadcn";
import { Input } from "@/components/ui/input";

interface Props {
  value:          number;
  onChange:       (value: number) => void;
  symbol?:        string;
  allowNegative?: boolean;
  className?:     string;
  id?:            string;
  autoFocus?:     boolean;
}

export function CurrencyInput({
  value,
  onChange,
  symbol = "S/",
  allowNegative = false,
  className,
  id,
  autoFocus,
}: Props) {
  const [cents,    setCents]    = useState(() => Math.round(Math.abs(value) * 100));
  const [negative, setNegative] = useState(value < 0);
  const [focused,  setFocused]  = useState(false);

  useEffect(() => {
    setCents(Math.round(Math.abs(value) * 100));
    setNegative(value < 0);
  }, [value]);

  function emit(c: number, neg: boolean) {
    const decimal = c / 100;
    onChange(neg && decimal !== 0 ? -decimal : decimal);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
      const newCents = cents * 10 + parseInt(e.key);
      if (newCents <= 99_999_999) { setCents(newCents); emit(newCents, negative); }
    } else if (e.key === "Backspace") {
      e.preventDefault();
      const newCents = Math.floor(cents / 10);
      setCents(newCents);
      emit(newCents, negative);
    }
  }

  function toggleSign() {
    const next = !negative;
    setNegative(next);
    emit(cents, next);
  }

  const isZero = cents === 0;

  // Split into integer and decimal parts for styling
  const intPart = Math.floor(cents / 100).toLocaleString("es-PE");
  const decPart = String(cents % 100).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative flex items-center h-16 w-full rounded-md border bg-zinc-800 border-zinc-700",
        "focus-within:ring-1 focus-within:ring-zinc-500 transition-shadow",
        className
      )}
    >
      {/* Currency symbol — top-left, small */}
      <span className="absolute left-4 top-3 text-[11px] font-medium tracking-widest text-zinc-500 uppercase select-none pointer-events-none leading-none">
        {symbol}
      </span>

      {/* Sign toggle — bottom-left, only when allowNegative */}
      {allowNegative && (
        <button
          type="button"
          onClick={toggleSign}
          tabIndex={-1}
          className={cn(
            "absolute left-4 bottom-2.5 text-xs font-mono font-bold select-none cursor-pointer transition-colors focus:outline-none",
            negative ? "text-red-400 hover:text-red-300" : "text-zinc-600 hover:text-zinc-400"
          )}
          title={negative ? "Clic para positivo" : "Clic para negativo"}
        >
          {negative ? "−" : "+"}
        </button>
      )}

      {/* Hidden-but-focusable input */}
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        autoFocus={autoFocus}
        value={`${intPart}.${decPart}`}
        onKeyDown={handleKeyDown}
        onChange={() => {}}
        onPaste={(e) => e.preventDefault()}
        onFocus={(e) => { e.target.select(); setFocused(true); }}
        onBlur={() => setFocused(false)}
        aria-label="Monto"
        className="absolute inset-0 opacity-0 w-full h-full cursor-text focus:outline-none"
      />

      {/* Visual amount display — right-aligned, large mono */}
      <div
        aria-hidden
        className={cn(
          "absolute right-4 bottom-2.5 flex items-baseline gap-0.5 select-none pointer-events-none font-sans",
          isZero && !focused ? "text-zinc-600"
          : negative         ? "text-red-400"
          : "text-white"
        )}
      >
        <span className="text-3xl font-semibold tracking-tight leading-none tabular-nums">
          {intPart}
        </span>
        <span className="text-xl font-semibold tracking-tight leading-none tabular-nums">
          .{decPart}
        </span>
      </div>
    </div>
  );
}

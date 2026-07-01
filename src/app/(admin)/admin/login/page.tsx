"use client";

import { useRef, useState, ClipboardEvent, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/utils/shadcn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emailSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
});
type EmailValues = z.infer<typeof emailSchema>;

// ─── OTP Input ────────────────────────────────────────────────────────────────

function OtpInput({
  onComplete,
  disabled,
}: {
  onComplete: (code: string) => void;
  disabled: boolean;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function submit(values: string[]) {
    const code = values.join("");
    if (code.length === 6) onComplete(code);
  }

  function handleChange(index: number, raw: string) {
    const value = raw.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, i) => (i === index ? value : d));
    setDigits(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
    submit(next);
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = digits.map((d, i) => (i === index ? "" : d));
        setDigits(next);
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
        const next = digits.map((d, i) => (i === index - 1 ? "" : d));
        setDigits(next);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = ["", "", "", "", "", ""].map((_, i) => pasted[i] ?? "");
    setDigits(next);
    const focusIdx = Math.min(pasted.length, 5);
    refs.current[focusIdx]?.focus();
    submit(next);
  }

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          autoFocus={i === 0}
          autoComplete={i === 0 ? "one-time-code" : "off"}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "w-11 h-14 text-center text-xl font-mono font-semibold rounded-lg border outline-none transition-all",
            "bg-zinc-900 text-white border-zinc-700 cursor-text",
            "focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            digit && "border-zinc-500"
          )}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
  });

  async function onSubmitEmail(values: EmailValues) {
    setLoading(true);
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: { shouldCreateUser: false },
    });
    setLoading(false);
    if (error) {
      setServerError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    } else {
      setEmail(values.email);
      setStep("otp");
    }
  }

  async function onOtpComplete(token: string) {
    setLoading(true);
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    setLoading(false);
    if (error) {
      setServerError("Código incorrecto o expirado.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm px-6">
        <div className="mb-8 text-center">
          <p className="text-zinc-500 text-sm font-mono tracking-widest uppercase">Panel</p>
          <h1 className="text-white text-2xl font-semibold mt-1">Acceso privado</h1>
        </div>

        {step === "email" ? (
          <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-400">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                {...emailForm.register("email")}
                className={cn(
                  "bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500",
                  emailForm.formState.errors.email && "border-red-500"
                )}
              />
              {emailForm.formState.errors.email && (
                <p className="text-xs text-red-400">{emailForm.formState.errors.email.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-xs text-red-400 rounded-md border border-red-900 bg-red-950/40 px-3 py-2">
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-zinc-900 hover:bg-white/90"
            >
              {loading ? "Enviando…" : "Enviar código"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-zinc-500 text-sm text-center">
              Revisa tu correo e ingresa el código.
            </p>

            <OtpInput onComplete={onOtpComplete} disabled={loading} />

            {serverError && (
              <p className="text-xs text-red-400 text-center rounded-md border border-red-900 bg-red-950/40 px-3 py-2">
                {serverError}
              </p>
            )}

            {loading && (
              <p className="text-xs text-zinc-500 text-center">Verificando…</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

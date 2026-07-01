import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full max-w-6xl px-2 py-2 md:py-16 mx-auto space-y-4 lg:px-16 text-custom-light-text dark:text-custom-dark-text h-full flex-1">
      <h2 className="text-5xl font-semibold">404 Página no encontrada</h2>
      <p className="text-xl font-medium">
        No se pudo encontrar el recurso solicitado.
      </p>
      <Link href="/" className="font-semibold underline underline-offset-2">
        Regresar al inicio
      </Link>
    </div>
  );
}

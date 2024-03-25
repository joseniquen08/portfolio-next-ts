import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div className="flex flex-col gap-5 pt-20" id="schedule-class">
      <p className="text-3xl font-semibold">Preguntas frecuentes</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="text-base">
              ¿Cuánto es la duración de cada clase?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="max-w-[80ch]">
              La duración mínima por clase es de 1 hora. Además, no está
              permitido clases con intervalos que no sean de 1 hora. Por ejemplo
              una clase de 2 horas y 30 minutos o de 4 horas con 15 minutos no
              pueden ser programadas.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <span className="text-base">
              ¿Cómo puedo hacer uso del Pack que he adquirido?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="max-w-[80ch]">
              Los Packs de clases están diseñados para adaptarse a tus
              necesidades de aprendizaje. Por ejemplo, para el Pack x5, puedes
              distribuir las sesiones de la siguiente manera: tomar 5 sesiones
              de 1 hora cada una, o combinarlas en sesiones más largas, como 2
              sesiones de 2 horas y una sesión de 1 hora, o incluso una sesión
              de 3 horas y otra de 2 horas. Esta flexibilidad te permite ajustar
              el tiempo de clase según tu disponibilidad y preferencia. Esto
              aplica para los Packs superiores al x1.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <span className="text-base">
              ¿Cuál es el proceso de pago para las clases?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="max-w-[80ch]">
              En el caso del Pack x1, se realiza un pago inicial del 50% antes
              de la sesión. Una vez completa la clase, se realiza el pago
              restante. Este método me permite garantizar tanto tu compromiso
              como la calidad del servicio ofrecido. Para los otros Packs, se
              puede realizar de la misma manera, ya sea por sesión o por Pack
              completo (50% antes de la primera sesión y el restante después de
              la última).
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            <span className="text-base">¿Cuáles son los métodos de pago?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="max-w-[80ch]">
              Cuento con Yape, Plin y cuentas bancarias en los bancos Interbank
              y BCP. Toda coordinación del pago será realizada por WhatsApp.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

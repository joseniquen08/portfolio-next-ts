import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import es from "@fullcalendar/core/locales/es";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import { debounce } from "@/utils/debounce";
import { Modal } from "flowbite-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { HiInformationCircle } from "react-icons/hi";
import { ImSpinner } from "react-icons/im";
import { dateToString } from "@/utils/dateToString";

const phoneRegex = new RegExp(/^([9])+(\d{8})$/g);

const FormSchema = z.object({
  start_time: z.string(),
  end_time: z.string(),
  name: z
    .string({
      required_error: "Ingrese su nombre",
    })
    .min(1, {
      message: "Ingrese su nombre",
    }),
  email: z
    .string({
      required_error: "Ingrese su correo",
    })
    .email({
      message: "Ingrese un correo válido",
    })
    .min(1, { message: "Ingrese su correo" }),
  phone: z
    .string({
      required_error: "Ingrese su número de celular",
    })
    .regex(phoneRegex, "Número inválido")
    .min(1, { message: "Ingrese su número de celular" }),
});

interface Props {
  tech: string;
}

export function Calendar({ tech }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [startToCreate, setStartToCreate] = useState<string>("");
  const [endToCreate, setEndToCreate] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isValid },
  } = form;

  const handleDateClick: (event: DateSelectArg) => void = debounce(
    (event: DateSelectArg) => {
      const start = dateToString(event.start).split(".")[0];
      const end = dateToString(event.end).split(".")[0];
      setStartToCreate(start);
      setEndToCreate(end);
      form.setValue("start_time", start.split("T")[1]);
      form.setValue("end_time", end.split("T")[1]);
      setOpenModal(true);
    },
    50
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await fetch("/api/classes/create/event", {
      method: "POST",
      body: JSON.stringify({
        start: startToCreate,
        end: endToCreate,
        summary: `${tech.toUpperCase()} - Reservado`,
        description: `Clase de ${tech} - ${data.name}`,
        attendee_name: data.name,
        attendee_email: data.email,
        phone: data.phone,
      }),
    });

    const data_response = await response.json();

    if (data_response == "Accepted") {
      form.reset();
      setOpenModal(false);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 pt-20" id="schedule-class">
      <p className="text-3xl font-semibold">Agenda una clase</p>
      <div>
        <p className="text-lg max-w-[80ch]">
          ¡Verifica mi disponibilidad y agenda una clase conmigo!
        </p>
        <p className="text-custom-light-text/70 dark:text-custom-dark-text/60 max-w-[80ch]">
          El rango diario es desde las 6 am hasta las 12 am
        </p>
      </div>
      <div>
        <p className="max-w-[80ch] text-custom-light-text/70 dark:text-custom-dark-text/60 inline-flex items-start gap-1">
          <HiInformationCircle size={22} className="flex-none mt-0.5" /> Manten
          pulsado y arrastra. Si vas a adquirir tu primera clase gratuita,
          asegúrate de agendar 1 hora, ya que de otra manera no será validado.
        </p>
      </div>
      <div className="max-w-4xl w-full h-full mx-auto">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
          googleCalendarApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}`}
          events={{
            googleCalendarId: `${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID}`,
            className: "gcal-event",
          }}
          eventColor="#421fa3"
          eventContent={(event) => {
            return {
              html: `<div class="fc-event-main-frame"><div class="fc-event-time">${event.timeText}</div><div class="fc-event-title-container"><div class="fc-event-title fc-sticky">${event.event._def.title}</div></div></div>`,
            };
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
          }}
          locale={es}
          initialView="timeGridWeek"
          aspectRatio={1.7}
          height={600}
          expandRows={true}
          stickyFooterScrollbar={true}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "timeGridWeek timeGridDay",
          }}
          titleFormat={{ year: "numeric", month: "long" }}
          firstDay={1}
          dayHeaderFormat={{ weekday: "long", day: "2-digit" }}
          buttonText={{
            week: "Semana",
            day: "Día",
          }}
          windowResize={function (arg: any) {
            if (arg.view.calendar.el.clientWidth < 400) {
              arg.view.calendar.changeView("timeGridDay");
            } else {
              arg.view.calendar.changeView("timeGridWeek");
            }
          }}
          allDaySlot={false}
          selectable={true}
          selectOverlap={false}
          select={handleDateClick}
          scrollTime={new Date().toLocaleTimeString()}
          slotDuration="01:00:00"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotMinTime="06:00:00"
          slotMaxTime="24:00:00"
          snapDuration="00:30:00"
        />
      </div>
      <Modal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          form.reset();
        }}
        className="bg-custom-light-bg dark:bg-custom-dark-bg"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Modal.Header className="py-3 px-4 border bg-custom-light-bg dark:bg-custom-dark-bg">
              Agendar una clase de {tech}
            </Modal.Header>
            <Modal.Body className="border-l-[1px] border-r-[1px] dark:border-gray-600 bg-custom-light-bg dark:bg-custom-dark-bg">
              <div className="w-full grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                        Hora inicial
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Inicio"
                          {...field}
                          className="text-stone-600 font-semibold dark:text-stone-400 read-only:bg-custom-light-text/5 dark:read-only:bg-custom-dark-text/5"
                          readOnly
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                        Hora final
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Final"
                          {...field}
                          className="text-stone-600 font-semibold dark:text-stone-400 read-only:bg-custom-light-text/5 dark:read-only:bg-custom-dark-text/5"
                          readOnly
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                        Nombres
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-custom-light-text font-medium dark:text-custom-dark-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                        Correo electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          className="text-custom-light-text font-medium dark:text-custom-dark-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                        Celular (sin código de país)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          className="text-custom-light-text font-medium dark:text-custom-dark-text"
                        />
                      </FormControl>
                      <FormDescription>
                        Es necesario el número de celular para contactarme
                        contigo (WhatsApp) y brintarte más información. Además,
                        para confirmar la clase y coordinar los pagos.{" "}
                        <span className="font-semibold">
                          Estate atento a mi comunicación, será lo más pronto
                          posible.
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="py-3 px-4 border justify-end bg-custom-light-bg dark:bg-custom-dark-bg">
              <Button
                disabled={!isValid || loading}
                type="submit"
                variant="destructive"
              >
                {loading ? (
                  <>
                    <ImSpinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Cargando...
                  </>
                ) : (
                  <>Confirmar</>
                )}
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
    </div>
  );
}

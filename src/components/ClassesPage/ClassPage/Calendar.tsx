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

const FormSchema = z.object({
  start_time: z.date(),
  end_time: z.date(),
  name: z.string(),
  email: z.string(),
});

export function Calendar() {
  const [openModal, setOpenModal] = useState(false);
  const [startToCreate, setStartToCreate] = useState("");
  const [endToCreate, setEndToCreate] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start_time: new Date(),
      end_time: new Date(),
      name: "",
      email: "",
    },
  });

  const handleDateClick: (event: DateSelectArg) => void = debounce(
    (event: DateSelectArg) => {
      const start_formatted = new Intl.DateTimeFormat("es-PE", {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(event.start)
        .split("/")
        .reverse()
        .join("-");
      const end_formatted = new Intl.DateTimeFormat("es-PE", {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(event.start)
        .split("/")
        .reverse()
        .join("-");
      console.log(start_formatted);
      const start_array = event.start.toLocaleString().split(", ");
      const end_array = event.end.toLocaleString().split(", ");
      const start = start_formatted + "T" + start_array[1];
      const end = end_formatted + "T" + end_array[1];
      setStartToCreate(start);
      setEndToCreate(end);
      form.setValue("start_time", event.start);
      form.setValue("end_time", event.end);
      setOpenModal(true);
    },
    50
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/classes/create/event", {
      method: "POST",
      body: JSON.stringify({
        start: startToCreate,
        end: endToCreate,
        summary: "JAVASCRIPT - Reservado",
        description: "Clase de JavaScript - " + data.name,
        attendee_name: data.name,
        attendee_email: data.email,
      }),
    });

    const data_response = await response.json();

    if (data_response == "Accepted") {
      setOpenModal(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 pt-20" id="schedule-class">
      <p className="text-3xl font-semibold">Agenda una clase</p>
      <div>
        <p className="text-lg max-w-[80ch]">
          ¡Verifica mi disponibilidad y agenda una clase conmigo!
        </p>
        <p className="text-custom-light-text/70 dark:text-custom-dark-text/60">
          El rango diario es desde las 6 am hasta las 11 pm
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
          allDaySlot={false}
          selectable={true}
          selectOverlap={false}
          select={handleDateClick}
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
        onClose={() => setOpenModal(false)}
        className="bg-custom-light-bg dark:bg-custom-dark-bg"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Modal.Header className="py-3 px-4 border bg-custom-light-bg dark:bg-custom-dark-bg">
              Agendar una clase
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
                          value={
                            field.value instanceof Date
                              ? field.value.toLocaleTimeString()
                              : field.value
                          }
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
                          value={
                            field.value instanceof Date
                              ? field.value.toLocaleTimeString()
                              : field.value
                          }
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
              </div>
            </Modal.Body>
            <Modal.Footer className="py-3 px-4 border justify-end bg-custom-light-bg dark:bg-custom-dark-bg">
              <Button type="submit" variant="destructive">
                Confirmar
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prices } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { z } from "zod";

const FormSchema = z.object({
  pack: z.string(),
  quantity: z.string(),
  name: z.string().min(1, {
    message: "Ingrese su nombre",
  }),
});

export function Packs() {
  const [apprPrice, setApprPrice] = useState<string>("0.00");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const {
    watch,
    formState: { isValid },
  } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let quantity;
    if (data.quantity === "x1") {
      quantity = `de%20manera%20individual`;
    } else {
      quantity = `para%20${data.quantity.split("x")[1]}%20personas`;
    }
    const text = `https://api.whatsapp.com/send?phone=51933839178&text=Hola,%20mi%20nombre%20es%20${data.name}%20👋.%0A%0AEstoy%20interesad@%20en%20adquirir%20el%20Pack%20${data.pack},%20${quantity}.%0A%0AEstaré%20atent@%20a%20tu%20respuesta%20😄.`;

    window.open(text, "_blank");
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && (name === "pack" || name === "quantity")) {
        if (value.pack && value.quantity) {
          const price = prices.find((price) => price.value == value.pack!)!;
          let total;
          switch (value.quantity) {
            case "x1":
              total = price.x1.discount.toFixed(2);
              break;
            case "x2":
              total = price.x2.discount.toFixed(2);
              break;
            case "x3":
              total = price.x3.discount.toFixed(2);
              break;
            case "x4":
              total = price.x4.discount.toFixed(2);
              break;
            case "x5":
              total = price.x5.discount.toFixed(2);
              break;
            default:
              total = "0.00";
              break;
          }
          setApprPrice(total);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="flex flex-col gap-6 pt-20">
      <p className="text-3xl font-semibold">Adquiere un pack de clases</p>
      <div>
        <p className="text-lg max-w-[80ch]">
          Si adquieres un pack de clases, obtendrás un descuento especial. Si lo
          adquieres con tus amigos, ¡el descuento será mayor!
        </p>
        <p className="text-custom-light-text/70 dark:text-custom-dark-text/60">
          El máximo de estudiantes por clase es 5
        </p>
      </div>
      <div>
        <Table>
          <TableCaption>
            Cada item del pack hace referencia a una clase de 1 hora. Se aplica
            descuento sobre descuento.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pack / Cant. alumnos</TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                1 alumno
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                2 alumnos
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                3 alumnos
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                4 alumnos
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                5 alumnos
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price, i) => (
              <TableRow key={price.pack}>
                <TableCell className="font-medium">{price.pack}</TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center px-3 py-2">
                    {i !== 0 && (
                      <del className="text-stone-500 dark:text-stone-400 mr-2 flex-none">
                        S/. {price.x1.real.toFixed(2)}
                      </del>
                    )}
                    <span className="flex-none">
                      S/. {price.x1.discount.toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center px-3 py-2">
                    <del className="text-stone-500 dark:text-stone-400 mr-2 flex-none">
                      S/. {price.x2.real.toFixed(2)}
                    </del>
                    <span className="flex-none">
                      S/. {price.x2.discount.toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center px-3 py-2">
                    <del className="text-stone-500 dark:text-stone-400 mr-2 flex-none">
                      S/. {price.x3.real.toFixed(2)}
                    </del>
                    <span className="flex-none">
                      S/. {price.x3.discount.toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center px-3 py-2">
                    <del className="text-stone-500 dark:text-stone-400 mr-2 flex-none">
                      S/. {price.x4.real.toFixed(2)}
                    </del>
                    <span className="flex-none">
                      S/. {price.x4.discount.toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center px-3 py-2">
                    <del className="text-stone-500 dark:text-stone-400 mr-2 flex-none">
                      S/. {price.x5.real.toFixed(2)}
                    </del>
                    <span className="flex-none">
                      S/. {price.x5.discount.toFixed(2)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border border-custom-light-text/10 dark:border-custom-dark-text/20 rounded-xl px-8 py-6 flex flex-col gap-4">
        <p className="text-2xl font-medium">Elige tu pack</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4">
              <FormField
                control={form.control}
                name="pack"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-6 lg:col-span-2">
                    <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                      Pack
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="x1">Pack x1</SelectItem>
                        <SelectItem value="x5">Pack x5</SelectItem>
                        <SelectItem value="x10">Pack x10</SelectItem>
                        <SelectItem value="x15">Pack x15</SelectItem>
                        <SelectItem value="x20">Pack x20</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-6 lg:col-span-2">
                    <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                      Cant. alumnos
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="x1">1 alumno</SelectItem>
                        <SelectItem value="x2">2 alumnos</SelectItem>
                        <SelectItem value="x3">3 alumnos</SelectItem>
                        <SelectItem value="x4">4 alumnos</SelectItem>
                        <SelectItem value="x5">5 alumnos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-6 lg:col-span-5">
                    <FormLabel className="text-custom-light-text dark:text-custom-dark-text">
                      Nombres del solicitante
                      <FormMessage className="inline-flex ml-2" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-custom-light-text font-medium dark:text-custom-dark-text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-end col-span-1 md:col-span-6 lg:col-span-3">
                <Button
                  disabled={!isValid}
                  type="submit"
                  variant="destructive"
                  className="w-full"
                >
                  <FaWhatsapp className="flex-none mr-1.5" size={20} /> Enviar
                  por WhatsApp
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-custom-light-text/60 dark:text-custom-dark-text/40">
            Precio calculado: S/. {apprPrice}
          </p>
        </div>
      </div>
      <div>
        <p className="text-lg max-w-[80ch]">
          En el caso desees adquirir el Pack x1 de manera individual, puedes
          agendarlo <span className="font-semibold">también</span> en la
          siguiente sección (te recomiendo usar esta opción si es la primera vez
          que tomarás una clase conmigo, ya que{" "}
          <span className="font-semibold text-custom-light-accent dark:text-custom-dark-primary">
            la primera sesión es gratuita con una duración de 1 hora
          </span>
          )
        </p>
      </div>
    </div>
  );
}

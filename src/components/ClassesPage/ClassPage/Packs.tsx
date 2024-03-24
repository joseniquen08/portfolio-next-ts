import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiArrowCircleDown, HiArrowDown } from "react-icons/hi";

const base_price = 20;

const prices = [
  {
    pack: "Pack x1",
    x1: {
      real: `S/. ${base_price * 1 * 1}`,
      discount: `S/. ${base_price * 1 * 1 * 1 * 1}`,
    },
    x2: {
      real: `S/. ${base_price * 1 * 2}`,
      discount: `S/. ${base_price * 1 * 1 * 0.95 * 2}`,
    },
    x3: {
      real: `S/. ${base_price * 1 * 3}`,
      discount: `S/. ${base_price * 1 * 1 * 0.9 * 3}`,
    },
    x4: {
      real: `S/. ${base_price * 1 * 4}`,
      discount: `S/. ${base_price * 1 * 1 * 0.85 * 4}`,
    },
    x5: {
      real: `S/. ${base_price * 1 * 5}`,
      discount: `S/. ${base_price * 1 * 1 * 0.8 * 5}`,
    },
  },
  {
    pack: "Pack x5",
    x1: {
      real: `S/. ${base_price * 5 * 1}`,
      discount: `S/. ${base_price * 5 * 0.95 * 1 * 1}`,
    },
    x2: {
      real: `S/. ${base_price * 5 * 2}`,
      discount: `S/. ${base_price * 5 * 0.9 * 0.95 * 2}`,
    },
    x3: {
      real: `S/. ${base_price * 5 * 3}`,
      discount: `S/. ${base_price * 5 * 0.85 * 0.9 * 3}`,
    },
    x4: {
      real: `S/. ${base_price * 5 * 4}`,
      discount: `S/. ${base_price * 5 * 0.8 * 0.85 * 4}`,
    },
    x5: {
      real: `S/. ${base_price * 5 * 5}`,
      discount: `S/. ${base_price * 5 * 0.75 * 0.8 * 5}`,
    },
  },
  {
    pack: "Pack x10",
    x1: {
      real: `S/. ${base_price * 10 * 1}`,
      discount: `S/. ${base_price * 10 * 0.9 * 1 * 1}`,
    },
    x2: {
      real: `S/. ${base_price * 10 * 2}`,
      discount: `S/. ${base_price * 10 * 0.85 * 0.95 * 2}`,
    },
    x3: {
      real: `S/. ${base_price * 10 * 3}`,
      discount: `S/. ${base_price * 10 * 0.8 * 0.9 * 3}`,
    },
    x4: {
      real: `S/. ${base_price * 10 * 4}`,
      discount: `S/. ${base_price * 10 * 0.75 * 0.85 * 4}`,
    },
    x5: {
      real: `S/. ${base_price * 10 * 5}`,
      discount: `S/. ${base_price * 10 * 0.7 * 0.8 * 5}`,
    },
  },
  {
    pack: "Pack x15",
    x1: {
      real: `S/. ${base_price * 15 * 1}`,
      discount: `S/. ${base_price * 15 * 0.85 * 1 * 1}`,
    },
    x2: {
      real: `S/. ${base_price * 15 * 2}`,
      discount: `S/. ${base_price * 15 * 0.8 * 0.95 * 2}`,
    },
    x3: {
      real: `S/. ${base_price * 15 * 3}`,
      discount: `S/. ${base_price * 15 * 0.75 * 0.9 * 3}`,
    },
    x4: {
      real: `S/. ${base_price * 15 * 4}`,
      discount: `S/. ${base_price * 15 * 0.7 * 0.85 * 4}`,
    },
    x5: {
      real: `S/. ${base_price * 15 * 5}`,
      discount: `S/. ${base_price * 15 * 0.65 * 0.8 * 5}`,
    },
  },
  {
    pack: "Pack x20",
    x1: {
      real: `S/. ${base_price * 20 * 1}`,
      discount: `S/. ${base_price * 20 * 0.8 * 1 * 1}`,
    },
    x2: {
      real: `S/. ${base_price * 20 * 2}`,
      discount: `S/. ${base_price * 20 * 0.75 * 0.95 * 2}`,
    },
    x3: {
      real: `S/. ${base_price * 20 * 3}`,
      discount: `S/. ${base_price * 20 * 0.7 * 0.9 * 3}`,
    },
    x4: {
      real: `S/. ${base_price * 20 * 4}`,
      discount: `S/. ${base_price * 20 * 0.65 * 0.85 * 4}`,
    },
    x5: {
      real: `S/. ${base_price * 20 * 5}`,
      discount: `S/. ${base_price * 20 * 0.6 * 0.8 * 5}`,
    },
  },
];

export function Packs() {
  return (
    <div className="flex flex-col gap-6 pt-20" id="schedule-class">
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
              <TableHead className="">Pack / Cant. alumnos</TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                x1
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                x2
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                x3
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                x4
              </TableHead>
              <TableHead className="text-center font-medium text-custom-light-text dark:text-custom-dark-text">
                x5
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price, i) => (
              <TableRow key={price.pack}>
                <TableCell className="font-medium">{price.pack}</TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center">
                    {i !== 0 && (
                      <del className="text-stone-500 dark:text-stone-400 mr-2">
                        {price.x1.real}
                      </del>
                    )}
                    <span>{price.x1.discount}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center">
                    <del className="text-stone-500 dark:text-stone-400 mr-2">
                      {price.x2.real}
                    </del>
                    <span>{price.x2.discount}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center">
                    <del className="text-stone-500 dark:text-stone-400 mr-2">
                      {price.x3.real}
                    </del>
                    <span>{price.x3.discount}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center">
                    <del className="text-stone-500 dark:text-stone-400 mr-2">
                      {price.x4.real}
                    </del>
                    <span>{price.x4.discount}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-stone-700 dark:text-stone-200">
                  <div className="flex flex-wrap justify-center items-center">
                    <del className="text-stone-500 dark:text-stone-400 mr-2">
                      {price.x5.real}
                    </del>
                    <span>{price.x5.discount}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <p className="text-lg max-w-[80ch]">
          En el caso desees adquirir el Pack x1 de manera individual, puedes
          agendarlo en la siguiente sección (te recomiendo usar esta opción si
          es la primera vez que tomarás una clase conmigo, ya que{" "}
          <span className="font-semibold text-custom-light-accent dark:text-custom-dark-primary">
            la primera sesión es gratuita con una duración de 1 hora
          </span>
          )
        </p>
      </div>
    </div>
  );
}

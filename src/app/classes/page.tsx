import { CardTech } from "@/components/ClassesPage/CardTech";
import { technologies } from "@/utils/constants";

export default function Classes() {
  return (
    <div className="flex flex-col w-full max-w-6xl px-2 py-2 md:py-10 mx-auto space-y-4 lg:px-16">
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="py-1 text-4xl px-12 xs:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-transparent break-words bg-clip-text bg-gradient-to-r from-custom-ligth-accent via-custom-ligth-primary to-custom-ligth-accent dark:from-custom-dark-accent dark:via-custom-dark-primary dark:to-custom-dark-accent text-center">
          Clases personalizadas
        </p>
        <p className="text-custom-ligth-text dark:text-custom-dark-text text-xl font-medium text-center max-w-[60ch]">
          Programar puede ser todo un desafío, pero no te preocupes, estoy aquí
          para hacerte el camino más fácil. ¡Juntos haremos que la programación
          sea pan comido!
        </p>
        <div className="flex flex-wrap justify-center gap-4 w-full text-2xl font-semibold dark:text-custom-dark-text">
          {technologies.map(({ name, icon }, i) => (
            <CardTech key={i} icon={icon} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}

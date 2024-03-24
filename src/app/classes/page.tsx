import { CardTech } from "@/components/ClassesPage/CardTech";
import { Comments } from "@/components/ClassesPage/Comments";
import { Database, Tables } from "@/types/database.types";
import { technologies } from "@/utils/constants";

async function getComments() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/classes/comments`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("Error");
  }
}

export default async function Classes() {
  const comments: Tables<"class_comments">[] = await getComments();

  return (
    <div className="flex flex-col w-full max-w-6xl px-4 py-2 md:py-14 mx-auto space-y-4 lg:px-16 text-custom-light-text dark:text-custom-dark-text">
      <div className="flex flex-col justify-center items-center gap-10">
        <p className="py-1 text-4xl px-12 xs:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-transparent break-words bg-clip-text bg-gradient-to-r from-custom-light-accent via-custom-light-accent to-custom-light-accent dark:from-custom-dark-primary dark:via-custom-dark-primary dark:to-custom-dark-primary text-center">
          Clases personalizadas
        </p>
        <p className="text-xl font-medium text-center max-w-[60ch]">
          Programar puede ser todo un desafío, pero no te preocupes, estoy aquí
          para hacerte el camino más fácil. ¡Juntos haremos que la programación
          sea pan comido!
        </p>
        <div className="flex flex-wrap justify-center gap-4 w-full text-2xl">
          {technologies.map((tech, i) => (
            <CardTech key={i} tech={tech} />
          ))}
        </div>
        <Comments comments={comments} />
      </div>
    </div>
  );
}

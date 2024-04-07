export function Modalities() {
  return (
    <div className="flex flex-col gap-5 mt-12">
      <p className="text-4xl font-semibold text-custom-light-accent dark:text-custom-dark-primary">
        Modalidades
      </p>
      <p className="max-w-[80ch]">
        Para esta tecnología, existen 3 modalidades de enseñanza.
      </p>
      <ul
        role="list"
        className="marker:text-custom-light-accent dark:marker:text-custom-dark-primary list-decimal gap-2 flex flex-col list-inside -mt-3"
      >
        <li className="max-w-[80ch]">
          <span className="font-semibold text-custom-light-accent dark:text-custom-dark-primary">
            Ruta de aprendizaje básica
          </span>{" "}
          divida en niveles, que proporciona un enfoque estructurado para
          dominar gradualmente los conceptos desde principiante hasta un nivel
          más avanzado.
        </li>
        <li className="max-w-[80ch]">
          <span className="font-semibold text-custom-light-accent dark:text-custom-dark-primary">
            Ruta de aprendizaje personalizada
          </span>{" "}
          centrada en los temas que tu institución educativa te brinda,
          respetando el orden y la complejidad requerida.
        </li>
        <li className="max-w-[80ch]">
          <span className="font-semibold text-custom-light-accent dark:text-custom-dark-primary">
            Sesiones Personalizadas
          </span>{" "}
          enfocadas en resolver dudas o dificultades específicas que puedas
          tener durante tu proceso de aprendizaje.
        </li>
      </ul>
    </div>
  );
}

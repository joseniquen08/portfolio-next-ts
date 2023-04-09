interface Props {
  image: string;
  name: string;
}

export const Skill = ({ image, name }: Props) => {
  return (
    <div className="flex items-center space-x-2 hover:bg-stone-500 hover:bg-opacity-10 dark:hover:bg-slate-900/75 px-2 py-1.5 dark:hover:backdrop-blur rounded-lg cursor-default">
      <div className="flex flex-col items-center justify-center overflow-hidden text-center lg:space-y-1 w-7 h-7">
        <div
          className="relative w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(images/${image}.png)` }}
        ></div>
      </div>
      <p className="tracking-normal text-stone-600 dark:text-stone-200">
        {name}
      </p>
    </div>
  );
};

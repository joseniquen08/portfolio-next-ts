import { ReactNode } from "react";

interface Props {
  name: string;
  icon: ReactNode;
}

export function CardTech({ name, icon }: Props) {
  return (
    <div className="w-60 h-36 p-3 flex items-end rounded-lg dark:bg-custom-dark-text/5 relative overflow-hidden">
      <p>{name}</p>
      <div className="absolute -top-4 right-0">{icon}</div>
    </div>
  );
}

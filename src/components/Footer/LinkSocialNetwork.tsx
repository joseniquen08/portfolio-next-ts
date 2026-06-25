import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export const LinkSocialNetwork = ({ href, children }: Props) => {
  return (
    <div className="relative w-11 h-11 group">
      <div className="w-11 h-11 group-hover:bg-custom-light-text/5 rounded-xl dark:group-hover:bg-custom-dark-text/5 transition-colors duration-200"></div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 flex items-center justify-center w-11 h-11"
      >
        {children}
      </a>
    </div>
  );
};

import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export const LinkSocialNetwork = ({ href, children }: Props) => {
  return (
    <div className="relative w-14 h-14 group">
      <div className="w-14 h-14 bg-custom-light-text/5 dark:bg-custom-dark-text/5 rounded-xl group-hover:bg-custom-light-text/10 dark:group-hover:bg-custom-dark-text/10 transition-colors duration-200"></div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 flex items-center justify-center w-14 h-14"
      >
        {children}
      </a>
    </div>
  );
};

import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface ILink {
  href: string;
  className?: string;
  children: ReactNode;
}
export const Link = ({ href, children, className }: ILink) => {
  return (
    <RouterLink className={className} to={href}>
      {children}
    </RouterLink>
  );
};

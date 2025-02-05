import clsx from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...props: (string | undefined | null | boolean)[]): string => {
  return twMerge(clsx(...props));
};

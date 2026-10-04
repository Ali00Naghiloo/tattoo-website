import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Joins class names and resolves Tailwind conflicts (last one wins). */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

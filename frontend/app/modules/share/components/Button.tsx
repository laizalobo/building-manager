import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../helpers";

export const Button = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={cn(
        "py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

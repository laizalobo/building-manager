import { cn } from "../helpers";
import { IconProps } from "../types";

export const CloseIcon = ({
  onClick,
  className,
  width = "1.5rem",
  height = "1.5rem",
}: IconProps) => (
  <svg
    onClick={onClick}
    className={cn("fill-gray-500", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    height={height}
    width={width}
  >
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
);

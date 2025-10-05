import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "rounded-full font-semibold transition-colors duration-200 focus:outline-none";

  const variantClasses = {
    primary:
      "bg-blue-800 text-white hover:bg-blue-700 px-5 py-2 text-sm disabled:bg-blue-300 disabled:text-gray-100 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 px-5 py-2 text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 text-white hover:bg-red-500 px-5 py-2 text-sm disabled:bg-red-300 disabled:text-gray-100 disabled:cursor-not-allowed",
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

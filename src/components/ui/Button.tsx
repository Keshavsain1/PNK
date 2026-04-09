import React from "react";
import { cn } from "../../utils/cn";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost"; className?: string }
> = ({ children, className = "", variant = "primary", ...props }) => {
  const base = "inline-flex items-center gap-2 rounded-md font-medium px-4 py-2 transition";
  const variants =
    variant === "primary"
      ? "bg-brand-brass text-white hover:opacity-95"
      : "bg-transparent border border-gray-200 text-brand-dark hover:bg-gray-50";

  return (
    <button {...props} className={cn(base, variants, className)}>
      {children}
    </button>
  );
};

export default Button;

// src/components/ui/Container.tsx
import React from "react";
import { cn } from "../../utils/cn";

type ContainerProps = React.PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}>;

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ children, className = "", as = "div" }, ref) => {
    const Comp: any = as;
    return (
      <Comp
        ref={ref}
        className={cn("max-w-7xl mx-auto px-6 sm:px-8 w-full", className)}
      >
        {children}
      </Comp>
    );
  }
);

Container.displayName = "Container";

export default Container;

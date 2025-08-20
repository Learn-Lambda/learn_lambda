import React, { createContext, useContext } from "react";

type Mode = "single" | "multiple";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (id: string) => void;
  mode: Mode;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const Accordion: React.FC<{
  children: React.ReactNode;
  defaultValue?: string[];
  value?: string[]; // controlled
  onChange?: (v: string[]) => void;
  mode?: Mode;
  className?: string;
}> = ({
  children,
  defaultValue = [],
  value,
  onChange,
  mode = "multiple",
  className,
}) => {
  const [internal, setInternal] = React.useState<string[]>(defaultValue);
  const openItems = value ?? internal;

  const toggleItem = (id: string) => {
    let next: string[];
    const isOpen = openItems.includes(id);
    if (mode === "single") {
      next = isOpen ? [] : [id];
    } else {
      next = isOpen ? openItems.filter((x) => x !== id) : [...openItems, id];
    }
    if (onChange) onChange(next);
    if (value === undefined) setInternal(next);
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, mode }}>
      <div className={className} style={{ width: "100%" }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("useAccordionContext must be used within Accordion");
  }
  return ctx;
}

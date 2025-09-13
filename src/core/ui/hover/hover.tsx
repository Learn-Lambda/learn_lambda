import React, { useRef, useEffect, ReactElement } from "react";

interface HoverProps {
  children: ReactElement;
  hoverColor?: string;
  defaultColor?: string;
  style?: React.CSSProperties;
}

export const Hover: React.FC<HoverProps> = ({
  children,
  hoverColor = "lightblue",
  defaultColor = "transparent",
  style,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      element.style.backgroundColor = hoverColor;
      element.style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      element.style.backgroundColor = defaultColor;
      element.style.cursor = "default";
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Очистка
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoverColor, defaultColor]);

  // Клонируем элемент и прикрепляем ref

  return (
    <div style={style} ref={ref}>
      {children}
    </div>
  );
  //   return React.cloneElement(children, { ref });
};

import React, { useState, useRef, useEffect } from "react";

const Popover: React.FC<{
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
}> = ({ content, children, position = "bottom" }) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Закрываем поповер при клике вне его
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Простое позиционирование по заданной стороне
  const getPopoverStyle = (): React.CSSProperties => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();

    switch (position) {
      case "top":
        return { position: "absolute", bottom: `calc(100% + 8px)`, left: 0 };
      case "right":
        return { position: "absolute", top: 0, left: `calc(100% + 8px)` };
      case "left":
        return { position: "absolute", top: 0, right: `calc(100% + 8px)` };
      case "bottom":
      default:
        return { position: "absolute", top: `calc(100% + 8px)`, left: 0 };
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        ref={triggerRef}
        onClick={() => setVisible(!visible)}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>

      {visible && (
        <div
          ref={popoverRef}
          style={{
            ...getPopoverStyle(),
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: 4,
            padding: "8px 12px",
            zIndex: 1000,
            minWidth: 200,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;

import React, { useRef } from "react";
import { useAccordionContext } from "./accordion";
import { TextV2 } from "../text/text";
import { Icon, IconType } from "../icon/icon";

export const AccordionItem: React.FC<{
  id: string;
  children: React.ReactNode;
  header: string;
  className?: string;
}> = ({ id, header, children, className }) => {
  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.includes(id);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  return (
    <div style={{ width: "100%" }}>
      <div
        ref={buttonRef}
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Icon type={IconType.right} style={{ height: 15 }} />
        <TextV2
          text={header}
          // aria-expanded={isOpen}
          // aria-controls={`${id}-panel`}
          // id={`${id}-button`}
          onClick={() => toggleItem(id)}
          // onKeyDown={onKeyDown}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

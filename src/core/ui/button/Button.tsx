import React from "react";
import { TextV2 } from "../text/text";

export const Button: React.FC<{
  text?: string;
  color?: string;
  height?: number;
  width?: number;
  onClick?: () => void;
}> = ({ text, color, height, width, onClick }) => (
  <div
    onClick={() => onClick?.()}
    style={{
      backgroundColor: color ?? "#3C50E0",
      height: height ?? 50,
      width: width ?? 470,
      alignContent: "center",
      justifyItems: "center",
      cursor: "pointer",
    }}
  >
    <TextV2 text={text} color="white" />
  </div>
);

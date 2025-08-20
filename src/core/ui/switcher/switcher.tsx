import React from "react";

export const Switcher: React.FC<{
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
}> = ({ isOn, onToggle, disabled = false }) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={isOn}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: isOn ? "#4caf50" : "#ccc",
        borderRadius: "15px",
        width: "50px",
        height: "25px",
        border: "none",
        position: "relative",
        transition: "background-color 0.3s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "2.5px",
          left: isOn ? "26px" : "2.5px",
          width: "20px",
          height: "20px",
          background: "#fff",
          borderRadius: "50%",
          transition: "left 0.3s",
        }}
      />
    </button>
  );
};

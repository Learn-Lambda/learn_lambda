import { useEffect, useRef, useState } from "react";
import { TextV2 } from "../text/text";
import { Icon, IconType } from "../icon/icon";
import { TypedEvent } from "../../helper/typed_event";
export class FormController extends TypedEvent<string> {}
export const InputV2: React.FC<{
  onChange?: (text: string) => void;
  initialValue?: string;
  icon?: IconType;
  label?: string;
  error?: string;
  bgColor?: string;
  solidColor?: string;
  fontSize?: number;
  height?: number | string;
  style?: React.CSSProperties;
  formController?: FormController;
}> = ({
  onChange,
  initialValue,
  label,
  icon,
  error,
  bgColor,
  solidColor,
  fontSize,
  style,
  height,
  formController,
}) => {
  const [value, setValue] = useState(initialValue ?? "");
  const [hasFocus, setFocus] = useState(false);
  const [display, setDisplay] = useState("block");
  const ref = useRef<HTMLDivElement>(null);
  formController?.on((data) => {
    setValue(data);
    ref.current!.innerText = data;
  });

  useEffect(() => {
    setDisplay(getDisplay());
  }, [value, hasFocus]);
  useEffect(() => {
    ref.current?.addEventListener("focus", () => {
      setFocus(true);
    });

    ref.current?.addEventListener("blur", () => {
      setFocus(false);
    });
  });
  const getDisplay = () => {
    if (value.length !== 0 && value.length !== 1) {
      return "none";
    }

    if (hasFocus) {
      return "none";
    }

    return "block";
  };
  return (
    <div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          {icon != undefined ? (
            <Icon
              type={icon}
              color={error != undefined ? "#F44336" : undefined}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <TextV2
          style={Object.assign(style ?? {}, {
            position: "absolute",
            wordWrap: "normal",
            top: 8,
            left: icon != undefined ? 10 : 10,
            pointerEvents: "none",
            display: display,
          })}
          text={label}
          color={error != undefined ? "#F44336" : "#64748B"}
        />
      </div>
      <TextV2
        color="#64748B"
        currentRef={ref}
        onChange={(text) => {
          setValue(text);
          onChange?.(text);
        }}
        text={initialValue}
        isEditable={true}
        style={{
          border: `1.5px solid ${solidColor ?? "#E2E8F0"}`,
          borderRadius: 4,
          height: height ?? 40,
          background: bgColor ?? "#EFF4FB",
          //   width: 470,
          paddingTop: 8,
          paddingBottom: 6,
          paddingLeft: icon != undefined ? 10 : 10,
          overflow: "auto",
          fontSize: fontSize,
        }}
      />
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", bottom: -20 }}>
          <TextV2 text={error} color="#F44336" style={{ paddingLeft: 10 }} />
        </div>
      </div>
    </div>
  );
};

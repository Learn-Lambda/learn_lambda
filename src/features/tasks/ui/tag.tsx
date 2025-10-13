import { useState } from "react";
import { TextV2 } from "../../../core/ui/text/text";

export const Tag: React.FC<{
  tag: string;
  selectCallback: (isSelect: boolean) => void;
  isActive?: boolean;
}> = ({ tag, selectCallback, isActive }) => {
  const [isSelect, setSelect] = useState(isActive ?? false);

  return (
    <>
      <div
        onClick={() => {
          setSelect(!isSelect);
          selectCallback(isSelect);
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",

          height: 22,
          background: isSelect
            ? "rgb(0 0 0 / 80%)"
            : "rgba(100, 116, 139, 0.8)",
          borderRadius: "3px",
          width: "max-content",
        }}
      >
        <TextV2
          text={tag}
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            color: "#EFF4FB",
          }}
        />
      </div>
    </>
  );
};

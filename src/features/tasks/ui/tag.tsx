import { TextV2 } from "../../../core/ui/text/text";
import { ITag } from "../tasks_store";

export const Tag: React.FC<{ tag: ITag }> = ({tag}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // width: 79,
          height: 22,
          background: "rgba(100, 116, 139, 0.8)",
          borderRadius: "3px",
          width: "max-content",
        }}
      >
        <TextV2
          text={tag.name}
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

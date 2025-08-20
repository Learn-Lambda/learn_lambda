import { Icon, IconType } from "../icon/icon";
import { TextV2 } from "../text/text";

export const Pagination = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon type={IconType.chevronDown} />
      </div>
      <div style={{ width: 10 }} />
      <TextV2 text="1" color="#64748B" />
      <div style={{ width: 10 }} />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon type={IconType.chevronUp} />
      </div>
    </div>
  );
};

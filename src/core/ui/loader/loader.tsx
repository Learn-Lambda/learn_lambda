import { Icon, IconType } from "../icon/icon";

export const Loader = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      alignContent: "center",
      justifyItems: "center",
    }}
  >
    <div style={{ height: 50, width: 50 }}>
      <Icon type={IconType.loader} />
    </div>
  </div>
);

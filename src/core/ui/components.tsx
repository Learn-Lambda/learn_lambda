import { NavigateState } from "../store/base_store";
import { Button } from "./button/Button";
import { IconType, Icon } from "./icon/icon";
import { Input } from "./input/input";
import { Page } from "./page/Page";
import { Pagination } from "./pagination/pagination";
import { TextV2 } from "./text/text";
class S extends NavigateState {}
export const Components = () => (
  <>
    <TextV2 text="123" />
    <Button text="Sign in" />
    <div style={{ display: "flex" }}>
      {Object.entries(IconType).map((el) => (
        <div style={{ backgroundColor: "#999999" }}>
          <Icon type={el[1] as unknown as IconType} />
        </div>
      ))}
    </div>
    <Page pageStore={new S()} children={<></>} />
    <div style={{ height: 500, backgroundColor: "#a1a1a1" }}>
      <Input label="email" />
      <div style={{ height: 20 }} />
      <Input icon={IconType.email} label="email" />
      <div style={{ height: 20 }} />
      <Input icon={IconType.email} label="email" error={"is not empty"} />
      <div style={{ height: 20 }} />
    </div>
    <Pagination
      pagination={{ totalCount: 0, totalPages: 0, currentPage: 0, data: [] }}
    />
  </>
);

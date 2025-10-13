import React from "react";
import { Icon, IconType } from "../icon/icon";
import { Avatar } from "../avatar/avatar";
import { TextV2 } from "../text/text";
import Popover from "../popover/popover";
import { observer } from "mobx-react-lite";
import { useStore } from "../../helper/use_store";
import { PageStore } from "./page_store";
import { TrainPath } from "../../../features/train/train";
import { useLocation } from "react-router-dom";
import { TokenPath } from "../../../features/token/token";
import { UiLoader } from "../../store/base_store";
import { Loader } from "../loader/loader";
// 95CB31
export const Page: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  pageStore: UiLoader;
}> = observer(({ children, style, pageStore }) => {
  const store = useStore(PageStore);
  const location = useLocation();
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ width: 52 }} />
      <div
        style={{
          width: 52,
          position: "fixed",

          height: "100%",
          backgroundColor: "#1C2434",
          textAlign: "center",
          justifyItems: "center",
        }}
      >
        <div style={{ height: 29 }} />
        <Icon type={IconType.logoMini} />
        <div style={{ height: 80 }} />
        <div
          style={{
            backgroundColor: "#DEE4EE",
            borderRadius: 2,
            width: 12,
            height: 2,
          }}
        />
        <div style={{ height: 50 }} />
        {store.pages.map((el,index) => (
          <div key={index} onClick={() => store.navigate?.(el.path)}>
            <Icon
              type={el.iconType}
              color={
                location.pathname.includes(el.path) ? "#95CB31" : undefined
              }
            />
            <div style={{ height: el.paddingBottom }} />
          </div>
        ))}
      </div>
      <div style={{ width: "calc(100% - 52px)", height: "100%" }}>
        <div
          style={{
            height: 85,
            backgroundColor: "white",
            width: "100%",
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <div
            style={{
              alignContent: "center",
              height: "100%",
              justifyItems: "center",
            }}
          >
            <div
              onClick={() => store.navigate?.(TrainPath)}
              style={{
                backgroundColor: "#1C2434",
                width: 90,
                height: 46,
                borderRadius: 50,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                border: "1px solid #000000",
                cursor: "pointer",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              {store.currentTask?.tasks === undefined ? (
                <><Loader/> </>
              ) : (
                <>
                  {store.currentTask?.tasks === undefined ||
                  store.currentTask?.tasks.isEmpty() ? (
                    <TextV2 text="zero" color="white" />
                  ) : (
                    <TextV2
                      text={String(store.currentTask?.tasks.length)}
                      color="white"
                      style={{ paddingRight: 4 }}
                    />
                  )}
                </>
              )}

              {store.currentTask?.tasks === undefined ||
              store.currentTask?.tasks.isEmpty() ? (
                <></>
              ) : (
                <Icon type={IconType.play} />
              )}
            </div>
          </div>
          <div style={{ width: 30 }} />
          <div
            style={{
              alignContent: "center",
              height: "100%",
              cursor: "pointer",
            }}
          >
            <TextV2 text={store.user?.login} style={{ paddingRight: 20 }} />
          </div>

          <div style={{ alignContent: "center", height: "100%" }}>
            <Popover
              content={
                <>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => store.navigate?.(TokenPath)}
                  >
                    Токен для vscode
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => store.logout()}
                  >
                    Выйти
                  </div>
                </>
              }
              position="bottom"
            >
              <Avatar name={store.user?.login ?? "  "} size={50} />
            </Popover>
          </div>
          <div style={{ width: 135 }} />
        </div>
        <div
          style={Object.assign(
            {
              height: "calc(100% - 85px)",
              width: "100%",
              backgroundColor: "#F1F5F9",
            },
            style
          )}
        >
          {pageStore.isLoading ? <Loader /> : <>{children}</>}
        </div>
      </div>
    </div>
  );
});

import { observer } from "mobx-react-lite";
import { useStore } from "../../core/helper/use_store";
import { TokenStore } from "./token_store";
import { Page } from "../../core/ui/page/Page";
import { TextV2 } from "../../core/ui/text/text";
import { Icon, IconType } from "../../core/ui/icon/icon";

export const TokenPath = "/token";

export const Token = observer(() => {
  const store = useStore(TokenStore);
  return (
    <Page
      pageStore={store}
      children={
        <>
          <div style={{ padding: 50 }}>
            <TextV2 text="Ваш токен для vscode" size={40} />
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 40,
                backgroundColor: "#e5e7eb",
                borderRadius: 5,
              }}
            >
              <TextV2
                text={store.token?.token}
                size={20}
                style={{ overflow: "hidden", height: "min-height", padding: 5 }}
              />
              <div
                style={{ cursor: "pointer", width: 40, padding: 5, margin: 5 }}
                onClick={() => store.copyToken()}
              >
                <Icon type={store.tokenAnimation ? IconType.ok :IconType.copy} />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
});

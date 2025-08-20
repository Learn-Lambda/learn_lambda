import { observer } from "mobx-react-lite";
import { AuthorizationStore } from "./authorization_store";

import { useStore } from "../../core/helper/use_store";
import { Input } from "../../core/ui/input/input";
import { Icon, IconType } from "../../core/ui/icon/icon";
import { Button } from "../../core/ui/button/Button";
   
export const AuthorizationScreenPath = "/auth";
export const AuthorizationScreen = observer(() => {
  const store = useStore(AuthorizationStore);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Icon type={IconType.bigLogoAuth} />
      <div style={{ height: 20 }} />
      <Input
        icon={IconType.email}
        label={"Email"}
        onChange={(text) => store.updateForm({ login: text })}
      />
      <div style={{ height: 20 }} />

      <Input
        icon={IconType.password}
        label={"Пароль"}
        onChange={(text) => store.updateForm({ password: text })}
      />
      <div style={{ height: 20 }} />
      <Button text="Авторизация" onClick={() => store.onTapLogin()} />
      <div style={{ height: 20 }} />
    </div>
  );
});

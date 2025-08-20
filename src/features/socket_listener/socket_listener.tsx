import * as React from "react";
import { socketListenerStore } from "./socket_listener_store";
import { observer } from "mobx-react-lite";
import { TextV2 } from "../../core/ui/text/text";

export const SocketListener: React.FC<{
  children?: JSX.Element | JSX.Element[];
}> = observer(({ children }) => {
  React.useEffect(() => {
    socketListenerStore.init();
  }, []);
  return (
    <>
      {false ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "red",
            justifyContent: "center",
            height: 35,
          }}
        >
          <TextV2
            text="Server error reconnect..."
            style={{ color: "white", textAlign: "center", marginTop: 1 }}
          />
          <div style={{ width: 20 }} />
          <div className="loading">Loading&#8230;</div>
        </div>
      ) : (
        <></>
      )}

      {children}
    </>
  );
});

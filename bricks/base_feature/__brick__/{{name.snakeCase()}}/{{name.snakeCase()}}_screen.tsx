import { observer } from "mobx-react-lite";
import { {{name.pascalCase()}}Store } from "./{{name.snakeCase()}}_store";
import React from "react";
 
export const {{name.pascalCase()}}ScreenPath = "/auth";

export const {{name.pascalCase()}}Screen = observer(() => {
  const [store] = React.useState(() => new {{name.pascalCase()}}Store());
  return <></>;
});

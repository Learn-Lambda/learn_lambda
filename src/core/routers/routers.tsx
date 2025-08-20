import { createBrowserRouter } from "react-router-dom";
import { PrivateRouter } from "./ui/private_router";
import { publicRouters } from "./public_routers";
import { privateRouters } from "./private_routers";
import type { JSX } from "react";

export interface IRouter {
  path: string;
  element: JSX.Element;
}

export const router = createBrowserRouter(
  privateRouters
    .map((el) => {
      el.element = <PrivateRouter children={el.element} />;
      return el;
    })
    .concat(publicRouters)
);

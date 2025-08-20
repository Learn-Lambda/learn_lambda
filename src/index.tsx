import "reflect-metadata";
import "antd/dist/antd.min.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/routers/routers";
import { extensions } from "./core/extensions/extensions";
import { AuthService } from "./core/service/auth_service";

export const authService = new AuthService();

extensions();
createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);

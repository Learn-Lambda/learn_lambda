import {
  AuthorizationScreen,
  AuthorizationScreenPath,
} from "../../features/authorization/authorization_screen";
import {
  RecognitionPath,
  Recognition,
} from "../../features/recognition/recognition";
import {
  ViewOtherSolution,
  ViewOtherSolutionPath,
} from "../../features/view_other_solutions/view_other_solutions";

import type { IRouter } from "./routers";

export const publicRouters: IRouter[] = [
  {
    path: AuthorizationScreenPath,
    element: <AuthorizationScreen />,
  },
  {
    path: "/",
    element: <AuthorizationScreen />,
  },
  { path: ViewOtherSolutionPath + ":id", element: <ViewOtherSolution /> },
  { path: RecognitionPath + "/" + ":id", element: <Recognition /> },
];

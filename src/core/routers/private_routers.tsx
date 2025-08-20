import { Activity, ActivityPath } from "../../features/activiti/activity";
import { TrainSettings, TrainSettingsPath } from "../../features/train_settings/train_settings";
import { Tasks, TasksPath } from "../../features/tasks/tasks";
import { Token, TokenPath } from "../../features/token/token";
import { TrainPath, Train } from "../../features/train/train";
import type { IRouter } from "./routers";

export const privateRouters: IRouter[] = [
  {
    path: TasksPath,
    element: <Tasks />,
  },
  {
    path: TrainPath,
    element: <Train />,
  },
  {
    path: TokenPath,
    element: <Token />,
  },
  {
    path: TrainSettingsPath,
    element: <TrainSettings />,
  },
  {
    path: ActivityPath,
    element: <Activity />,
  },
];

import { Activity, ActivityPath } from "../../features/activity/activity";
import {
  TrainSettings,
  TrainSettingsPath,
} from "../../features/train_settings/train_settings";
import { Tasks, TasksPath } from "../../features/tasks/tasks";
import { Token, TokenPath } from "../../features/token/token";
import { TrainPath, Train } from "../../features/train/train";
import type { IRouter } from "./routers";

import {
  RecognitionTaskPath,
  RecognitionTask,
} from "../../features/recognition_task/recognition_task";
import {
  TaskHistory,
  TaskHistoryPath,
} from "../../features/task_history/task_history";

export const privateRouters: IRouter[] = [
  {
    path: TasksPath,
    element: <Tasks />,
  },
  { path: TaskHistoryPath, element: <TaskHistory /> },
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
    path: ActivityPath + ":userId",
    element: <Activity />,
  },
  {
    path: RecognitionTaskPath + ":id/" + ":type",
    element: <RecognitionTask />,
  },
];

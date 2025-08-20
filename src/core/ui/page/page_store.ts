import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../store/base_store";
import { PageStorageRepository } from "./page_storage_repository";
import { AuthorizationScreenPath } from "../../../features/authorization/authorization_screen";
import { NavigateFunction } from "react-router-dom";
import { IUser } from "../../model/user";
import { PageHttpRepository } from "./page_http_repository";
import { authService } from "../../..";
import { socketRepository } from "../../repository/socket_repository";

import { IconType } from "../icon/icon";
import { TasksPath } from "../../../features/tasks/tasks";
import { TrainPath } from "../../../features/train/train";
import { TrainSettingsPath } from "../../../features/train_settings/train_settings";
import { ActivityPath } from "../../../features/activiti/activity";

interface Page {
  path: string;
  paddingBottom: number;
  iconType: IconType;
}

export class PageStore extends NavigateState {
  pageStorageRepository = new PageStorageRepository();
  pageHttpRepository = new PageHttpRepository();
  pages: Page[] = [
    {
      iconType: IconType.group,
      paddingBottom: 40,
      path: TasksPath,
    },
    { iconType: IconType.tasks, paddingBottom: 40, path: TrainPath },
    {
      iconType: IconType.calendar,
      paddingBottom: 40,
      path: ActivityPath,
    },
    {
      iconType: IconType.paper,
      paddingBottom: 40,
      path: "/",
    },
    {
      iconType: IconType.grid,
      paddingBottom: 40,
      path: TrainSettingsPath,
    },
  ];
  currentTask?: {
    tasks?: any[];
  } = undefined;

  constructor() {
    super();
    makeAutoObservable(this);
  }
  user?: IUser = undefined;
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    (await this.pageHttpRepository.getCurrentCollection()).map((el) => {
      this.currentTask = { tasks: el.currentTasksIds };
    });
    this.pageStorageRepository.getUser().fold(
      (user) => {
        this.user = user;
      },
      (err) => console.log(err)
    );
    this.pageHttpRepository.getCurrentCollection();
    socketRepository.socket?.on(
      "current/task/lenght",
      (payload: { tasks: number[] }) => {
        this.currentTask = { tasks: payload.tasks };
      }
    );
  }
  logout(): void {
    this.pageStorageRepository.logout();
    this.navigate?.(AuthorizationScreenPath);
    authService.emit({ isAuthorization: false });
  }
}

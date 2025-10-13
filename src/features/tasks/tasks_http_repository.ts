import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { Task } from "./model/tasks";
export interface QueryTask {
  page: number;
  tags?: string[];
  complexity?: number;
  isAiSolution?: boolean;
  isTaskComplete?: boolean;
}

export class TaskHttpRepository extends HttpRepository {
  getUserPlanTags = () =>
    this._jsonRequest<string[]>(HttpMethod.GET, "/get/user/plan/tags");
  getTasks = (model: QueryTask) =>
    this._jsonRequest<Task>(HttpMethod.POST, `/get/all/task/client`, model);
  getTagsStatistic = () =>
    this._jsonRequest<{ [key: string]: number }>(
      HttpMethod.GET,
      "/get/tags/statistic"
    );
  addTaskMainCollection = (id: number) =>
    this._jsonRequest(HttpMethod.POST, "/add/task", { id: id });
  getCurrentCollection = () =>
    this._jsonRequest<{ currentTasksIds: number[] }>(
      HttpMethod.GET,
      "/current/task"
    );

  removeTaskCollection = (id: number) =>
    this._jsonRequest(HttpMethod.POST, "/remove/task", { id: id });
}

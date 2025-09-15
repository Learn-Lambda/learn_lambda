import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { TaskSolutionResult } from "./task_solution_result";
import { ITask, Solution } from "./train_store";

export class TrainRepository extends HttpRepository {
  sendSolutions = (solution: Solution) =>
    this._jsonRequest<TaskSolutionResult[]>(HttpMethod.POST, "/run/task", solution);
  getLastTask = () =>
    this._jsonRequest<ITask>(HttpMethod.GET, "/get/last/task");
}

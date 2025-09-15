import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { ITask } from "../train/train_store";
import { ITaskSolution } from "./other_solutions_model";

export class OtherSolutionHttpRepository extends HttpRepository {
  getTaskById = (id: number) =>
    this._jsonRequest<ITask>(HttpMethod.POST, "/get/task/by/id", { id: id });
  getSolutionsByTaskId = (id: number) =>
    this._jsonRequest<ITaskSolution[]>(HttpMethod.POST, "/solution/at/task", {
      id: id,
    });
}

import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { ITask, Solution } from "./train_store";

export class TrainRepository extends HttpRepository {
  sendSolutions = (solution: Solution) =>
    this._jsonRequest<ITask>(HttpMethod.POST, "/run/task", solution);
  getLastTask = () =>
    this._jsonRequest<ITask>(HttpMethod.GET, "/get/last/task");
}

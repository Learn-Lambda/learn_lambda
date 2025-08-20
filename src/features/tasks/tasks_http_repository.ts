import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { Task } from "./model/tasks";

export class TaskHttpRepository extends HttpRepository {
  getTasks = (page: number) =>
    this._jsonRequest<Task>(HttpMethod.GET, `/tasks?page=1`);
  addTaskMainCollection = (id: number) =>
    this._jsonRequest(HttpMethod.POST, "/add/task", { id: id });
}

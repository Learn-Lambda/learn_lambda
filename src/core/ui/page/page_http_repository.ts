import { HttpMethod, HttpRepository } from "../../repository/http_repository";

export class PageHttpRepository extends HttpRepository{
  getCurrentCollection = () => this._jsonRequest<{currentTasksIds:number[]}>(HttpMethod.GET,'/current/task')

}
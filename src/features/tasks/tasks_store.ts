import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../core/store/base_store";
import { NavigateFunction } from "react-router-dom";
import { TaskHttpRepository } from "./tasks_http_repository";
import { Task } from "./model/tasks";
import { Pagination } from "../../core/model/pagination";

export interface ITag {
  category: boolean;
  categoryTags?: ITag[];
  name: string;
}

export class TasksStore extends NavigateState {
  tasks?: Pagination<Task>;
  taskHttpRepository = new TaskHttpRepository();
  tags: ITag[] = [];
  constructor() {
    super();
    makeAutoObservable(this);
  }
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    await this.mapOk("tasks", this.taskHttpRepository.getTasks(1));
  }
  addTaskToCollection = (id: number) =>
    this.taskHttpRepository.addTaskMainCollection(id);
}

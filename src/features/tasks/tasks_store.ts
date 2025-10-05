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
  apllyDificultyFilter = (): void => {
    if (this.complexity === 3) {
      this.complexity = 0;
      return;
    }
    this.complexity += 1;
  };
  tasks?: Pagination<Task>;
  currentTasksIds: number[] = [];
  taskHttpRepository = new TaskHttpRepository();
  tags: ITag[] = [];
  aiSolutions = false;
  complexity = 0;
  planSolutions = false;
  constructor() {
    super();
    makeAutoObservable(this);
  }

  planSolutionsFilterApply = () => {
    this.planSolutions = !this.planSolutions;
  };

  aiSolutionsFilterApply = () => {
    this.aiSolutions = !this.aiSolutions;
  };
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    await this.mapOk("tasks", this.taskHttpRepository.getTasks(1));
    (await this.taskHttpRepository.getCurrentCollection()).map((el) => {
      this.currentTasksIds = el.currentTasksIds;
    });
  }
  addTaskToCollection = async (id: number) => {
    await this.taskHttpRepository.addTaskMainCollection(id);
    this.currentTasksIds?.push(id);
  };
  removeTaskToCollection = async (id: number) => {
    this.currentTasksIds = this.currentTasksIds.filter((el) => el !== id);
    await this.taskHttpRepository.removeTaskCollection(id);
  };
}

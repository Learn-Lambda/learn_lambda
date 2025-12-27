import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../core/store/base_store";
import { NavigateFunction } from "react-router-dom";
import { QueryTask, TaskHttpRepository } from "./tasks_http_repository";
import { Task } from "./model/tasks";
import { IPagination } from "../../core/model/pagination";
import { TaskLocalStorageRepository } from "./tasks_local_storage_repository";
import { AuthorizationLocalStorageRepository } from "../authorization/authorization_repository";

export class TasksStore extends NavigateState {
  tasks?: IPagination<Task>;
  userId: number;
  tagsRef?: React.RefObject<HTMLDivElement>;
  currentTasksIds: number[] = [];
  taskHttpRepository = new TaskHttpRepository();
  taskLocalStorageRepository = new TaskLocalStorageRepository();
  authorizationLocalStorageRepository =
    new AuthorizationLocalStorageRepository();
  tags: { name: string; value: string }[] = [];
  aiSolutions = false;
  onlyUnresolved = false;
  complexity = 0;
  planSolutions = false;
  queryTask: QueryTask = {
    tags: [],
    page: 1,
    isAiSolution: this.aiSolutions,
    isTaskComplete: this.onlyUnresolved,
    complexity: this.complexity,
  };
  isHaveTagsModalState: boolean = false;
  tagsQuery: string[] = [];
  constructor() {
    super();
    makeAutoObservable(this);
  }
  selectPage = (value: number): void => {
    this.queryTask.page = value;
    this.getTasks();
  };

  prevPage = () => {
    this.queryTask.page -= 1;
    this.getTasks();
  };
  nextPage = () => {
    this.queryTask.page += 1;
    this.getTasks();
  };
  selectTags = (tag: string) => {
    if (this.tagsQuery.includes(tag)) {
      this.tagsQuery = this.tagsQuery.filter((el) => !el.isEqual(tag));
    } else {
      this.tagsQuery.push(tag);
    }
    this.taskLocalStorageRepository.setTaskSettings({
      planSolutions: this.planSolutions,
      aiSolutions: this.aiSolutions,
      complexity: this.complexity,
      onlyUnresolved: this.onlyUnresolved,
      tagsQuery: this.tagsQuery,
    });
  };
  find = async (): Promise<void> => {
    this.getTasks();
  };
  applyDifficultyFilter = (): void => {
    if (this.complexity === 3) {
      this.complexity = 0;
      this.sync();
      return;
    }
    this.complexity += 1;
    this.sync();
  };

  planSolutionsFilterApply = async () => {
    this.planSolutions = !this.planSolutions;
    this.getTags();
    this.sync();
  };
  onlyUnresolvedFilterApply = (): void => {
    this.onlyUnresolved = !this.onlyUnresolved;
    this.sync();
  };

  aiSolutionsFilterApply = () => {
    this.aiSolutions = !this.aiSolutions;
    this.sync();
  };
  getTags = async () => {
    if (this.planSolutions) {
      (await this.taskHttpRepository.getUserPlanTags()).map((el) => {
        this.tags = el.map((element) => {
          return {
            name: element,
            value: element,
          };
        });
      });
    } else {
      (await this.taskHttpRepository.getTagsStatistic()).map((el) => {
        this.tags = Object.keys(el).map((element) => {
          return { name: `${element} ${el[element]}`, value: element };
        });
      });
    }
  };

  sync = () => {
    this.taskLocalStorageRepository.setTaskSettings({
      planSolutions: this.planSolutions,
      aiSolutions: this.aiSolutions,
      complexity: this.complexity,
      onlyUnresolved: this.onlyUnresolved,
      tagsQuery: this.tagsQuery,
    });
    this.getTags();
    this.getTasks();
  };
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);

    this.authorizationLocalStorageRepository.getUser().map((el) => {
      this.userId = el.id;
    });

    this.isLoading = true;
    this.taskLocalStorageRepository.getTaskSettings().map((el) => {
      this.aiSolutions = el.aiSolutions;
      this.planSolutions = el.planSolutions;
      this.complexity = el.complexity;
      this.onlyUnresolved = el.onlyUnresolved;
      this.tagsQuery = el.tagsQuery;
    });

    this.getTags();

    this.getTasks();

    (await this.taskHttpRepository.getCurrentCollection()).map((el) => {
      this.currentTasksIds = el.currentTasksIds;
    });
    this.isLoading = false;
  }
  addTaskToCollection = async (id: number) => {
    await this.taskHttpRepository.addTaskMainCollection(id);
    this.currentTasksIds?.push(id);
  };
  getTasks = async () => {
    this.queryTask.complexity = this.complexity;
    this.queryTask.isAiSolution = this.aiSolutions;
    this.queryTask.isTaskComplete = this.onlyUnresolved;
    // this.queryTask.tags = this.tagsQuery;
    await this.mapOk(
      "tasks",
      this.taskHttpRepository.getTasks(this.queryTask as QueryTask)
    );
  };
  removeTaskToCollection = async (id: number) => {
    this.currentTasksIds = this.currentTasksIds.filter((el) => el !== id);
    await this.taskHttpRepository.removeTaskCollection(id);
  };
}

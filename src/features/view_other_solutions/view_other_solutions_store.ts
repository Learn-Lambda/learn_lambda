import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../core/store/base_store";
import { OtherSolutionHttpRepository } from "./view_other_solutions_http_repository";
import { ITask } from "../train/train_store";
import { ITaskSolution } from "./other_solutions_model";
import { TrainPath } from "../train/train";
import { TaskHttpRepository } from "../tasks/tasks_http_repository";

export class ViewOtherSolutionStore extends NavigateState {
  taskHttpRepository = new TaskHttpRepository();
  otherSolutionHttpRepository = new OtherSolutionHttpRepository();
  task?: ITask;
  solutions?: ITaskSolution[];
  constructor() {
    super();
    makeAutoObservable(this);
  }
  initParam = async (taskId: string) => {
    await this.mapOk(
      "task",
      this.otherSolutionHttpRepository.getTaskById(Number(taskId))
    );
    await this.mapOk(
      "solutions",
      this.otherSolutionHttpRepository.getSolutionsByTaskId(Number(taskId))
    );
  };
  solveTheProblemAgain = async () => {
    await this.taskHttpRepository.addTaskMainCollection(this.task?.id ?? 0);
    this.navigate?.(TrainPath);
  };
}

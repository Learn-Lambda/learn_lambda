import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../core/store/base_store";
import makeAutoObservable from "mobx-store-inheritance";
import { TrainRepository } from "./train_repository";
import { TrainLocalStorageRepository } from "./train_local_storage_repository";
import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";
import { TaskSolutionResult } from "./task_solution_result";
import { message } from "antd";
export interface ITask {
  id: number;
  name: string;
  description: string;
  functionName: string;
  code: string;
  complexity: number;
  createDate: Date;
  testArguments: string;
  numberOfTimesSolved: number;
  isOpen: boolean;
  tags: string[];
}

export class Solution extends ValidationModel {
  @IsString({ message: "Введите решение задачи в поле код" })
  code: string = `export const p = (arg: number, arg2: number) => {
  return arg * arg2;
};

console.log(p(1, 2)); //2
console.log(p(1, 3)); //3
console.log(p(1, 4)); //4
console.log(p(2, 2)); //4`;
  taskNumber: number;
}

export class TrainStore extends FormState<Solution> {
  inputHeight = 40;
  loadTags = false;
  isViewResultTest = false;
  task?: ITask;
  allTestIsAsserts?: boolean;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  trainLocalStorageRepository = new TrainLocalStorageRepository();
  trainRepository = new TrainRepository();
  viewModel: Solution = new Solution();
  taskSolutionResult?: TaskSolutionResult[];
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    await this.mapOk("task", this.trainRepository.getLastTask());
  }
  async sendSolutions() {
    this.viewModel.taskNumber = Number(this.task?.id);
    (await this.viewModel.validMessage<Solution>()).map(async (solution) => {
      this.isViewResultTest = true;
      (await this.trainRepository.sendSolutions(solution)).fold(
        (taskSolutionResult) => {
          this.taskSolutionResult = taskSolutionResult;
          this.taskSolutionResult.forEach((el) => {
            if (this.allTestIsAsserts !== false) {
              this.allTestIsAsserts = el.value.status;
            }
          });
        },
        (e) => {
          message.error(e.message);
        }
      );
    });
  }
  inputHelper(text: string) {
    const result = text.search("\n");

    if (result === 0 || result === -1) {
      this.inputHeight = 40;
      return;
    }

    this.inputHeight = result * 40;
    return;
  }
}

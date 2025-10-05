import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../core/store/base_store";
import makeAutoObservable from "mobx-store-inheritance";
import { TrainRepository } from "./train_repository";
import { TrainLocalStorageRepository } from "./train_local_storage_repository";
import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";
import { TaskSolutionResult } from "./task_solution_result";
import { message } from "antd";
import { ViewOtherSolutionPath } from "../view_other_solutions/view_other_solutions";
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
  code: string;
  taskNumber: number;
}

export class TrainStore extends FormState<Solution> {
  inputHeight = 40;
  loadTags = false;
  isViewResultTest = false;
  task?: ITask;
  allTestIsAsserts?: boolean;
  activeCase = 0;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  trainLocalStorageRepository = new TrainLocalStorageRepository();
  trainRepository = new TrainRepository();
  viewModel: Solution = new Solution();
  taskSolutionResult: TaskSolutionResult[] = [];
  emptyPage = false;
  setActiveCase = (index: number): void => {
    this.activeCase = index;
  };

  isError = () =>
    this.taskSolutionResult
      ?.map((el) => el.value.status)
      .filter((e) => e === true)
      .isEmpty();
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    // await this.mapOk("task", this.trainRepository.getLastTask());
    this.isLoading = true;
    (await this.trainRepository.getLastTask()).fold(
      (s) => {
        this.task = s;
        this.isLoading = false;
      },
      (error) => {
        this.emptyPage = true;
        this.isLoading = false;
      }
    );
  }
  sendSolutions = async () => {
    this.viewModel.taskNumber = Number(this.task?.id);
    (await this.viewModel.validMessage<Solution>()).map(async (solution) => {
      (await this.trainRepository.sendSolutions(solution)).fold(
        (taskSolutionResult) => {
          // @ts-ignore
          if (
            taskSolutionResult[0] != undefined &&
            // @ts-ignore
            taskSolutionResult[0]["error"] !== undefined
          ) {
            this.isViewResultTest = false;

            message.error("Ошибка исполнения ");
            return;
          }

          this.isViewResultTest = true;

          this.taskSolutionResult = taskSolutionResult;
          this.allTestIsAsserts = !this.isError();
          this.navigate?.(ViewOtherSolutionPath + this.viewModel.id);
        },
        (e) => {
          message.error(e.message);
        }
      );
    });
  };
  inputHelper = (text: string) => {
    const result = text.search("\n");

    if (result === 0 || result === -1) {
      this.inputHeight = 40;
      return;
    }

    this.inputHeight = result * 40;
    return;
  };
}

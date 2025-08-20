import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../core/store/base_store";
import makeAutoObservable from "mobx-store-inheritance";
import { TrainRepository } from "./train_repository";
import { TrainLocalStorageRepository } from "./train_local_storage_repository";
import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";
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
  @IsString()
  code: string;
  taskNumber: number;
}

export class TrainStore extends FormState<Solution> {
  inputHeight = 40;
  loadTags = false;
  task?: ITask;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  trainLocalStorageRepository = new TrainLocalStorageRepository();
  trainRepository = new TrainRepository();
  viewModel: Solution = new Solution();
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    await this.mapOk("task", this.trainRepository.getLastTask());
  }
  async sendSolutions() {
    this.viewModel.taskNumber = Number(this.task?.id);
    (await this.viewModel.validMessage<Solution>()).map((solution) =>
      this.trainRepository.sendSolutions(solution)
    );
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

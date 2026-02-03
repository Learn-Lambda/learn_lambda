import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../core/store/base_store";
import makeAutoObservable from "mobx-store-inheritance";
import { GtpMessage, TrainHttpRepository } from "./train_http_repository";
import { TrainLocalStorageRepository } from "./train_local_storage_repository";
import { IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";
import { TaskSolutionResult } from "./task_solution_result";
import { message } from "antd";
import { ViewOtherSolutionPath } from "../view_other_solutions/view_other_solutions";
import { AuthorizationLocalStorageRepository } from "../authorization/authorization_repository";
import { TypedEvent } from "../../core/helper/typed_event";
import { FormController } from "../../core/ui/input/input_v2";
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
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
export class TrainStore extends FormState<Solution> {
  viewOtherSolutionClick = (): void => {
    this.navigate?.(ViewOtherSolutionPath + `${this.task?.id}`);
  };
  message = "";
  formController: FormController = new FormController();
  messageLoader = false;
  isAiSolutionUnlock = false;
  inputHeight = 40;
  loadTags = false;
  isViewResultTest = false;
  task?: ITask;
  allTestIsAsserts?: boolean;
  activeCase = 0;
  isVscodeMode: boolean = false;
  trainLocalStorageRepository = new TrainLocalStorageRepository();
  trainHttpRepository = new TrainHttpRepository();
  viewModel: Solution = new Solution();
  authorizationLocalStorageRepository =
    new AuthorizationLocalStorageRepository();
  taskSolutionResult: TaskSolutionResult[] = [];
  emptyPage = false;
  isAiSolutionLoad = false;
  messages: GtpMessage[] = [];
  taskAiIsSolved: boolean = false;
  userId: number = 0;
  gptButtonIsUnlock: boolean = false;

  constructor() {
    super();
    this.authorizationLocalStorageRepository.getUser().map((el) => {
      this.userId = el.id;
    });
    makeAutoObservable(this);
  }

  solveWithAi = async () => {
    this.isAiSolutionLoad = true;
    (
      await this.trainHttpRepository.solveWithAi(
        this.task!.id as number,
        this.userId
      )
    ).map((el) => {
      this.isAiSolutionLoad = false;
      this.isAiSolutionUnlock = true;
      this.messages = el;
    });
  };

  setActiveCase = (index: number): void => {
    this.activeCase = index;
  };
  setVsCodeMode = (): void => {
    this.isVscodeMode = !this.isVscodeMode;
    this.trainLocalStorageRepository.setVsCodeMode(this.isVscodeMode);
  };

  isError = () =>
    this.taskSolutionResult
      ?.map((el) => el.value.status)
      .filter((e) => e === true)
      .isEmpty();
  async init(navigate?: NavigateFunction): Promise<any> {
    this.trainLocalStorageRepository.getVsCodeMode().map((el) => {
      this.isVscodeMode = el;
    });

    super.init(navigate);
    // await this.mapOk("task", this.trainRepository.getLastTask());

    this.isLoading = true;
    (await this.trainHttpRepository.getLastTask()).fold(
      async (task) => {
        this.task = task;
        (
          await this.trainHttpRepository.taskAiSolved(
            this.task?.id,
            this.userId
          )
        ).map(async (solved) => {
          if (isNaN(new Date(solved.solvedWithAi).getTime())) {
            this.taskAiIsSolved = false;
          } else {
            this.taskAiIsSolved = isSameDay(
              new Date(solved.solvedWithAi),
              new Date()
            );
            // console.log(isSameDay(new Date(solved.solvedWithAi), new Date()));
            // нужно загрузить старую переписку
            if (this.taskAiIsSolved === true) {
              (
                await this.trainHttpRepository.getMessagesWithTask(
                  this.task?.id,
                  this.userId
                )
              ).map((messages) => {
                this.isAiSolutionLoad = false;
                this.messages = messages;
                // console.log(messages);
                this.isAiSolutionUnlock = true;
              });
            } else {
              //нужно показать кнопку о том что бы востановить переписку с gpt
              this.gptButtonIsUnlock = true;
            }
          }
        });
        this.isLoading = false;
      },
      async (error) => {
        this.emptyPage = true;
        this.isLoading = false;
      }
    );
  }
  sendSolutions = async () => {
    this.viewModel.taskNumber = Number(this.task?.id);
    (await this.viewModel.validMessage<Solution>()).map(async (solution) => {
      (await this.trainHttpRepository.sendSolutions(solution)).fold(
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
    this.message = text;
  };
  sendMessage = async () => {
    if (this.message.isEmpty()) {
      message.error("введите сообщение");
      return;
    }
    this.formController.emit("");
    this.messages.push({ message: this.message, messageType: "user" });
    this.messageLoader = true;
    (
      await this.trainHttpRepository.sendMessageSolvedAi({
        taskId: this.task?.id ?? 0,
        userId: this.userId,
        message: this.message,
      })
    ).map((el) => {
      this.message = "";

      this.messages.push(el);
    });
    this.messageLoader = false;
  };
}

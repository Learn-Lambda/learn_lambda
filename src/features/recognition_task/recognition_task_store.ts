import { NavigateFunction } from "react-router-dom";
import { FormState } from "../../core/store/base_store";
import { RecognitionTaskHttpRepository } from "./recognition_task_http_repository";
import { AuthorizationLocalStorageRepository } from "../authorization/authorization_repository";
import makeAutoObservable from "mobx-store-inheritance";
import { RecognitionTaskModel } from "./recognition_task_model";
import { message } from "antd";
import { RecognitionTaskPath } from "./recognition_task";
import { ITestIndicator } from "./recognition_task_local_storage_repository";
import { IUser } from "../../core/model/user";
import { RecognitionPath } from "../recognition/recognition";

export class RecognitionTaskStore extends FormState<RecognitionTaskModel> {
  recognitionTaskHttpRepository = new RecognitionTaskHttpRepository();
  authorizationLocalStorageRepository = new AuthorizationLocalStorageRepository();

  type: string = '';
  idCategory: string = '';
  viewModel: RecognitionTaskModel;
  count?: { count: number };
  needCount = 5;
  testIndicator?: ITestIndicator;
  user?: IUser;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  testIsNotOk = async () => {
    this.authorizationLocalStorageRepository.getUser().map(async (user) => {
      await this.recognitionTaskHttpRepository.setUserErrorRecognitionTask({ taskId: Number(this.idCategory), userId: user.id })
      message.error('Вы допустили ошибку при сдаче экзамена попробуйте пересдать экзамен завтра');

      this.navigate?.(RecognitionPath + '/' + user.id);
    })
  }
  testIsOk = async () => {
    if (this.type === 'экзамен') {
      this.count!.count += 1

    }

    if ((this.count?.count ?? 0) >= 5 && this.type === 'экзамен') {
      message.success('вы сдали экзамен можете перейти к другим задачам')
    }
    if (this.type === 'экзамен') {
      await this.recognitionTaskHttpRepository.setUserRecognitionCategoryExamOkUpdateCount({ taskId: Number(this.idCategory), userId: this.user?.id ?? 0 })

    }
  }
  onClickExam = (): void => {
    this.authorizationLocalStorageRepository.getUser().map(async (user) => {
      (await this.recognitionTaskHttpRepository.isItPosibleToPassTheExam(this.idCategory, user.id,)).map(async (examIsPosible) => {
        if (examIsPosible.examIsPosible === false) {
          this.type = 'экзамен';
          this.navigate?.(RecognitionTaskPath + String(this.idCategory + '/exam'));
          this.isLoading = true;
          (await this.recognitionTaskHttpRepository.getTask(this.idCategory, this.type, user.id)).map((el) => {
            this.loadClassInstance(RecognitionTaskModel, el)
          })
          this.isLoading = false;
        } else {
          message.error('Сегодня вы уже попробывали, попробуйте сдать экзамен завтра')
          return;
        }
      })

    })
  }
  init = async (navigate?: NavigateFunction) => {
    super.init(navigate);
    this.authorizationLocalStorageRepository.getUser().map(async (user) => {
      this.user = user;

    })
  }
  initParam = async (param: string, type: string) => {
    this.idCategory = param;
    if (type === 'train') {
      this.type = 'тест';
    } else {
      this.type = 'экзамен';
    }
    this.isLoading = true;
    this.authorizationLocalStorageRepository.getUser().map(async (user) => {
      if (this.type === 'экзамен') {
        await this.mapOk('count', this.recognitionTaskHttpRepository.getUserRecognitionStatisticInTask({ taskId: Number(param), userId: user.id }))
      }
      (await this.recognitionTaskHttpRepository.getTask(param, this.type, user.id)).map((el) => {
        this.loadClassInstance(RecognitionTaskModel, el)
      })
      this.isLoading = false;
    })
  }
  onClickNextTask = async () => {
    this.isLoading = true;

    (await this.recognitionTaskHttpRepository.getTask(this.idCategory, this.type, this.user?.id ?? 0, true)).map((el) => {
      this.loadClassInstance(RecognitionTaskModel, el)
    })
    this.isLoading = false;

  }

}

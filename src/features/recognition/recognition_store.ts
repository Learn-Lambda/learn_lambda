import makeAutoObservable from "mobx-store-inheritance";
import { FormState } from "../../core/store/base_store";
import { RecognitionCategory, RecognitionModel, StatisticRecognition } from "./recognition_model";
import { NavigateFunction } from "react-router-dom";
import { RecognitionHttpRepository } from "./recognition_http_repository";
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear() % 100).padStart(2, '0');
  return `${day}.${month}.${year}`;
}
export class RecognitionStore extends FormState<RecognitionModel> {
  resetProgressWithTask = async (id: number) => {
    await this.recognitionHttpRepository.resetProgressWithTask({ userId: this.userId, taskId: id })
    this.recognitionModels.forEach((el) => {
      el.topics.find((subEl) => subEl.id === id)!.didYouPassTheTest = false;
    })
    // this.getInitState(this.userId ?? 0)
  }
  viewModel: RecognitionModel = new RecognitionModel();
  recognitionHttpRepository = new RecognitionHttpRepository();
  recognitions: RecognitionCategory[]
  recognitionModels: RecognitionModel[] = [];
  statisticRecognition?: StatisticRecognition;
  userId?: number;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  initParam = async (userId: number) => {
    this.userId = userId
    this.getInitState(userId)
  }
  getInitState = async (userId: number) => {
    await this.mapOk('statisticRecognition', this.recognitionHttpRepository.userCurrentRecognitionStatistic({ userId }))
    await this.mapOk('recognitions', this.recognitionHttpRepository.getAllRecognition());

    const recognitionModels: RecognitionModel[] = [];

    this.recognitions.forEach((el) => {
      recognitionModels.rFind<RecognitionModel>((element) => el.comonCategory === element.name).fold((recognitionCategory) => {
        const statistic = this.statisticRecognition?.statistic.find((subElement) => subElement.collectionId === el.id)

        recognitionCategory.topics.push({ name: el.subCategory, didYouPassTheTest: statistic?.isEnd ?? false, id: el.id, isErrorToday: formatDate(new Date()).isEqual(statistic?.lastDateError ?? '') })
      }, () => {
        const recognitionModel = new RecognitionModel(el.comonCategory);
        const statistic = this.statisticRecognition?.statistic.find((subElement) => subElement.collectionId === el.id)
        recognitionModel.topics.push({ name: el.subCategory, didYouPassTheTest: statistic?.isEnd ?? false, id: el.id, isErrorToday: formatDate(new Date()).isEqual(statistic?.lastDateError ?? '') })
        recognitionModels.push(recognitionModel);
      });
    })
    this.recognitionModels = recognitionModels;
  }
  init = async (navigate?: NavigateFunction) => {
    super.init(navigate);

  }
  getPercentAllTypesUsage = (): string => {
    const statisticTypeData = this.recognitionModels.map((el) => el.usagePercent());
    const result =
      statisticTypeData.reduce((acc, el) => {
        return acc + el;
      }, 0) / statisticTypeData.length;
    if (result === 0) {
      return "0%";
    }
    return result.toFixed(2) + '%';
  };
}

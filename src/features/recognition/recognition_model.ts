import makeAutoObservable from "mobx-store-inheritance";
import { ValidationModel } from "../../core/model/validation_model";
export interface StatisticRecognition {
  statistic: Statistic[];
}

export interface Statistic {
  collectionId: number;
  index?: number;
  lastDateError?: string;
  count?: number;
  isEnd?: boolean;
}

export class RecognitionModel extends ValidationModel {

  usagePercent = (): number => (100 / this.topics.length * this.topics.filter((el) => el.didYouPassTheTest).length);

  getUsage = () => String(this.usagePercent().toFixed(0) + '%')
  constructor(name?: string) {
    super();
    this.name = name ?? '';
    makeAutoObservable(this);
  }
  name: string;

  topics: { name: string; didYouPassTheTest: boolean, id: number, isErrorToday: boolean }[] = [];
  didYouPassTheTest: boolean;

  whatHasBeenPassed = () => '';
}
export interface RecognitionCategory {
  id: number;
  helper: string;
  comonCategory: string;
  subCategory: string;
  testTaskCount: number;
  exampleTaskCount: number;
  usersWhoPassedTheExamForTheTask: any[];
}

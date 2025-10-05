import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../core/store/base_store";
import { ActivityHttpRepository } from "./activity_http_repository";
import { AuthorizationLocalStorageRepository } from "../authorization/authorization_repository";
import {
  JSONStatisticUsage,
  StatisticTypesUsage,
} from "./statistic_types_usage";

export class ActivityStore extends NavigateState {
  jsonStatisticUsage?: JSONStatisticUsage;
  statisticTypesUsage?: StatisticTypesUsage;
  activityHttpRepository = new ActivityHttpRepository();
  authorizationLocalStorageRepository =
    new AuthorizationLocalStorageRepository();

   
 
  constructor() {
    super();
    makeAutoObservable(this);
  }

  
  initParam = async (id: string) => {
 
    await this.mapOk(
      "statisticTypesUsage",
      this.activityHttpRepository.getUserStatisticTypesUsage(Number(id))
    );

    this.jsonStatisticUsage = this.statisticTypesUsage?.jsonStatisticUsage;
  };
  editCallback = (target: number, method: string, type: string) => {
    // @ts-ignore
    this.jsonStatisticUsage[type][method].target = target;
    const json = JSON.stringify(this.jsonStatisticUsage);
    this.activityHttpRepository.updateStatistic({
      id: this.statisticTypesUsage?.id ?? 0,
      statistic: json,
    });
  };
  typeMethods = (
    type: any
  ): {
    usageSingly: number;
    aiUsage: number;
    usageTotal: number;
    method: string;
    target: number;
    importance: number;
    isEditable: boolean;
  }[] =>
    Object.keys(type).map((el) =>
      Object.assign({ method: el, isEditable: false }, type[el])
    );
}

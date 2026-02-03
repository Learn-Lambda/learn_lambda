import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../core/store/base_store";
import { ActivityHttpRepository } from "./activity_http_repository";
import { AuthorizationLocalStorageRepository } from "../authorization/authorization_repository";
import {
  JSONStatisticUsage,
  StatisticTypesUsage,
} from "./model/statistic_types_usage";

export interface YearStatistic {
  id: number;
  userId: number;
  year: number;
  statistic?: {
    date: Date;
    count: number;
  }[];
}
export class ActivityStore extends NavigateState {
  jsonStatisticUsage?: JSONStatisticUsage;
  statisticTypesUsage?: StatisticTypesUsage;
  yearsUserActivity: number[] = [];
  activityYear?: YearStatistic[];
  activityHttpRepository = new ActivityHttpRepository();
  authorizationLocalStorageRepository =
    new AuthorizationLocalStorageRepository();
  constructor() {
    super();
    makeAutoObservable(this);
  }
  getActiveYear = (): number => {
    return new Date().getFullYear();
  };
  getPercentAllTypesUsage = (): string => {
    const statisticTypeData = Object.entries(
      this.statisticTypesUsage?.jsonStatisticUsage ?? {}
    )
      .map(([k, v]) => {
        return Object.entries(v).map(([key, value]) => {
          return {
            // @ts-ignore
            percent: value.usageSingly / (value.target / 100),
          };
        });
      })
      .flat(1);
    const result =
      statisticTypeData.reduce((acc, el) => {
        return acc + el.percent;
      }, 0) / statisticTypeData.length;
    if (result === 0) {
      return "0";
    }
    return result.toFixed(2);
  };
  getPercentInType = (type: string): string => {
    const statisticTypeData = Object.entries(
      // @ts-ignore
      this.statisticTypesUsage!.jsonStatisticUsage[type]
    ).map(([k, v]) => {
      return {
        // @ts-ignore
        percent: v.usageSingly / (v.target / 100),
      };
    });
    const result =
      statisticTypeData.reduce((acc, el) => {
        return acc + el.percent;
      }, 0) / statisticTypeData.length;
    if (result === 0) {
      return "0";
    }
    return result.toFixed(2);
  };
  getYears = () => this.activityYear?.map((el) => el.year) ?? [];

  getActivitiesInYear = () =>
    this.activityYear
      ?.find((el) => el.year === this.getActiveYear())
      ?.statistic?.map((el) => {
        return { date: new Date(el.date), count: el.count };
      }) ?? [];
  initParam = async (id: string) => {
    await this.mapOk(
      "statisticTypesUsage",
      this.activityHttpRepository.getUserStatisticTypesUsage(Number(id))
    );
    await this.mapOk(
      "activityYear",
      this.activityHttpRepository.getAllYearsUserActivity(Number(id))
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

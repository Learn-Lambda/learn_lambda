import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { StatisticTypesUsage } from "./model/statistic_types_usage";

export class ActivityHttpRepository extends HttpRepository {
 
  getAllYearsUserActivity = (userId: number) =>
    this._jsonRequest(HttpMethod.POST, "/get/years/user/statistic", {
      id: userId,
    });
  getUserStatisticTypesUsage = (userId: number) =>
    this._jsonRequest<StatisticTypesUsage>(
      HttpMethod.POST,
      "/get/user/statistic/types/usage",
      {
        userId: userId,
      }
    );
  updateStatistic = (model: { id: number; statistic: string }) =>
    this._jsonRequest(
      HttpMethod.POST,
      "/update/user/statistic/types/usage",
      model
    );
}

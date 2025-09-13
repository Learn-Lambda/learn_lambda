import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { StatisticTypesUsage } from "./statistic_types_usage";

export class ActivityHttpRepository extends HttpRepository {
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

import { HttpMethod, HttpRepository } from "../../core/repository/http_repository";
import { StatisticRecognition } from "./recognition_model";

export class RecognitionHttpRepository extends HttpRepository {
  resetProgressWithTask = (task: { userId: number | undefined; taskId: number; }) => this._jsonRequest(HttpMethod.POST, '/reset/progress/with/task/recognition', task)
  getAllRecognition = () => this._jsonRequest(HttpMethod.GET, '/get/all/recognition')
  userCurrentRecognitionStatistic = (user: { userId: number }) => this._jsonRequest<StatisticRecognition>(HttpMethod.POST, '/user/current/recognition/statistic', user)
  
}

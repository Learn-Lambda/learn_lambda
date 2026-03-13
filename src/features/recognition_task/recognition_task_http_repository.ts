
import { Result } from "../../core/helper/result";
import { HttpMethod, HttpRepository } from "../../core/repository/http_repository";
import { RecognitionTaskModel } from "./recognition_task_model";
interface Task {
  userId: number
  taskId: number
}
export class RecognitionTaskHttpRepository extends HttpRepository {
  taskIsBloc = (taskId: number, userId: number) => this._jsonRequest(HttpMethod.POST, `/bloc/task/`, { taskId, userId })
  isItPosibleToPassTheExam = async (idCategory: string, userId: number) => this._jsonRequest<{ examIsPosible: boolean }>(HttpMethod.POST, '/is/it/possible/to/pass/the/exam/', { idCategory, userId: userId })
  setUserErrorRecognitionTask = async (task: Task) => this._jsonRequest(HttpMethod.POST, '/set/user/error/recognition/task', task);
  setUserRecognitionCategoryExamOkUpdateCount = async (task: Task) => this._jsonRequest(HttpMethod.POST, '/set/user/recognition/category/exam/ok/update/count', task)
  getTask = async (param: string, type: string, userId: number, isNeedNextTask: boolean = false) => (await this._jsonRequest<{ value: RecognitionTaskModel }>(HttpMethod.POST, '/get/recognition/task', { id: Number(param), type, userId, isNeedNextTask })).map((el) => Result.ok(el.value))
  getUserRecognitionStatisticInTask = async (task: Task) => this._jsonRequest(HttpMethod.POST, '/get/user/recognition/statistic/in/task', task)
}
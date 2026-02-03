import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { TaskSolutionResult } from "./task_solution_result";
import { ITask, Solution } from "./train_store";
export interface GtpMessage {
  message: string;
  messageType: string;
}
export class TrainHttpRepository extends HttpRepository {
  getMessagesWithTask = (
    taskId: number | undefined,
    userId: number | undefined
  ) =>
    this._jsonRequest<GtpMessage[]>(
      HttpMethod.POST,
      "/get/messages/with/task",
      {
        taskId: taskId,
        userId: userId,
      }
    );

  solveWithAi = (id: number, userId: number) =>
    this._jsonRequest<GtpMessage[]>(HttpMethod.POST, "/solve/with/ai", {
      taskId: id,
      userId: userId,
    });

  taskAiSolved = (id: number, userId: number) =>
    this._jsonRequest<{ solvedWithAi: string }>(
      HttpMethod.POST,
      "/task/ai/solved",
      {
        taskId: id,
        userId: userId,
      }
    );
  sendSolutions = (solution: Solution) =>
    this._jsonRequest<TaskSolutionResult[]>(
      HttpMethod.POST,
      "/run/task",
      solution
    );
  getLastTask = () =>
    this._jsonRequest<ITask>(HttpMethod.GET, "/get/last/task");

  sendMessageSolvedAi = (message: {
    taskId: number;
    userId: number;
    message: string;
  }) =>
    this._jsonRequest<GtpMessage>(
      HttpMethod.POST,
      "/send/message/solved/ai",
      message
    );
}

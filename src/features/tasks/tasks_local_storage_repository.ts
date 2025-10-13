import { LocalStorageRepository } from "../../core/repository/local_storage_repository";

export class TaskLocalStorageRepository extends LocalStorageRepository {
  setTaskSettings = (obj: {
    planSolutions: boolean;
    aiSolutions: boolean;
    complexity: number;
    onlyUnresolved: boolean;
    tagsQuery: string[];
  }) => this._setItem("taskSettings", JSON.stringify(obj));
  getTaskSettings = () =>
    this._getItem<string>("taskSettings").map(
      (el) =>
        JSON.parse(el) as {
          planSolutions: boolean;
          aiSolutions: boolean;
          complexity: number;
          onlyUnresolved: boolean;
          tagsQuery: string[];
        }
    );
}

import { Result } from "../../core/helper/result";
import { LocalStorageRepository } from "../../core/repository/local_storage_repository";
export interface ITestIndicator { date: string; taskId: string, count: number, isError: boolean }
// export class RecognitionTaskLocalStorageRepository extends LocalStorageRepository {
//     getTaskData = () => this._getItem<string>(this._storageKey).map((el) => JSON.parse(el as string) as unknown as ITestIndicator[])
//     addTaskData = (taskData: ITestIndicator) =>
//         this._getItem<string>(this._storageKey).fold(
//             (s) => {
//                 const items: ITestIndicator[] = JSON.parse(s);
//                 items.push(taskData);
//                 this._setItem(this._storageKey, JSON.stringify(items));
//             },
//             (_) => {
//                 this._setItem(this._storageKey, JSON.stringify([taskData]));
//             },
//         );
//     _storageKey = "recognition_task";
// }

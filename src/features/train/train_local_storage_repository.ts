import { LocalStorageRepository } from "../../core/repository/local_storage_repository";

export class TrainLocalStorageRepository extends LocalStorageRepository {
  key = "vscode_mode";
  getVsCodeMode = () => this._getItem(this.key).map((el) => Boolean(el));
  setVsCodeMode = (mode: boolean) => this._setItem(this.key, String(mode));
}

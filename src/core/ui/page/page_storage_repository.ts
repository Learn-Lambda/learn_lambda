import { Result } from "../../helper/result";
import { IUser } from "../../model/user";
import { LocalStorageRepository } from "../../repository/local_storage_repository";

export class PageStorageRepository extends LocalStorageRepository {
  logout = () => {
    this._removeItem("jwt");
    this._removeItem("user");
    this._removeItem("auth");
  };
  getUser = () =>
    this._getItem<string>("user").map((user) => Result.ok(JSON.parse(user) as IUser));
}

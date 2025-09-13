/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result } from "../../core/helper/result";
import { IUser } from "../../core/model/user";
import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";
import { LocalStorageRepository } from "../../core/repository/local_storage_repository";
import { AuthorizationModel } from "./authorization_model";

export class AuthorizationLocalStorageRepository extends LocalStorageRepository {
  getUser = (): Result<any, IUser> =>
    this._getItem<string>("user").map((el) => Result.ok(JSON.parse(el)));
  setUser = (user: IUser) => this._setItem("user", JSON.stringify(user));
  setJwtToken = (token: string) => this._setItem("jwt", token);
  setAuthStatus = (bool: boolean) => this._setItem("auth", String(bool));
  getJwtToken = () => this._getItem<string>("jwt");
  isAuth = () => this._getItem("auth").map((s: any) => Boolean(s));
}
export class AuthorizationHttpRepository extends HttpRepository {
  login = (authorizationModel: AuthorizationModel) =>
    this._jsonRequest<{ token: string }>(
      HttpMethod.POST,
      "/login",
      authorizationModel
    );
  getUserProfileFromJwt = () =>
    this._jsonRequest<IUser>(HttpMethod.POST, "/get/user/profile/at/jwt");
}

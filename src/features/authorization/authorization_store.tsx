import makeAutoObservable from "mobx-store-inheritance";
import { AuthorizationModel } from "./authorization_model";
import { message } from "antd";
import {
  AuthorizationHttpRepository,
  AuthorizationLocalStorageRepository,
} from "./authorization_repository";
import { FormState } from "../../core/store/base_store";
import { TasksPath } from "../tasks/tasks";
import { NavigateFunction } from "react-router-dom";
import { authService } from "../..";

export class AuthorizationStore extends FormState<AuthorizationModel> {
  viewModel: AuthorizationModel = AuthorizationModel.empty();
  authorizationLocalStorageRepository: AuthorizationLocalStorageRepository =
    new AuthorizationLocalStorageRepository();
  authorizationHttpRepository = new AuthorizationHttpRepository();
  constructor() {
    super();
    makeAutoObservable(this);
  }
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    this.authorizationLocalStorageRepository.isAuth().map((isAuth) => {
      if (isAuth) {
        this.navigate?.(TasksPath);
        authService.emit({ isAuthorization: true });
      }
    });
  }
  async onTapLogin() {
    (await this.viewModel.valid())?.fold(
      async () => {
        (await this.authorizationHttpRepository.login(this.viewModel)).fold(
          async (token) => {
            this.authorizationLocalStorageRepository.setAuthStatus(true);
            this.authorizationLocalStorageRepository.setJwtToken(token.token);
            await (
              await this.authorizationHttpRepository.getUserProfileFromJwt()
            ).map((user) => {
              this.authorizationLocalStorageRepository.setUser(user);
              this.navigate?.(TasksPath);
              authService.emit({ isAuthorization: true });
            });
          },
          async (e) => {
            message.error(e.message);
          }
        );
      },
      async (e) => message.error(e)
    );
  }
}

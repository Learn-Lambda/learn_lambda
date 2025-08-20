import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../core/store/base_store";
import { TokenHttpRepository } from "./token_http_repository";
import { NavigateFunction } from "react-router-dom";
import { delay } from "../../core/helper/delay";
interface IToken {
  token: string;
}
export class TokenStore extends NavigateState {
  token?: IToken;
  tokenHttpRepository = new TokenHttpRepository();
  tokenAnimation = false;
  constructor() {
    super();
    makeAutoObservable(this);
  }
  async init(navigate?: NavigateFunction): Promise<any> {
    super.init(navigate);
    await this.mapOk("token", this.tokenHttpRepository.getToken());
  }
  async copyToken() {
    this.tokenAnimation = true;
    await navigator.clipboard.writeText(this.token?.token ?? "");
    await delay(1000)
    this.tokenAnimation = false;
  }
}

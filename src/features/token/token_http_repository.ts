import {
  HttpMethod,
  HttpRepository,
} from "../../core/repository/http_repository";

export class TokenHttpRepository extends HttpRepository {
  getToken = () => this._jsonRequest(HttpMethod.POST, "/get/token/vscode");
}

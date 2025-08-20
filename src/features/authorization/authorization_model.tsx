import { IsNotEmpty, IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class AuthorizationModel extends ValidationModel {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;

  static empty = () => new AuthorizationModel();
}

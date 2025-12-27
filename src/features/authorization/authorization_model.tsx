import { IsNotEmpty, IsString } from "class-validator";
import { ValidationModel } from "../../core/model/validation_model";

export class AuthorizationModel extends ValidationModel {
  @IsNotEmpty({message:"поле Логин должно быть заполнено"})
  // @IsString({message:"поле Логин должно быть строкой"})
  login: string;
  @IsNotEmpty({message:"поле Пароль должно быть заполнено"})
  // @IsString({message:"поле Пароль должно быть строкой"})
  password: string;

  static empty = () => new AuthorizationModel();
}

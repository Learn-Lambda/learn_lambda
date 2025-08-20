import { message } from "antd";
import { Result } from "../helper/result";
import { validate, ValidationError } from "class-validator";

export class ValidationModel {
  id?:number;
  valid = async <T>(): Promise<Result<string, T>> => {
    const errors: ValidationError[] = await validate(this, {
      skipMissingProperties: false,
      whitelist: false,
      forbidNonWhitelisted: true,
    });

    if (errors.isNotEmpty()) {
      const message = errors.map((error: ValidationError) => {
        let result = "";
        if (error.children)
          error.children.map((el) => {
            if (el.constraints) {
              result += Object.values(el.constraints).join(", ");
            }
          });
        if (error.constraints) result += Object.values(error.constraints).join(", ");
        return result;
      });
      return Result.error(message.join(", \n"));
    } else {
      return Result.ok(this as unknown as T);
    }
  };

  validMessage = async<T>(): Promise<Result<string, T>> => {
    const result = await this.valid<T>();

    if (result.isFailure()) {
      message.error(result.error);
    }
    return result;
  }
}

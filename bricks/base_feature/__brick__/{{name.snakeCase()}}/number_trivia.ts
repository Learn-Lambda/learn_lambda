import { Result } from "../../core/helper/result";

export class NumberTriviaModel {
  constructor() {}
  isValid(): Result<string, void> {
    return Result.ok();
  }
  static empty() {
    return new NumberTriviaModel();
  }
}

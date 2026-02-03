import { ValidationModel } from "../../core/model/validation_model";

export class RecognitionModel extends ValidationModel {
  name: string;
  topics: { name: string; didYouPassTheTest: boolean }[];
  // сдал ли пользователь зачет?
  didYouPassTheTest: boolean;

  whatHasBeenPassed = () => '';
}

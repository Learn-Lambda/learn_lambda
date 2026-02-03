import { FormState } from "../../core/store/base_store";
import { RecognitionModel } from "../recognition/recognition_model";

export class RecognitionCategoryStore extends FormState<RecognitionModel> {
  viewModel: RecognitionModel = {
    name: "Функции",
    topics: [
      { name: "Аргументы", didYouPassTheTest: false },
      { name: "Тело функции", didYouPassTheTest: false },
      { name: "Название функции", didYouPassTheTest: false },
      { name: "Вызов функции", didYouPassTheTest: false },
      { name: "Анонимные функции", didYouPassTheTest: false },
      { name: "Стрелочные функции", didYouPassTheTest: false },
      { name: "Цепочки функций", didYouPassTheTest: false },
    ],
    didYouPassTheTest: false,
    // @ts-ignore
    valid: undefined,
    // @ts-ignore
    validMessage: undefined,
    whatHasBeenPassed: () => "10 из 20",
  };
  constructor() {
    super();
  }
}

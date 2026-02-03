import makeAutoObservable from "mobx-store-inheritance";
import { FormState } from "../../core/store/base_store";
import { RecognitionModel } from "./recognition_model";

export class RecognitionStore extends FormState<RecognitionModel> {
  viewModel: RecognitionModel = new RecognitionModel();
  recognitionModels: RecognitionModel[] = [
    {
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
    },
    {
      name: "Переменные",
      topics: [
        { name: "Аргументы", didYouPassTheTest: false },
        { name: "Тело функции", didYouPassTheTest: false },
        { name: "Имя функции", didYouPassTheTest: false },
      ],
      didYouPassTheTest: false,
      // @ts-ignore
      valid: undefined,
      // @ts-ignore
      validMessage: undefined,
      whatHasBeenPassed: () => "2 из 10",
    },
    {
      name: "Типы данных",
      topics: [
        { name: "Аргументы", didYouPassTheTest: false },
        { name: "Тело функции", didYouPassTheTest: false },
        { name: "Имя функции", didYouPassTheTest: false },
      ],
      didYouPassTheTest: false,
      // @ts-ignore
      valid: undefined,
      // @ts-ignore
      validMessage: undefined,
      whatHasBeenPassed: () => "1 из 5",
    },
  ];
  constructor() {
    super();
    makeAutoObservable(this);
  }
}

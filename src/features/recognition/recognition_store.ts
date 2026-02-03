import makeAutoObservable from "mobx-store-inheritance";
import { FormState } from "../../core/store/base_store";
import { RecognitionModel } from "./recognition_model";

export class RecognitionStore extends FormState<RecognitionModel> {
  viewModel: RecognitionModel = new RecognitionModel();
  constructor() {
    super();
    makeAutoObservable(this);
  }
}

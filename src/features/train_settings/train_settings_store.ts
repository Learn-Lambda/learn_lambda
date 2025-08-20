import makeAutoObservable from "mobx-store-inheritance";
import { NavigateState } from "../../core/store/base_store";

export class TrainSettingsStore extends NavigateState {
  constructor() {
    super();
    makeAutoObservable(this);
  }
}

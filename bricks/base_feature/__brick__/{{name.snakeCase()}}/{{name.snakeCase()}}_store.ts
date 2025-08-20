import makeAutoObservable from "mobx-store-inheritance";

export class {{name.pascalCase()}}Store {
  constructor() {
    makeAutoObservable(this);
  }
}

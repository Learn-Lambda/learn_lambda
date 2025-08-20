import type { NavigateFunction } from "react-router-dom";
import { Result } from "../helper/result";
import { UiBaseError } from "../model/ui_base_error";
import { message } from "antd";
import { plainToInstance, type ClassConstructor } from "class-transformer";
import { CrudHttpRepository, HttpError } from "../repository/http_repository";
import { ValidationModel } from "../model/validation_model";
import type { Pagination } from "../model/pagination";

export type CoreError = HttpError | Error;

export interface Drawer {
  name: string;
  status: boolean;
}

interface IMessage {
  successMessage?: string;
  errorMessage?: string;
}
export class ModalStore {
  isModalOpen: boolean = false;
  modalShow = () => {
    this.isModalOpen = true;
  };

  modalClickOk = () => {
    this.isModalOpen = false;
  };

  modalCancel = () => {
    this.isModalOpen = false;
  };
}
export abstract class UiLoader extends ModalStore {
  isLoading = false;
  async httpHelper<T>(callBack: Promise<Result<any, T>>) {
    this.isLoading = true;

    const result = await callBack;
    if (result.isFailure()) {
      this.isLoading = false;
      this.errorHandingStrategy(result.error);
      return result.forward();
    }

    this.isLoading = false;
    return result;
  }
  abstract errorHandingStrategy: (error?: any) => void;

  mapOk = async <T>(
    property: string,
    callBack: Promise<Result<CoreError, T>>
  ) => {
    return (await this.httpHelper(callBack)).map((el) => {
      // @ts-ignore
      this[property] = el;
    });
  };
  messageHttp = async <T>(
    callBack: Promise<Result<CoreError, T>>,
    report?: IMessage
  ) => {
    return (await this.httpHelper(callBack)).fold(
      (_s) => {
        if (report && report.successMessage)
          message.success(report.successMessage);
      },
      (_e) => {
        if (report && report.errorMessage) message.error(report.errorMessage);
      }
    );
  };
}
export class SimpleErrorState extends UiLoader {
  errorHandingStrategy = () => {
    this.isError = true;
  };
  isError = false;
}

export abstract class UiErrorState<T> extends UiLoader {
  errorHandingStrategy = (error: T) => {
    console.log(error);
  };
  abstract init(navigate?: NavigateFunction): Promise<any>;
  dispose() {}
  errors: UiBaseError[] = [];
}

export abstract class DrawerState<E> extends UiErrorState<E> {
  titleDrawer: string = "";
  drawers: Drawer[];
  constructor(drawerEnum: Object) {
    super();
    this.drawers = Object.entries(drawerEnum).map((k, v) => {
      return {
        name: k.at(1) ?? "",
        status: false,
      };
    });
  }
  editDrawer(drawerName: string, status: boolean): void {
    this.titleDrawer = drawerName;
    this.drawers = this.drawers.map((el) => {
      if (el.name === drawerName) {
        el.status = status;
      }
      return el;
    });
  }
}
export abstract class UiDrawerFormState<V, E> extends DrawerState<E> {
  abstract viewModel: V;
  updateForm(value: Partial<V>) {
    //@ts-ignore
    this.viewModel = Object.assign(this.viewModel, value);
  }
  loadDependency = (viewModel: V) => {
    this.viewModel = viewModel;
  };
  loadClassInstance = (instance: ClassConstructor<V>, viewModel: V) => {
    this.viewModel = plainToInstance(instance, viewModel);
  };
}

export abstract class NavigateState extends UiErrorState<any> {
  navigate?: NavigateFunction;

  async init(navigate?: NavigateFunction): Promise<any> {
    this.navigate = navigate;
  }
}

export abstract class FormState<V> extends UiErrorState<any> {
  abstract viewModel: V;
  navigate?: NavigateFunction;
  updateFormCallback = () => {};
  updateForm(value: Partial<V>) {
    //@ts-ignore
    this.viewModel = Object.assign(this.viewModel, value);
    this.updateFormCallback();
  }
  loadDependency = (viewModel: V | undefined) => {
    if (viewModel) this.viewModel = viewModel;
  };
  loadClassInstance = (instance: ClassConstructor<V>, viewModel: V) => {
    this.viewModel = plainToInstance(instance, viewModel);
  };
  isModalOpen: boolean = false;
  modalShow = () => {
    this.isModalOpen = true;
  };

  modalClickOk = () => {
    this.isModalOpen = false;
  };

  modalCancel = () => {
    this.isModalOpen = false;
  };
  async init(navigate?: NavigateFunction): Promise<any> {
    this.navigate = navigate;
  }
}

export abstract class CrudFormStore<
  V extends ValidationModel,
  R extends CrudHttpRepository<V>
> extends FormState<V> {
  models = (): V[] | undefined => this.page?.data;
  page?: Pagination<V>;
  abstract repository: R;
  async init(navigate?: NavigateFunction): Promise<any> {
    await this.mapOk("page", this.read());
  }

  create = (model: V) => this.repository.addModel(model);
  delete = (id: number) => {
    this.repository.deleteModel(id);
    this.mapOk("page", this.read());
  };
  update = (model: V) => this.repository.edit(model);
  read = () => this.repository.getPage(this.page?.currentPage ?? 1);
  nextPage = async () => {
    if (this.page?.currentPage !== undefined) {
      this.page!.currentPage += 1;
      await this.mapOk("page", this.read());
    }
  };
  editable = (model: V) => {
    this.loadDependency(model);
    this.modalShow();
  };
  prevPage = async () => {
    if (this.page?.currentPage !== undefined) {
      this.page!.currentPage -= 1;
      await this.mapOk("page", this.read());
    }
  };
  async initCrud() {
    await this.mapOk("page", this.read());
  }
  new = async () => {
    (await this.viewModel.validMessage()).map(async () => {
      this.create(this.viewModel);
      await this.mapOk("page", this.read());
    });
  };
  async saveModalButton() {
    await (
      await this.update(this.viewModel)
    ).map(() => {
      this.modalCancel();
      this.initCrud();
    });
  }
}

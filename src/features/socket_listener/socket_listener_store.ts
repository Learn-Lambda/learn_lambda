import { makeAutoObservable } from "mobx";
import {
  socketRepository,
  SocketRepository,
} from "../../core/repository/socket_repository";
import { AuthorizationLocalStorageRepository } from "../authorization/authorization_repository";

export enum ConnectStatus {
  pure,
  error,
  success,
}

class SocketListenerStore {
  socketRepository: SocketRepository;
  socketHasDisconnect = false;
  authorizationLocalStorageRepository =
    new AuthorizationLocalStorageRepository();
  connectStatus: ConnectStatus = ConnectStatus.pure;
  constructor(repository: SocketRepository) {
    this.socketRepository = repository;
    makeAutoObservable(this);
    this.init();
  }
  async init() {
    if (this.connectStatus === ConnectStatus.pure) {
      this.socketConnect();
    }
  }
  async reconnect() {
    this.socketConnect();
    this.socketHasDisconnect = false;
  }
  socketConnect = () => {
    this.authorizationLocalStorageRepository
      .getJwtToken()
      .map(async (token) => {
        (await this.socketRepository.connect(token)).fold(
          () => {
            this.socketHasDisconnect = false;
            this.connectStatus = ConnectStatus.error;
          },
          () => {
            this.socketHasDisconnect = true;
            this.connectStatus = ConnectStatus.success;
          }
        );
      });
  };
}

export const socketListenerStore = new SocketListenerStore(socketRepository);

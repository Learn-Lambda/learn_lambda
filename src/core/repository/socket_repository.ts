import { Socket, io } from "socket.io-client";
import { Result } from "../helper/result";

export class SocketRepository {
  serverURL = "ws://localhost:4001";
  socket: Socket | undefined;

  async connect(jwt: string): Promise<Result<boolean, boolean>> {
    const socket = io(this.serverURL, { reconnection: true });

    this.socket = socket;
    socket.connect();
    socket.emit("auth", { jwt: jwt, env: "web" });
    if (socket.connected) {
      return Result.ok(true);
    }
    return Result.error(false);
  }
}

export const socketRepository = new SocketRepository();

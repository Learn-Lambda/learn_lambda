import { TypedEvent } from "../helper/typed_event";

export class AuthService extends TypedEvent<{ isAuthorization: boolean }> {}

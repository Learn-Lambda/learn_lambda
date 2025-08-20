import { Navigate } from "react-router-dom";
import { AuthorizationLocalStorageRepository } from "../../../features/authorization/authorization_repository";
import { AuthorizationScreenPath } from "../../../features/authorization/authorization_screen";
import { useEffect } from "react";
import { SocketListener } from "../../../features/socket_listener/socket_listener";

interface IPrivateRouter {
  children?: JSX.Element | JSX.Element[];
}

export const PrivateRouter = (props: IPrivateRouter) => {
  return new AuthorizationLocalStorageRepository().isAuth().fold(
    (isAuth) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {}, []);
      return <SocketListener children={props.children} />;
    },  
    (e) => {
      return <Navigate to={AuthorizationScreenPath} />;
    }
  );
};

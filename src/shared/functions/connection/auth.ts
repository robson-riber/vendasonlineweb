import { redirect } from "react-router-dom";

import { LoginRoutesEnum } from "../../../modules/login/routes";
import { UserType } from "../../../modules/login/types/UserType";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { URL_USER } from "../../constants/urls";
import { connectionAPIGet } from "./connectionAPI";
import {
  getItemStorage,
  removeItemStorage,
  setItemStorage,
} from "./storageProxy";

export const unsetAuthorizationToken = () =>
  removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async (
  setUser: (user: UserType) => void,
  user?: UserType,
) => {
  const token = getAuthorizationToken();

  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  if (!user) {
    await connectionAPIGet<UserType>(URL_USER)
      .then((userReturn) => {
        setUser(userReturn);
      })
      .catch(() => {
        unsetAuthorizationToken();
        location.href = "/login";
      });
  }

  //alert("Funcionou");
  return null;
};

export const logout = () => {
  unsetAuthorizationToken();
  location.href = "/login";
};

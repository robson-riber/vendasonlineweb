import { useState } from "react";
import { NavigateFunction } from "react-router-dom";

import { FirstScreenRoutesEnum } from "../../modules/firstScreen/routes";
import { AuthType } from "../../modules/login/types/AuthType";
import { ERROR_INVALID_PASSWORD } from "../constants/errosStatus";
import { URL_AUTH } from "../constants/urls";
import { setAuthorizationToken } from "../functions/connection/auth";
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from "../functions/connection/connectionAPI";
import { useGlobalContext } from "./useGlobalContext";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
    message?: string,
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnObject: T | undefined = await ConnectionAPI.connect<T>(
      url,
      method,
      body,
    )
      .then((result) => {
        //alert(`Login efetuado com sucesso! ${result}`);
        if (saveGlobal) {
          saveGlobal(result);
        }
        if (message) {
          setNotification("Sucesso!", "success", message);
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, "error");
        return undefined;
        alert("Erro");
      });

    return returnObject;
  };

  const authRequest = async (
    navigate: NavigateFunction,
    body: unknown,
  ): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        setNotification("deu certo.", "success");
        //navigate(ProductRoutesEnum.PRODUCT);
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
        return result;
      })
      .catch(() => {
        //alert("dados incorretos");
        setNotification(ERROR_INVALID_PASSWORD, "error");
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};

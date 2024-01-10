import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthType } from "../../modules/login/types/AuthType";
import { ProductRoutesEnum } from "../../modules/product/routes";
import { ERROR_INVALID_PASSWORD } from "../constants/errosStatus";
import { URL_AUTH } from "../constants/urls";
import { setAuthorizationToken } from "../functions/connection/auth";
import { connectionAPIPost } from "../functions/connection/connectionAPI";
import { useGlobalContext } from "./useGlobalContext";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setNotification } = useGlobalContext();

  const getRequest = async (url: string) => {
    setLoading(true);

    return await axios({
      method: "get",
      url: url,
    })
      .then((result) => {
        alert(`Login efetuado com sucesso! ${result.data.accessToken} `);
        return result.data;
      })
      .catch(() => {
        alert("Erro");
      });
  };

  const postRequest = async <T>(
    url: string,
    body: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnData = await connectionAPIPost<T>(url, body)
      .then((result) => {
        //alert("login ok");
        setNotification("deu certo", "success");
        navigate(ProductRoutesEnum.PRODUCT);
        return result;
      })
      .catch((error: Error) => {
        //alert("dados incorretos");
        setNotification(error.message, "error");
        return undefined;
      });

    setLoading(false);

    return returnData;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setAuthorizationToken(result.accessToken);
        setNotification("deu certo", "success");
        navigate(ProductRoutesEnum.PRODUCT);
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
    getRequest,
    postRequest,
    authRequest,
  };
};

import axios from "axios";
import { useState } from "react";

import { connectionAPIPost } from "../functions/connection/connectionAPI";
import { useGlobalContext } from "./useGlobalContext";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);

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

  return {
    loading,
    getRequest,
    postRequest,
  };
};

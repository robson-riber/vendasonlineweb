import axios from "axios";
import { useState } from "react";

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

  const postRequest = async (url: string, body: any) => {
    setLoading(true);

    const returnData = await axios({
      method: "post",
      url: url,
      data: body,
    })
      .then((result) => {
        //alert("login ok");
        setNotification("deu certo", "success");
        return result.data;
      })
      .catch(() => {
        //alert("dados incorretos");
        setNotification("Senha inválida", "error");
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

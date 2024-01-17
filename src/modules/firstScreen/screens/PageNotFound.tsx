/*
https://ant.design/components/result#result-demo-404
*/

import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

import { LoginRoutesEnum } from "../../login/routes";
import { ContainerPageNotFound } from "../styles/pageNotFound.styles";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="There are some problems with your operation."
        subTitle="Teste subtitulo"
        extra={
          <Button onClick={handleOnClickButton} type="primary" key="console">
            Ir para Login
          </Button>
        }
      />
    </ContainerPageNotFound>
  );
};

export default PageNotFound;

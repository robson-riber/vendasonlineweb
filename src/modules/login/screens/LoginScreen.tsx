import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/buttons/button/Button";
import Input from "../../../shared/components/inputs/input/Input";
import { useRequests } from "../../../shared/hooks/useRequests";
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
  TitleLogin,
} from "../../styles/loginScreen.style";

const LoginScreen = () => {
  const navigate = useNavigate();
  //const { setAccessToken } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    authRequest(navigate, {
      email: email,
      password: password,
    });
  };

  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo4b.png"></LogoImage>
          <TitleLogin level={2} type="secondary">
            LOGIN
          </TitleLogin>
          <Input
            title="Usuário"
            margem="40px 0px 16px 0px"
            onChange={handleEmail}
            value={email}
          />
          <Input
            type="password"
            title="Senha"
            margem="10px 0px 0px 0px"
            onChange={handlePassword}
            value={password}
          />
          <Button
            loading={loading}
            type="primary"
            margem="40px 0px 10px 0px"
            onClick={handleLogin}
          >
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
      <BackgroundImage src="./background.png" />
    </ContainerLoginScreen>
  );
};

export default LoginScreen;

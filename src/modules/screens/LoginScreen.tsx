import axios from "axios";
import { useState } from "react";

import Button from "../../shared/buttons/button/Button";
import Input from "../../shared/inputs/input/input";
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
  TitleLogin,
} from "../styles/loginScreen.style";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8080/auth",
      data: {
        email: email,
        password: password,
      },
    })
      .then((result) => {
        alert(`Login efetuado com sucesso! ${result.data.accessToken} `);
        return result.data;
      })
      .catch(() => {
        alert("Usuário e ou senha inválidos!");
      });

    //console.log("returnObject: ", returnObject);
  };

  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo4b.png"></LogoImage>
          <TitleLogin type="secondary">LOGIN</TitleLogin>
          <Input
            title="Usuário"
            margem="40px 0px 16px 0px"
            onChange={handleEmail}
            value={email}
          />
          <Input
            title="Senha"
            margem="10px 0px 0px 0px"
            onChange={handlePassword}
            value={password}
          />
          <Button
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

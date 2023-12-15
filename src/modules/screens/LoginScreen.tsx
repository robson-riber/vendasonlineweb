import { Input } from "antd";

import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
} from "../styles/loginScreen.style";

const LoginScreen = () => {
  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo4b.png"></LogoImage>
          <Input title="Usuário" />
          <Input title="Senha" />
        </LimitedContainer>
      </ContainerLogin>
      <BackgroundImage src="./background.png" />
    </ContainerLoginScreen>
  );
};

export default LoginScreen;

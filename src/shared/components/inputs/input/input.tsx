import { Input as InputAntd, InputProps as InputPropsAntd } from "antd";

import { BoxInput, TitleInput } from "./input.styles";

export interface InputProps extends InputPropsAntd {
  title?: string;
  margem?: string;
}

const Input = ({ title, margem, ...props }: InputProps) => {
  return (
    <BoxInput style={{ margin: margem }}>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;

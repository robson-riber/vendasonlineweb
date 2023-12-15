import { ButtonProps } from "antd";

import { ButtonAntd } from "./Button.styles";

interface ButtonCurrentProps extends ButtonProps {
  margem?: string;
}

const Button = ({ margem, ...props }: ButtonCurrentProps) => {
  return <ButtonAntd style={{ margin: margem }} {...props}></ButtonAntd>;
};

export default Button;

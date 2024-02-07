import { Select as SelectAntd, SelectProps as SelectPropsAntd } from "antd";

import { BoxSelect, TitleSelect } from "./select.styles";

interface SelectProps extends SelectPropsAntd {
  title?: string;
  margem?: string;
}

const Select = ({ title, margem, ...props }: SelectProps) => {
  return (
    <BoxSelect style={{ margin: margem }}>
      {title && <TitleSelect>{title}</TitleSelect>}
      <SelectAntd style={{ width: "100%" }} {...props} />
    </BoxSelect>
  );
};

export default Select;

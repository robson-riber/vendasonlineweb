import { LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 72px;
  width: calc(100% - 240px);
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  padding-right: 17px;

  background-color: white;
  -webkit-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  -moz-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
`;

export const LogoExit = styled(LogoutOutlined)`
  font-size: 22px;
`;

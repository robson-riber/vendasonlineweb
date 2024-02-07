import {
  CaretRightOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  LaptopOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import type { MenuProps, MenuTheme } from "antd";
import { Menu as MenuAntd } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductRoutesEnum } from "../../../modules/product/routes";
import {
  ContainerLogoName,
  ContainerMenu,
  LogoMenu,
  NameCompany,
} from "./menu.style";

type MenuItem = Required<MenuProps>["items"][number];

const Menu = () => {
  const [theme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState("1");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items: MenuItem[] = [
    {
      key: "Home",
      label: "Principal",
      icon: <HomeOutlined />,
    },
    {
      key: "products",
      label: "Produtos",
      icon: <LaptopOutlined />,
      children: [
        {
          key: "products_view",
          label: "Visualizar",
          icon: <CaretRightOutlined />,
          onClick: () => navigate(ProductRoutesEnum.PRODUCT),
        },
        {
          key: "products_insert",
          label: "Inserir",
          icon: <CaretRightOutlined />,
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },

    {
      key: "category",
      label: "Categorias",
      icon: <LaptopOutlined />,
      children: [
        {
          key: "category_view",
          label: "Visualizar",
          icon: <CaretRightOutlined />,
          onClick: () => navigate(ProductRoutesEnum.PRODUCT),
        },
        {
          key: "category_insert",
          label: "Inserir",
          icon: <CaretRightOutlined />,
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },

    {
      key: "order",
      label: "Pedidos",
      icon: <SafetyCertificateOutlined />,
    },
    {
      key: "user",
      label: "Clientes",
      icon: <CustomerServiceOutlined />,
    },
  ];

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany>Vendas Online</NameCompany>
      </ContainerLogoName>
      <MenuAntd
        theme={theme}
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerMenu>
  );
};

export default Menu;

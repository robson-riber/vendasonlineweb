import { Input, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/buttons/button/Button";
import Screen from "../../../shared/components/screen/Screen";
import Table from "../../../shared/components/table/Table";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/method.enum";
import { convertNumberToMoney } from "../../../shared/functions/money";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { ProductType } from "../../../shared/types/ProductType";
import CategoryColumn from "../components/CategoryColumn";
import TooltipImage from "../components/TooltipImage";
import { ProductRoutesEnum } from "../routes";
import {
  BoxButtons,
  LimiteSizeButton,
  LimiteSizeInput,
} from "../styles/product.style";

/**
  https://ant.design/components/table
*/

const { Search } = Input;

const columns: TableProps<ProductType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (_, product) => <TooltipImage product={product} />,
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Categoria",
    dataIndex: "category",
    key: "category",
    render: (_, product) => <CategoryColumn category={product.category} />,
  },
  {
    title: "Preço",
    dataIndex: "price",
    key: "price",
    render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
  },
];

const listBreadcrumb = [
  {
    name: "HOME",
  },
  {
    name: "PRODUTOS",
  },
];

const Product = () => {
  const { products, setProducts } = useDataContext();
  const [productsFiltered, setProductsFiltered] = useState<ProductType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setProductsFiltered([...products]);
  }, [products]);

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setProductsFiltered([...products]);
    } else {
      setProductsFiltered([
        ...productsFiltered.filter((product) => product.name.includes(value)),
      ]);
    }
  };

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <BoxButtons>
        <LimiteSizeInput>
          <Search
            placeholder="Buscar produto"
            onSearch={onSearch}
            enterButton
          ></Search>
        </LimiteSizeInput>

        <LimiteSizeButton>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimiteSizeButton>
      </BoxButtons>
      <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
  );
};

export default Product;

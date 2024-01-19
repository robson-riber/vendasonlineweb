import { TableProps } from "antd";
import { useEffect } from "react";

import Table from "../../../shared/components/table/Table";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/method.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { ProductType } from "../types/ProductType";

const columns: TableProps<ProductType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Preço",
    dataIndex: "price",
    key: "price",
  },
];

const Product = () => {
  const { products, setProducts } = useDataContext();

  const { request } = useRequests();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  return <Table columns={columns} dataSource={products} />;
};

export default Product;

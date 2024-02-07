import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/buttons/button/Button";
import InputMoney from "../../../shared/components/inputMoney/InputMoney";
import Input from "../../../shared/components/inputs/input/Input";
import Select from "../../../shared/components/inputs/select/select";
import Screen from "../../../shared/components/screen/Screen";
import { LimitedContainer } from "../../../shared/components/styles/display.styled";
import { DisplayFlexJustifyRight } from "../../../shared/components/styles/limited.styled";
import { URL_CATEGORY, URL_PRODUCT } from "../../../shared/constants/urls";
import { InsertProduct } from "../../../shared/dtos/InsertProduct.dto";
import { MethodsEnum } from "../../../shared/enums/method.enum";
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { ProductRoutesEnum } from "../routes";
import { ProductInsertContainer } from "../styles/productInsert.style";

/*
https://ant.design/components/select
*/

const ProductInsert = () => {
  const [product, setProduct] = useState<InsertProduct>({
    name: "",
    price: 0,
    image: "",
  });

  const { categories, setCategories } = useDataContext();
  const { setNotification } = useGlobalContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleInsertProduct = async () => {
    await connectionAPIPost(URL_PRODUCT, product)
      .then(() => {
        setNotification("Produto gravado com sucesso!", "success");
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch((error: Error) => {
        setNotification(error.message, "error");
      });
  };

  const handleOnClickCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  /* const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            price: Number(event?.target.value),
        })
    }*/

  const handleChange = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: "HOME",
        },
        {
          name: "PRODUTOS",
          navigateTo: ProductRoutesEnum.PRODUCT,
        },
        {
          name: "INSERIR PRODUTO",
        },
      ]}
    >
      <ProductInsertContainer>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChange(event, "name")}
            value={product.name}
            margem="0px 0px 17px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChange(event, "image")}
            value={product.image}
            margem="0px 0px 17px 0px"
            title="Url Imagem"
            placeholder="Url Imagem"
          />
          <InputMoney
            onChange={(event) => onChange(event, "price", true)}
            value={product.price}
            margem="0px 0px 17px 0px"
            title="Preço"
            placeholder="Preço"
          />

          <Select
            title="Categoria"
            margem="0px 0px 17px 0px"
            //style={{ width: 220 }}
            onChange={handleChange}
            options={categories.map((category) => ({
              value: `${category.id}`,
              label: `${category.name}`,
            }))}
          />

          <br />
          <br />

          <DisplayFlexJustifyRight>
            <LimitedContainer width={120}>
              <Button danger onClick={handleOnClickCancel} type="primary">
                Cancelar
              </Button>
            </LimitedContainer>

            <LimitedContainer width={120}>
              <Button onClick={handleInsertProduct} type="primary">
                Salvar Produto
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </ProductInsertContainer>
    </Screen>
  );
};

export default ProductInsert;

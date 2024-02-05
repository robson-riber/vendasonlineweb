import { Button, Select } from "antd";
import { useEffect, useReducer } from "react";
import Input from "../../../shared/components/inputs/input/input";
import Screen from "../../../shared/components/screen/Screen"
import { URL_CATEGORY } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/method.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { ProductRoutesEnum } from "../routes";
import { LimitedContainer } from "../styles/productInsert.style";

const ProductInsert = () => {

    const { categories, setCategories } = useDataContext();
    const { request } = useRequests();

    useEffect(() => {
        if (categories.length === 0 ) {
            request(URL_CATEGORY, MethodsEnum.GET, setCategories);
        } 
    }, []);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    return (
        <Screen listBreadcrumb = {[
            {
            name: 'HOME',
            },
            {
                name: 'PRODUTOS',
                navigateTo: ProductRoutesEnum.PRODUCT
            },
            {
                name: 'INSERIR PRODUTO'
            },
            ]}
        >
            <LimitedContainer>
                <Input margem="0px 0px 17px 0px" title="Nome" placeholder="Nome" />
                <Input margem="0px 0px 17px 0px" title="Url Imagem" placeholder="Url Imagem"/>
                <Input margem="0px 0px 17px 0px" title="Preço"  placeholder="Preço"/>
            </LimitedContainer>

            <Select
                defaultValue="Escolha uma categoria"
                style={{ width: 220 }}
                onChange={handleChange}
                options={categories.map((category) => ({
                    value: `${category.id}`,
                    label: `${category.name}`
                }))}
            />
            
            <br/>
            <br/>

            <Button type="primary">
                Inserir produto
            </Button>
            
        </Screen>
    )
};

export default ProductInsert;
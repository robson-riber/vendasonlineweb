import Modal from "antd/es/modal";
import { useState } from "react";
import { logout } from "../../functions/connection/auth";
import { HeaderContainer, LogoExit } from "./header.style";

/*
    https://ant.design/components/icon
    https://ant.design/components/modal
*/

const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    return ( 
        <>
            <Modal title="Atenção!" open={isModalOpen} onOk={logout} onCancel={handleCancel} okText='Sair' cancelText='Cancelar' >
                <p>Tem certeza que deseja sair?</p>
            </Modal>

            <HeaderContainer>
                <LogoExit onClick={showModal}/>
            </HeaderContainer>
            
        </>
      );
};

export default Header;
import React from "react";
import "./financeiro.css";
import HeaderFinanceiro from "../components/header-financeiro";
import ContainerGeral from "../components/container-geral";
import SubcontainerGeral from "../components/subcontainer-geral";
import ImageComponent from "../components/imagem-component";
import Imagem01 from '../../assets/financeiro-imagem.png';
import Title from "../components/title";

const Financeiro = () => {
  return (
    <ContainerGeral 
      conteudo={
        <>
          <HeaderFinanceiro />
          <SubcontainerGeral
            width={'100%'}
            height={'450px'}
            alignItens={'center'}
            justifyContent={'center'}
             conteudo={
              <>
                <ImageComponent
                  src={Imagem01}
                  width={'50%'}
                  display={'flex'}
                  alignItens={'center'}
                  justifyContent={'center'}
                />
                <Title conteudo={'Selecione uma opção do menu!'} fontSize={'20px'} color={'#006b33'} fontWeight={'700'}/>
              </>
            }
          />
        </>
      } 
    />
  );
};

export default Financeiro;

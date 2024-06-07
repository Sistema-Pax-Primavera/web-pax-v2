import React from "react";
import "./relatorio.css";
import HeaderRelatorio from "../components/header-relatorio";
import ContainerGeral from "../components/container-geral";
import SubcontainerGeral from "../components/subcontainer-geral";
import ImageComponent from "../components/imagem-component";
import Imagem01 from '../../assets/svg/relatorio-2.svg';
import Title from "../components/title";

const Relatorio = () => {
    return (
        <ContainerGeral
            conteudo={
                <>
                    <HeaderRelatorio />
                    <SubcontainerGeral
                        width={'100%'}
                        height={'450px'}
                        alignItens={'center'}
                        justifyContent={'center'}
                        conteudo={
                            <>
                                <ImageComponent
                                    src={Imagem01}
                                    width={'60%'}
                                    display={'flex'}
                                    alignItens={'center'}
                                    justifyContent={'center'}
                                />
                                <Title conteudo={'Selecione uma opção do menu!'} fontSize={'20px'} color={'#006b33'} fontWeight={'700'} />
                            </>
                        }
                    />
                </>
            }
        />
    );
};

export default Relatorio;

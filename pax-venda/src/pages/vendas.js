import React, { useState, useEffect } from 'react';
import './vendas.css';
import HeaderVendas from '../components/header/index'
import Contratos from '../../assets/contratos.svg'
import idiomas from '../utils/info';
import Carregando from '../components/carregando';

const Vendas = () => {
    const [idioma, setIdioma] = useState(false);
    const [isIdioma, setIsIdioma] = useState(true);

    const verificaIdioma = () => {
        const savedUsuario = localStorage.getItem("usuario");
        if (savedUsuario) {
            const usuarioObj = JSON.parse(savedUsuario)
            setIdioma(usuarioObj.idioma === 'BR' ? false : true);
        }
        setIsIdioma(false)
    }

    useEffect(() => {
        const intervalId = setInterval(verificaIdioma, 100);

        // Certificar-se de limpar o intervalo quando o componente for desmontado
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className='container-vendas'>
            {isIdioma ? (
                <div className='dashboard-vendas'>
                    <Carregando />
                </div>
            ) : (
                <><HeaderVendas idioma={idioma} />
                    <div className='dashboard-vendas'>
                        <img src={Contratos}></img>
                        <h1>{idioma ? idiomas.es_PY.message : idiomas.pt_BR.message}</h1>
                    </div>
                </>
            )}
        </div>

    )
}

export default Vendas;
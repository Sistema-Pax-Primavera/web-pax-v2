import React, { useState, useEffect } from 'react'
import Header from '../../components/header/header';
import PaxCart from '../../../assets/pax-horizontal.jpg';
import PETCart from '../../../assets/pet-horizontal.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './carteirinhas.css';
import { useLocation } from 'react-router-dom';
import ButtonText from '../../components/button-texto';

const Carteirinha = () => {
    const location = useLocation();
    const cliente = location.state && location.state.cliente;
    const idioma = location.state && location.state.idioma;
    const [fimMes, setFimMes] = useState('');
    const [clienteNome, setClienteNome] = useState('');
    const [clienteTipo, setClienteTipo] = useState('HUMANO');

    const handleNomeChange = (event) => {
        const nomeSelecionado = event.target.value;
        const clienteSelecionado = opcoes.find(item => item.nome === nomeSelecionado);
        if (clienteSelecionado) {
            setClienteTipo(clienteSelecionado.tipo);
        } else {
            setClienteTipo('HUMANO');
        }
        setClienteNome(nomeSelecionado);
    };

    useEffect(() => {
        // Função para calcular o último dia do mês
        const calcularUltimoDiaMes = () => {
            const hoje = new Date();
            const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
            const dd = ultimoDia.getDate();
            const mm = ultimoDia.getMonth() + 1;
            const yyyy = ultimoDia.getFullYear();

            // Formatação da data no formato dd/mm/yyyy
            const dataFormatada = `${dd < 10 ? '0' + dd : dd}/${mm < 10 ? '0' + mm : mm}/${yyyy}`;
            setFimMes(dataFormatada);
        };

        calcularUltimoDiaMes();  // Chama a função ao montar o componente
    }, []);

    const handleImprimir = () => {
        // Adicione a lógica de impressão aqui
        window.print();
    };

    const opcoes = [
        {
            'tipo': 'HUMANO',
            'nome': 'Diogo',
        },
        {
            'tipo': 'PET',
            'nome': 'Doguinho'
        },
    ];


    return (
        <>
            <div className='container-associados'>
                <Header cliente={cliente} idioma={idioma} />
                <div className='carteirinha-container'>
                    <div className='icones-nome'>
                        <label><AccountCircleIcon fontSize={'small'} />{cliente ? cliente.nome : ''} Nº do Contrato - {cliente ? cliente.n_contrato : ''} </label>
                    </div>
                    <div>
                        <div className='nome-carteirinha'>
                            <label htmlFor="selectNome">Escolha o nome:</label>
                            <select id="selectNome" value={clienteNome} onChange={handleNomeChange}>
                                <option value="">Selecione uma opção</option>
                                {opcoes.map((item) => (
                                    <option key={item.tipo} value={item.nome}>
                                        {item.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="cartao">
                            <img
                                src={clienteTipo === 'PET' ? PETCart : PaxCart}
                                style={clienteTipo === 'PET' ? { width: 400, height: 250 } : {}}
                                alt='Carteirinha'
                                className='carteirinha-img'
                            />
                        </div>
                        <div className="informacoes">
                            <p className='validade'>Validade: {fimMes}</p>
                            <p className='validade'>Cliente: {clienteNome}</p>
                        </div>
                        <div className='carteirinha-imprimir'>
                            <ButtonText funcao={handleImprimir} title="IMPRIMIR"/>
                        </div>

                    </div>
                </div>
                {/* <div className='carteirinha-container'>
                    <label htmlFor="selectNome">Escolha o nome:</label>
                    <select id="selectNome" value={clienteNome} onChange={handleNomeChange}>
                        <option value="">Selecione uma opção</option>
                        <option value="Diogo Perez Areco">Diogo</option>
                        <option value="Giovane Miranda Luna">Giovane</option>
                        <option value="Mateus Pitta">Mateus</option>
                        <option value="Aderbal da Silva Pereira dos Santos Lima Junior">Aderbal</option>
                    </select>
                    {clienteNome && <p>{clienteNome}</p>}
                    <p className='validade'>Validade: {fimMes}</p>
                    <img src={PaxCart} alt='Carteirinha' className='carteirinha-img' />
                    <button onClick={handleImprimir}>Imprimir</button>
                </div> */}
            </div>

        </>
    )
}

export default Carteirinha;

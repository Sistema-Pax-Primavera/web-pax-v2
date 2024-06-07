import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importando a função toast
import 'react-toastify/dist/ReactToastify.css'; // Importando o estilo da biblioteca
import ArticleIcon from '@mui/icons-material/Article';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckboxWhite from '../../components/checkbox/index'
import './formulario-confirmacao.css'
import ButtonText from '../../../../pax-associado/src/components/button-texto/index'

const FormularioConfirmacao = ({ checkboxStatus }) => {
    const [toastMessage, setToastMessage] = useState('');

    const handleCadastrar = () => {
        const todasMarcadas = Object.values(checkboxStatus).every(status => status);

        if (todasMarcadas) {
            setToastMessage('Cadastro Realizado');
            toast.success('Cadastro realizado com sucesso!'); // Chamada correta da função success
        } else {
            const faltando = Object.entries(checkboxStatus)
                .filter(([_, status]) => !status)
                .map(([formulario]) => formulario);
            setToastMessage(`Cadastro não realizado. Faltando: ${faltando.join(', ')}`);
            toast.error('Cadastro não realizado. Verifique os formulários faltando.'); // Chamada correta da função error
        }
    };

    return (
        <div className='formulario-confirmacao'>
            <div className='posicao-formulario-contrato'>
                <div className='tipo-contrato-data'>
                    <div className='separacao-contrato'>
                        <ArticleIcon fontSize={'small'} />
                        <div className='tipo-contrato-novo'>
                            <label>Contrato Novo</label>
                            <label>Tipo</label>
                        </div>
                    </div>

                    <div className='separacao-contrato'>
                        <CalendarMonthIcon fontSize={'small'} />
                        <div className='tipo-contrato-novo'>
                            <label>22/05/2024</label>
                            <label>Data Contrato</label>
                        </div>
                    </div>
                </div>
                <div className='confirmados-contratos'>
                    <label>Confimados</label>
                </div>
                <div className='confirmados-contratos'>
                    <label><CheckboxWhite checked={checkboxStatus.dadosGerais} disabled /> Dados Gerais</label>
                </div>
                <div className='confirmados-contratos'>
                    <label><CheckboxWhite checked={checkboxStatus.dadosResidenciais} disabled /> Dados Res.</label>
                </div>
                <div className='confirmados-contratos'>
                    <label><CheckboxWhite checked={checkboxStatus.dadosComerciais} disabled /> Dados Comer</label>
                </div>
                <div className='confirmados-contratos'>
                    <label><CheckboxWhite checked={checkboxStatus.cobranca} disabled /> Cobrança</label>
                </div>
                <div className='confirmados-contratos'>
                    <label><CheckboxWhite checked={checkboxStatus.dependentes} disabled /> Dependentes</label>
                </div>
                <div className='confirmados-contratos'>
                    <label><CheckboxWhite checked={checkboxStatus.anexos} disabled /> Anexos</label>
                </div>
                <div className='confirmados-contratos'>
                    <ButtonText title="CADASTRAR" funcao={handleCadastrar}/>
                </div>
            </div>




        </div>
    )
}

export default FormularioConfirmacao

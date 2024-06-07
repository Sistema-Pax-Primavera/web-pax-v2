import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importando a função toast
import 'react-toastify/dist/ReactToastify.css'; // Importando o estilo da biblioteca
import ArticleIcon from '@mui/icons-material/Article';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ConfirmacaoContratos = ({ mostrarBotoes, mostrarBotoesConfirmacao, setMostrarBotoesConfirmacao, onOpenModal, data, tipo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    return (
        <div>
            <div className='posicao-formulario-contrato'>
                <div className='tipo-contrato-data'>
                    <div className='separacao-contrato'>
                        <ArticleIcon fontSize={'small'} />
                        <div className='tipo-contrato-novo'>
                            <label>Tipo</label>
                            <label>{tipo}</label>
                        </div>
                    </div>

                    <div className='separacao-contrato'>
                        <CalendarMonthIcon fontSize={'small'} />
                        <div className='tipo-contrato-novo'>
                            <label>Data Contrato</label>
                            <label>{data}</label>
                        </div>
                    </div>
                </div>

                <div className='status-contrato'>
                    <label>Status do Contrato</label>
                    <label>Vizualise o anexo(pdf) para liberar alteração de status!</label>
                </div>

                <div className='confirmados-contratos-contratos'>
                    {mostrarBotoes && !mostrarBotoesConfirmacao && (
                        <div className='confirmados-contratos-contratos'>
                            <button onClick={() => setMostrarBotoesConfirmacao(true)}><AddTaskIcon fontSize={'small'} /></button>
                            <button onClick={() => onOpenModal()}><HighlightOffIcon fontSize={'small'} color={'warning'} /></button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default ConfirmacaoContratos;

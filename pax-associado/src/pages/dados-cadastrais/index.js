import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Switch from '@mui/material/Switch';
import DateMaskInput from '../../components/inputs';
import './dados_cadastrais.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MyAccordion from '../../components/accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
import { useLocation } from 'react-router-dom';
import ButtonText from '../../components/button-texto/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    accordionContainer: {
        border: `1px solid rgba(0, 0, 0, 0.1)`,
        borderColor: theme.palette.grey[300],
        borderRadius: theme.shape.borderRadius,
    },
    accordion: {
        width: "100%",
        borderRadius: theme.shape.borderRadius,
        "&.Mui-expanded": {
            borderColor: "rgba(255, 0, 0, 0.5)",
        },
    },
}));


const DadosCadastrais = () => {

    const [cliente, setCliente] = useState({}); // Definindo o estado cliente
    const [nacionalidade, setNacionalidade] = useState(true);
    const classes = useStyles();
    const location = useLocation();
    const [clienteEditado, setClienteEditado] = useState({});
    const [clienteInicial, setClienteInicial] = useState({});
    const [carenciaAtivada, setCarenciaAtivada] = useState(clienteInicial.is_carencia);
    const [cremacaoAtivada, setCremacaoAtivada] = useState(clienteInicial.is_cremacao);
    const [isComercialEnabled, setIsComercialEnabled] = useState(clienteInicial.is_endereco_comercial);
    const [idioma, setIdioma] = useState(false);
    const [isIdioma, setIsIdioma] = useState(true);

    useEffect(() => {
        setCliente(clienteInicial); // Inicializando o estado cliente com os dados iniciais
    }, [clienteInicial]);

    const handleSwitchChange = () => {
        // Atualiza o estado do switch
        setCremacaoAtivada(!cremacaoAtivada);
    };

    const handleSwitchCarencia = () => {
        // Atualiza o estado do switch
        setCarenciaAtivada(!carenciaAtivada);
    };

    const handleNacionalidade = (event) => {
        setNacionalidade(JSON.parse(event.target.value));
    };

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

    useEffect(() => {
        const savedCliente = location.state && location.state.cliente;
        setCliente(savedCliente);
        setClienteInicial(savedCliente); // Definindo os dados iniciais ao montar o componente
    }, [location.state]);

    useEffect(() => {
        setCliente(clienteInicial);
        setClienteEditado(clienteInicial); // Inicialize o cliente editado com os dados iniciais
        setCarenciaAtivada(clienteInicial.is_carencia);
        setCremacaoAtivada(clienteInicial.is_cremacao);
        setIsComercialEnabled(clienteInicial.is_endereco_comercial);
    }, [clienteInicial]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setClienteEditado((prevCliente) => ({
            ...prevCliente,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setCliente(clienteEditado); // Atualize o cliente com os dados editados
        // Aqui você pode enviar os dados do cliente para salvar no servidor
        toast.success('Dados cadastrais salvo com sucesso!');
    };

    return (
        <>
            <div className='container-associados'>
                <Header cliente={cliente} idioma={idioma} />
                <div className='dados-cadastrais-associado'>

                    <MyAccordion
                        title="Dados do Titular"
                        icon={<AccountCircleIcon />}
                        expandedIcon={<ExpandMoreIcon />}
                    >
                        <div className='container-linha'>
                            <div className='campos-01'>
                                <label>Nome<span className='obrigatorio'> *</span></label>
                                <input type="text" name="nome" value={clienteEditado.nome} onChange={handleChange} />

                            </div>
                            {nacionalidade ?
                                <div className='campos-02'>
                                    <label>CPF<span className='obrigatorio'> *</span> </label>
                                    <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} />
                                </div>
                                : <></>}
                            <div className='campos-03'>
                                <label>RG<span className='obrigatorio'> *</span></label>
                                <input type="text" name="cpf" value={cliente.rg} />
                            </div>
                            <div className='campos-02'>
                                <label>Data Nascimento<span className='obrigatorio'> *</span></label>
                                <input type="text" name="dataNascimento" value={cliente.data_nascimento} />
                            </div>
                            <div className='campos-03'>
                                <label>Contrato<span className='obrigatorio'> *</span></label>
                                <input type="text" name="contrato" value={cliente.n_contrato} onChange={handleChange} />
                            </div>
                            <div className='campos-02'>
                                <label>Gênero<span className='obrigatorio'> *</span></label>
                                <select value={cliente.genero}>
                                    <option value={null}>Selecione uma opção</option>
                                    <option value={'Masculino'}>Masculino</option>
                                    <option value={'Feminino'}>Feminino</option>
                                    <option value={'Nao Binario'}>Não Binario</option>
                                    <option value={'Nao Informado'}>Não Informado</option>
                                </select>
                            </div>
                            <div className='campo-info-bairro'>
                                <label>Religião<span className='obrigatorio'> *</span></label>
                                <select value={cliente.religiao}>
                                    <option value={null}>Selecione uma opção</option>
                                    <option value={cliente.religiao}>{cliente.religiao}</option>
                                </select>
                            </div>
                            <div className='campo-info-bairro'>
                                <label>UF<span className='obrigatorio'> *</span></label>
                                <select value={cliente.uf}>
                                    <option value={null}>Selecione uma opção</option>
                                    <option value={'MS'}>Mato Grosso do Sul</option>
                                    <option value={'SP'}>São Paulo</option>
                                    <option value={'PR'}>Parana</option>
                                    <option value={'RJ'}>Rio de Janeiro</option>
                                    <option value={'MT'}>Mato Grosso</option>
                                </select>
                            </div>
                            <div className='campos-02'>
                                <label>Naturalidade<span className='obrigatorio'> *</span></label>
                                <input type="text" name="contrato" value={cliente.naturalidade} />
                            </div>
                            <div className='campos-02'>
                                <label>Nacionalidade<span className='obrigatorio'> *</span></label>
                                <select value={cliente.nacionalidade} onChange={handleNacionalidade}>
                                    <option value={'Brasileiro'}>Brasileiro(a)</option>
                                    <option value={'Estrangueiro'}>Estrangueiro(a)</option>
                                </select>
                            </div>
                            <div className='campos-02'>
                                <label>Profissão<span className='obrigatorio'> *</span></label>
                                <select value={cliente.profissao}>
                                    <option value={null}>Selecione uma opção</option>
                                    <option value={cliente.profissao}>{cliente.profissao}</option>
                                </select>
                            </div>
                            <div className='campos-02'>
                                <label>Estado Civil<span className='obrigatorio'> *</span></label>
                                <select value={cliente.estado_civil}>
                                    <option value={null}>Selecione uma opção</option>
                                    <option value={cliente.estado_civil}>{cliente.estado_civil}</option>
                                </select>
                            </div>
                            <div className='campos-02'>
                                <label>Data do Contrato<span className='obrigatorio'> *</span></label>
                                <input type="text" name="dataContrato" value={cliente.data_contrato} />

                            </div>
                        </div>
                        <div className='container-linha'>
                            <div className='campos-02'>
                                <label>Carência Padrão ?</label>
                                <Switch
                                    checked={carenciaAtivada}
                                    onChange={handleSwitchCarencia}
                                    size="small" />
                            </div>
                            {!carenciaAtivada && (
                                <>
                                    <div className='data-inicio-carencia'>
                                        <label>Data Inicio Carência</label>
                                        <input type="text" name="dataInicioCarencia" value={cliente.data_inicio_carencia} />
                                    </div>
                                    <div className='data-fim-carencia'>
                                        <label>Data Final Carência</label>
                                        <input type="text" name="dataFimCarencia" value={cliente.data_final_carencia} />
                                    </div>
                                </>
                            )}
                            <div className='campo-info-bairro'>
                                <label>Cremação ?</label>
                                <Switch
                                    checked={cremacaoAtivada}
                                    onChange={handleSwitchChange}
                                    size="small" />
                            </div>
                            {cremacaoAtivada && (
                                <div className='campos-02'>
                                    <label>Data da Cremação</label>
                                    <DateMaskInput data={cliente.data_cremacao} />
                                </div>
                            )}
                        </div>
                    </MyAccordion>
                    <MyAccordion
                        title="Dados Residenciais"
                        icon={<HomeIcon />}
                        expandedIcon={<ExpandMoreIcon />}
                    >
                        <div className='container-linha'>
                            <div className='campos-03'>
                                <label>CEP<span className='obrigatorio'> *</span></label>
                                <input type="text" name="cep" value={cliente.cep_residencial} />
                            </div>
                            <div className='campo-info-bairro'>
                                <label>UF<span className='obrigatorio'> *</span></label>
                                <select value={cliente.uf_residencial}>
                                    <option value={null}>Selecione uma opção</option>
                                    <option value={'MS'}>Mato Grosso do Sul</option>
                                    <option value={'SP'}>São Paulo</option>
                                    <option value={'RJ'}>Rio de Janeiro</option>
                                    <option value={'MT'}>Mato Grosso</option>
                                </select>
                            </div>
                            <div className='campos-02'>
                                <label>Município<span className='obrigatorio'> *</span></label>
                                <input type="text" name="municipio" value={cliente.municipio_residencial} />
                            </div>

                            <div className='campos-02'>
                                <label>Bairro<span className='obrigatorio'> *</span></label>
                                <input type="text" name="bairro" value={cliente.bairro_residencial} />
                            </div>
                            <div className='campo-info-bairro'>
                                <label>Quadra<span className='obrigatorio'> *</span></label>
                                <input type="text" name="quadra" value={cliente.quadra_residencial} />
                            </div>
                            <div className='campo-info-bairro'>
                                <label>Lote<span className='obrigatorio'> *</span></label>
                                <input type="text" name="lote" value={cliente.lote_residencial} />
                            </div>
                            <div className='campo-info-bairro'>
                                <label>Nº<span className='obrigatorio'> *</span></label>
                                <input type="text" name="nResidencia" value={cliente.numero_residencial} />
                            </div>
                            <div className='campos-02'>
                                <label>Tipo<span className='obrigatorio'> *</span></label>
                                <select value={cliente.tipo_endereco_residencial}>
                                    <option value={null}>Selecione uma opção</option>
                                    <option value={cliente.tipo_endereco_residencial}>{cliente.tipo_endereco_residencial}</option>
                                </select>
                            </div>
                        </div>
                        <div className='container-linha'>
                            <div className='campos-01'>
                                <label>Rua<span className='obrigatorio'> *</span></label>
                                <input type="text" name="rua" value={cliente.rua_residencial} />
                            </div>
                            <div className='campos-02'>
                                <label>Complemento<span className='obrigatorio'> *</span></label>
                                <input type="text" name="complemento" value={cliente.complemento_residencial} />
                            </div>
                            <div className='campos-01'>
                                <label>Endereço Comercial</label>
                                <Switch
                                    size="small"
                                    checked={isComercialEnabled}
                                    onChange={() => setIsComercialEnabled(!isComercialEnabled)}
                                />
                            </div>
                        </div>
                    </MyAccordion>
                    <div className='acordion-dados-comerciais'>
                        <Accordion className={isComercialEnabled ? '' : 'Mui-disabled'}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <div className='icones-nome'>
                                    <label> <ApartmentIcon />Dados Comerciais</label>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='layout-linha'>
                                    <div className='container-linha'>
                                        <div className='campos-03'>
                                            <label>CEP<span className='obrigatorio'> *</span></label>
                                            <input type="text" name="cepComercial" value={cliente.cep_comercial} />
                                        </div>
                                        <div className='campo-info-bairro'>
                                            <label>UF<span className='obrigatorio'> *</span></label>
                                            <select value={cliente.uf_comercial}>
                                                <option value={null}>Selecione uma opção</option>
                                                <option value={'MS'}>Mato Grosso do Sul</option>
                                                <option value={'SP'}>São Paulo</option>
                                                <option value={'RJ'}>Rio de Janeiro</option>
                                                <option value={'MT'}>Mato Grosso</option>
                                            </select>
                                        </div>
                                        <div className='campos-02'>
                                            <label>Município<span className='obrigatorio'> *</span></label>
                                            <input type="text" name="municipioComercial" value={cliente.municipio_comercial} />
                                        </div>
                                        <div className='campos-02'>
                                            <label>Bairro<span className='obrigatorio'> *</span></label>
                                            <input type="text" name="bairroComercial" value={cliente.bairro_comercial} />
                                        </div>
                                        <div className='campos-04'>
                                            <label>Quadra<span className='obrigatorio'> *</span></label>
                                            <input type="text" name="quadraComercial" value={cliente.quadra_comercial} />
                                        </div>
                                        <div className='campo-info-bairro'>
                                            <label>Lote</label>
                                            <input type="text" name="loteComercial" value={cliente.lote_comercial} />
                                        </div>
                                        <div className='campo-info-bairro'>
                                            <label>Nº<span className='obrigatorio'> *</span></label>
                                            <input type="text" name="numeroComercial" value={cliente.numero_comercial} />
                                        </div>
                                        <div className='campo-info-bairro'>
                                            <label>Tipo<span className='obrigatorio'> *</span></label>
                                            <select value={cliente.tipo_endereco_comercial}>
                                                <option value={null}>Selecione uma opção</option>
                                                <option value={cliente.tipo_endereco_comercial}>{cliente.tipo_endereco_comercial}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='container-linha'>
                                        <div className='campos-01'>
                                            <label>Rua<span className='obrigatorio'> *</span></label>
                                            <input type="text" name="ruaComercial" value={cliente.rua_comercial} />
                                        </div>
                                        <div className='campos-02'>
                                            <label>Complemento<span className='obrigatorio'> *</span></label>
                                            <input type="text" name="complementoComercial" value={cliente.complemento_comercial} />
                                        </div>

                                    </div>
                                </div>

                            </AccordionDetails>
                        </Accordion>
                    </div>

                    <div className='salvar-associado'>
                        <ButtonText
                            title="SALVAR"
                            funcao={handleSave}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default DadosCadastrais;

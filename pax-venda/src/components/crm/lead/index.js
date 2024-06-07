import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";
import "./modal-clientes.css";
import ButtonText from "../../../../../pax-associado/src/components/button-texto";
import ButtonIconFundo from "../../../../../pax-associado/src/components/button-icon-sem-fundo/index";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonIconRed from "../../../../../pax-associado/src/components/button-icon-red";
import "react-calendar/dist/Calendar.css";
import { formatarTelefone } from "../../../utils/fuctions";
import { toast } from "react-toastify";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CardTarefaComponent from "./card-tarefa";
import CardAnexoComponent from "./card-anexo";
import ListaAtividade from "./list-atividade";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Schedule, AttachFile, TransferWithinAStation, Label } from '@mui/icons-material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ButtonIconTextoStart from "../../button-icon-texto-start";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 600,
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: 3,
  overflowX: "hidden",
  border: "none",
  boxShadow: 24,
};


const Lead = ({ open, onClose, clienteData, coluna }) => {
  const { nome, observacao } = clienteData;
  const contatos = clienteData.contatos;
  const tarefas = clienteData.tarefas;
  const atividades = clienteData.atividades;
  const anexos = clienteData.anexos;
  const [isAtendimento, setIsAtendimento] = useState(false);
  const [contador, setContador] = useState({
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  const [contadorAtivo, setContadorAtivo] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubCategoria] = useState("");
  const [comentario, setComentario] = useState("");
  const [atividade, setAtividade] = useState([]);
  const [isAtendeu, setIsAtendeu] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose2 = () => {
    setOpenModal(false);
  };
  const handleCheckboxChange = () => {
    setIsAtendeu(!isAtendeu);
    console.log("isAtendeu mudou para:", !isAtendeu);
  };


  const adicionarComentario = () => {
    if (comentario.trim() !== "") {
      const novoHistorico = [
        ...atividade,
        { atividade, comentario, dataHora: new Date().toLocaleString() },
      ];
      setHistorico(novoHistorico);
      setComentario("");
    }
  };

  const handleClose = () => {
    if (isAtendimento) {
      toast.error("Finalize o atendimento antes de fechar a janela!");
    } else {
      onClose();
    }
  };

  const handleAtender = () => {
    if (contadorAtivo) {
      setContadorAtivo(false);
      setIsAtendimento(false);
    } else {
      setContadorAtivo(true);
      setIsAtendimento(true);
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const mostrarMensagem = () => {
    toast.warning("Inicie o atendimento para liberar essa informação!");
  };

  useEffect(() => {
    let intervalId;

    if (contadorAtivo) {
      intervalId = setInterval(() => {
        setContador((prevContador) => {
          let segundos = prevContador.segundos + 1;
          let minutos = prevContador.minutos;
          let horas = prevContador.horas;

          if (segundos === 60) {
            segundos = 0;
            minutos++;
          }
          if (minutos === 60) {
            minutos = 0;
            horas++;
          }

          return { horas, minutos, segundos };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [contadorAtivo]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>
          <div className="sidebar-cobranca">
            <div className="cliente-cobran-nome">
              <div className="close-modal-cobran">
                <ButtonIconRed
                  funcao={handleClose}
                  icon={<HighlightOffIcon />}
                />
              </div>
              <div className="nomes-cobranca">
                <label>
                  {nome}
                </label>
                <p>{coluna}</p>
              </div>
            </div>
            {contadorAtivo ?
              <div className="contador-vendas-crm">
                <p>{`${formatTime(contador.horas)}:${formatTime(
                  contador.minutos
                )}:${formatTime(contador.segundos)}`}</p>
              </div> : <></>
            }
            <div className="atender-clientes-vendas-crm">
              <ButtonText
                title={contadorAtivo ? "ENCERRAR" : "ATENDER CLIENTE"}
                funcao={() => handleAtender()}
              />
            </div>

            <div className="like-deslike-atendimento">
              <div className="oportunidade-ganha">
                <ThumbUpIcon fontSize="medium" />
              </div>
              <div className="oportunidade-perdida">
                <ThumbDownIcon fontSize="medium" />
              </div>
            </div>
          </div>
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} sx={{ paddingRight: 0 }}>
            <Typography sx={{ mt: 2 }}>
              <div className="container-modal-vendas-crm">
                <label>Dados Básico</label>
                <div className="dados-basico-vendas2">
                  <div className="infor-modal-vendas-crm">
                    <div className="origin-lead-cobran">
                      <ButtonIconFundo
                        icon={
                          <PersonOutlineOutlinedIcon fontSize={"small"} />
                        }
                      />
                      <div className="lead-origin-cobran">
                        <label>Origem desta lead</label>
                        <label>"Mobile"</label>
                      </div>
                    </div>
                    <div className="origin-lead-cobran">
                      <ButtonIconFundo
                        icon={<GroupOutlinedIcon fontSize={"small"} />}
                      />
                      <div className="lead-origin-cobran">
                        <label>Unidade/Região</label>
                        <label>{clienteData.regiao}</label>
                      </div>
                    </div>
                    <div className="origin-lead-cobran">
                      <ButtonIconFundo
                        icon={
                          <PsychologyAltOutlinedIcon fontSize={"small"} />
                        }
                      />
                      <div className="lead-origin-cobran">
                        <label>Cidade/UF</label>
                        <label>{clienteData.cidade}/{clienteData.uf}</label>
                      </div>
                    </div>
                  </div>
                  <div className="infor-modal-vendas-crm">
                    <div className="origin-lead-cobran">
                      <ButtonIconFundo
                        icon={
                          <CalendarMonthOutlinedIcon fontSize={"small"} />
                        }
                      />
                      <div className="lead-origin-cobran">
                        <label>Indicador por</label>
                        <label>{clienteData.indicado_por}</label>
                      </div>
                    </div>
                    <div className="origin-lead-cobran">
                      <ButtonIconFundo
                        icon={
                          <CalendarMonthOutlinedIcon fontSize={"small"} />
                        }
                      />
                      <div className="lead-origin-cobran">
                        <label>Responsável Atual</label>
                        <label>{clienteData.vendedor_responsavel}</label>
                      </div>
                    </div>
                    <div className="origin-lead-cobran">
                      <ButtonIconFundo
                        icon={
                          <CalendarMonthOutlinedIcon fontSize={"small"} />
                        }
                      />
                      <div className="lead-origin-cobran">
                        <label>Possui plano</label>
                        <label>{clienteData.is_plano == true ? 'Sim' : 'Não'}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-modal-vendas-crm">
                <label>Dados para contato</label>
                <div className="dados-basico-vendas2">
                  <div className="infor-modal-vendas-crm">
                    {contatos.map((item) => (
                      <div key={item.id} className="origin-lead-cobran">
                        <ButtonIconFundo
                          icon={<AddIcCallOutlinedIcon fontSize={"small"} />}
                        />
                        <div className="lead-origin-cobran">
                          <label>{item.tipo}</label>
                          <label>
                            {item.tipo === "Telefone"
                              ? formatarTelefone(item.valor)
                              : item.valor}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="container-modal-vendas-crm">
                <label>Agenda de tarefas</label>
                <div className="dados-basico-vendas2">
                  <div className="infor-modal-vendas-crm">
                    <CardTarefaComponent data={tarefas} />
                  </div>
                </div>
              </div>
              <div className="container-modal-vendas-crm">
                <label>Anexos</label>
                <div className="dados-basico-vendas2">
                  <div className="infor-modal-vendas-crm">
                    <CardAnexoComponent data={anexos} />
                  </div>
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography sx={{ mt: 2 }}>
              <div className="botoes-modal-vendas-crm">
                <label>Ações</label>
                <div className="botao-vendas-crm">
                  <ButtonIconTextoStart
                    title="Agendar"
                    icon={<Schedule fontSize="small" />}
                    funcao={() => handleAtender()}
                    corFundoBotao="#006b33"
                    corTextoBotao="white"
                    fontSizeBotao={12}
                    alinhamentoBotao="center"
                  />
                </div>
                <div className="botao-vendas-crm">
                  <ButtonIconTextoStart
                    title="Anexar"
                    icon={<AttachFile fontSize="small" />}
                    funcao={() => handleAtender()}
                    corFundoBotao="#006b33"
                    corTextoBotao="white"
                    fontSizeBotao={12}
                    alinhamentoBotao="center"
                  />
                </div>
                <div className="botao-vendas-crm">
                  <ButtonIconTextoStart
                    title="Transferir"
                    icon={<SyncAltIcon fontSize="small" />}
                    funcao={() => handleAtender()}
                    corFundoBotao="#006b33"
                    corTextoBotao="white"
                    fontSizeBotao={12}
                    alinhamentoBotao="center"
                  />
                </div>
                <div className="botao-vendas-crm">
                  <ButtonIconTextoStart
                    title="Etiquetas"
                    icon={<Label fontSize="small" />}
                    funcao={() => handleAtender()}
                    corFundoBotao="#006b33"
                    corTextoBotao="white"
                    fontSizeBotao={12}
                    alinhamentoBotao="center"
                  />
                </div>
              </div>
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ paddingLeft: 0, paddingRight: 0 }} >
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              <div className="dados-basico-cobran">
                <div className="infor-modal-vendas-crm">
                  <div className="obs-vendas-dados">
                    <div className="obs-vendas-lead">
                      <label>Observações desta lead</label>
                      <textarea
                        value={observacao}
                        disabled={true}
                      />
                    </div>
                    <div className="atividade-vendas-crm">
                      <label>Atividade</label>
                      <div className="campos-atividade-vendas-crm">
                        <div className="select-text-area-vendas">
                          <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                          >
                            <option value={null}>
                              Selecione titulo da atividade
                            </option>
                            <option value={1}>Tentativa de Contato</option>
                            <option value={2}>Em contato (Negociação)</option>
                            <option value={3}>Retorno de Contato</option>
                          </select>
                          <textarea
                            placeholder="Descreva aqui a atividade..."
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                          />
                          <ListaAtividade data={atividades} />
                          {isAtendimento ? (
                            <>
                              <div className="add-comentario-cobran">
                                <ButtonText
                                  title={"GRAVAR"}
                                  funcao={adicionarComentario}
                                />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
          </Grid>
        </Grid>
        <Modal
          open={openModal}
          onClose={handleClose2}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500, height: 350 }}>
            <div className="historicof9">
              <div className="historicof9-close">
                <h1>
                  <ScheduleOutlinedIcon fontSize={"small"} />
                  Historico F9
                </h1>
                <button onClick={handleClose}>
                  <HighlightOffIcon />
                </button>
              </div>
              <p>Informações</p>
              <div className="historicof9-campos">
                <div className="campos-tiposf9">
                  <label>Data</label>
                  <p>22/03/2024</p>
                </div>
                <div className="campos-tiposf92">
                  <label>Titulo</label>
                  <p>F9 Teste</p>
                </div>
                <div className="campos-tiposf9">
                  <label>Categoria</label>
                  <p>Negociação</p>
                </div>
              </div>
              <div className="historicof9-campos">
                <div className="campos-tiposf9">
                  <label>Subcategoria</label>
                  <p>22/03/2024</p>
                </div>
                <div className="campos-tiposf92">
                  <label>Usuário</label>
                  <p>F9 Teste</p>
                </div>
              </div>
              <div className="historicof9-campos">
                <div className="campos-tiposf923">
                  <label>Descrição</label>
                  <a></a>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </Box>

    </Modal>

  );
};

export default Lead;

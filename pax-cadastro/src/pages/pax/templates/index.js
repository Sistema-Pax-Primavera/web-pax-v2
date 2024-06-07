import React, { useState, useEffect, useRef } from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import html2pdf from 'html2pdf.js';
import "./templates.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonIconTextoStart from "../../../components/button-icon-texto-start";
import HeaderPax from "../../../components/header-pax";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModalEdicao from "../../../components/modal-edicao";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function createData(name) {
  return { name };
}

const funcaoData = [
  createData("Template 01"),
  createData("Template 02"),
  createData("Template 03"),
];

const Templates = () => {
  const [code, setCode] = useState('');
  const [funcaoEstado, setFuncaoEstado] = useState(funcaoData);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);
  const [modalCadastroOpen, setModalCadastro] = useState(false);
  const [showTable, setShowTable] = useState(true); // Estado para controlar a exibição da tabela
  const [showHeader, setShowHeader] = useState(true);
  const [preview, setPreview] = useState("");
  const previewRef = useRef(null);

  const saveAsPdf = () => {
    const options = {
      margin: 18, // Margem em milímetros
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'], before: '.page-break' } // Define onde ocorrerão as quebras de página
    };

    html2pdf().from(code).set(options).save();
  };


  const handleStatusChange = (index) => {
    const updatedFuncao = funcaoEstado.map((funcao, i) => {
      if (i === index) {
        return {
          ...funcao,
          status: funcao.status === "Ativo" ? "Inativo" : "Ativo",
        };
      }
      return funcao;
    });
    setFuncaoEstado(updatedFuncao);
  };

  const handleOpenModalEdicao = () => {
    setModalEdicaoOpen(true);
  };

  const handleCloseModalEdicao = () => {
    setModalEdicaoOpen(false);
  };

  const abrirModalCadastro = () => {
    setModalCadastro(true);
    setShowTable(false); // Esconder a tabela ao abrir o modal de cadastro
    setShowHeader(false); // Esconder o header ao abrir o modal de cadastro
  };

  const handleChange = (value) => {
    setHtmlCode(value); // Atualize o estado com o código HTML digitado
  };

  const handleVoltar = () => {
    setShowTable(true); // Mostrar a tabela ao clicar em "Voltar"
    setShowHeader(true); // Mostrar o header ao clicar em "Voltar"
  };

  const handleSalvarPDF = () => {
    handlePrintPDF(htmlCode); // Pass htmlCode as an argument to handlePrintPDF
  };

  return (
    <div className="container-cadastro">
      {showHeader && <HeaderPax />}{" "}
      {/* Mostrar o header apenas quando showHeader for true */}
      <div className="sub-container-template">
        {showTable ? ( // Verifica se a tabela deve ser exibida
          <div className="pesquisa-tabelas-cadastro">
            <div className="input-pesquisa-cadastro3">
              <input placeholder="Informe o nome"></input>
            </div>
            <div className="tamanho-botao-pesquisa">
              <ButtonIconTextoStart
                title={"PESQUISAR"}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
                fontWeightBotao={700}
                fontSizeBotao={"10px"}
              />
            </div>
            <div className="tamanho-botao-pesquisa">
              <ButtonIconTextoStart
                title={"Cadastrar"}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
                fontWeightBotao={700}
                fontSizeBotao={"10px"}
                funcao={() => abrirModalCadastro()}
              />
            </div>
          </div>
        ) : (
          // Se o editor de template HTML estiver sendo exibido, exibe o botão "Voltar"
          <div className="button-voltar-template">
            <button onClick={handleVoltar}>
              <ArrowBackIosNewIcon fontSize={"small"} />
            </button>
          </div>
        )}
        {showTable ? ( // Verifica se a tabela deve ser exibida
          <div className="tabelas-cadastro-usuarios">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sub Categoria</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {funcaoEstado.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        <div className="div-edit-cadastro-parentesco">
                          <div className="edit-cadastro-parentesco">
                            <button onClick={() => abrirModalCadastro()}>
                              <ModeEditOutlineIcon fontSize={"small"} />
                            </button>
                          </div>
                          <div className="edit-gren-red">
                            <div
                              onClick={() => handleStatusChange(index)}
                              className={
                                row.status === "Ativo"
                                  ? "green-background"
                                  : "red-background"
                              }
                            >
                              {row.status === "Ativo" ? (
                                <CheckCircleOutlineIcon /> // Cor branca para visibilidade
                              ) : (
                                <HighlightOffIcon />
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          // Exibe o editor de template HTML quando a tabela não deve ser exibida

          <div className="editor-template">
           <AceEditor
          mode="html"
          theme="github"
          value={code}
          onChange={setCode}
          style={{width: "600px"}}
          editorProps={{ $blockScrolling: true }}
        />
            <div id="html-content" className="html-content">
              <div className="previa-contrato-pdf">
                <label>Prévia do Contrato</label>
                <button onClick={saveAsPdf}>SALVAR</button>
              </div>

              <div
                className="html-content2" dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;

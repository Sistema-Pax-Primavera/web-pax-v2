import React, { useState } from "react";
import "./acordion-avisos.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonIconTextoStart from "../button-icon-texto-start";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";

const AcordionAvisos = () => {
  const [additionalFields, setAdditionalFields] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [reasons, setReasons] = useState(
    Array(additionalFields.length).fill("")
  );

  const handleAddAdditionalField = () => {
    if (inputValue.trim() !== "") {
      setAdditionalFields([...additionalFields, inputValue]);
      setReasons([...reasons, ""]); // Inicializa com uma string vazia para cada nova opção
      setInputValue(""); // Limpa o valor do campo de entrada após adicionar
    }
  };

  const handleDeleteAdditionalField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);

    const updatedReasons = [...reasons];
    updatedReasons.splice(index, 1);
    setReasons(updatedReasons);

    // Se o campo excluído for o campo selecionado, remova a seleção
    if (selectedFieldIndex === index) {
      setSelectedFieldIndex(null);
      setIsTextareaVisible(false);
    }
  };

  const handleAddReason = (index) => {
    const updatedReasons = [...reasons];
    updatedReasons[index] = inputValue;
    setReasons(updatedReasons);
    setInputValue(""); // Limpa o valor do campo de entrada após adicionar o motivo
    setIsTextareaVisible(false); // Oculta o input após adicionar o motivo
  };

  return (
    <div className="contianer-acordion-perguntas">
      <Accordion style={{ backgroundColor: "#E6E6E6" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="perguntas-label">
            <label>
              <ErrorIcon fontSize={"small"} />
              Avisos
            </label>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="conte-perguntas-cliente">
            <div className="linhas-contratos-pendentes">
              <label>Campos Incorretos</label>
              <div className="linhas-contratos-pendentes2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="campos-botao-contrato-pendente">
                  <ButtonIconTextoStart
                    corFundoBotao={"#006b33"}
                    corTextoBotao={"#ffff"}
                    icon={<AddCircleOutlineIcon fontSize={"small"} />}
                    funcao={handleAddAdditionalField}
                  />
                </div>
              </div>
              <div className="opcoes-adicionaddas-contratos">
                {additionalFields.map((field, index) => (
                  <div className="additional-field" key={index}>
                    <div className="close-option-contrato">
                      <div className="linha-contrato-botao">
                        <label>{field}</label>
                        <div className="confirma-aviso-contrato">
                        <button
  variant="contained"
  color="primary"
  onClick={() => {
    setSelectedFieldIndex(index);
    setIsTextareaVisible(!isTextareaVisible); // Alterna o estado de visibilidade do input
    if (!isTextareaVisible) {
      const updatedReasons = [...reasons];
      updatedReasons[index] = inputValue;
      setReasons(updatedReasons);
    }
  }}
>
  {isTextareaVisible && selectedFieldIndex === index ? (
    <CheckCircleOutlineIcon />
  ) : (
    <PostAddIcon fontSize={"small"} />
  )}
</button>


                        </div>
                        <div className="confirma-aviso-contrato2">
                          <button
                            onClick={() => handleDeleteAdditionalField(index)}
                          ><HighlightOffIcon fontSize={'small'}/></button>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={reasons[index]}
                      onChange={(e) => {
                        const updatedReasons = [...reasons];
                        updatedReasons[index] = e.target.value;
                        setReasons(updatedReasons);
                      }}
                      style={{
                        display:
                          selectedFieldIndex === index && isTextareaVisible
                            ? "block"
                            : "none",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AcordionAvisos;

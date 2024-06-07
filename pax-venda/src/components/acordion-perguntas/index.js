import React, { useState } from "react";
import "./acordion-perguntas.css";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };
import HelpIcon from "@mui/icons-material/Help";
import ButtonIconTextoStart from "../button-icon-texto-start";

const AcordionPerguntas = () => {
  const [activeSection, setActiveSection] = useState("Usuário");

  const handleSectionChange = (section) => {
    setActiveSection(section);
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
              <HelpIcon fontSize={"small"} />
              Perguntas
            </label>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="conte-perguntas-cliente">
            <div className="navegacao-pergunta-venda">
              <button
                className={activeSection === "Usuário" ? "active" : ""}
                onClick={() => handleSectionChange("Usuário")}
                style={{
                  backgroundColor: activeSection === "Usuário" ? "#ffffff" : "",
                  color: activeSection === "Usuário" ? "#006b33" : "",
                }}
              >
                USUÁRIO
              </button>
              <button
                className={activeSection === "Cliente" ? "active" : ""}
                onClick={() => handleSectionChange("Cliente")}
                style={{
                  backgroundColor: activeSection === "Cliente" ? "#ffffff" : "",
                  color: activeSection === "Cliente" ? "#006b33" : "",
                }}
              >
                CLIENTE
              </button>
            </div>
            
            <div className="tipos-perguntas-acordion">
            {activeSection === "Usuário" && (
              <div className="campos-duvidas-pos">
                <div className="aling-perguntas-acord">
                  <div className="campos-duvidas-pos2">
                    <div className="campos-01-pos">
                      <label>Houve contato com cliente?</label>
                      <div>
                        <label>Sim</label>
                        <label>
                          <Switch {...label} />
                        </label>
                        <label>Não</label>
                      </div>
                    </div>
                    <div className="campos-01-pos">
                      <label>Forma de Contato</label>
                      <select></select>
                    </div>
                    <div className="campos-01-pos">
                      <label>Contato</label>
                      <select></select>
                    </div>
                  </div>
                  <div className="campos-duvidas-pos2">
                    <div className="campos-01-pos">
                      <label>Foi corrigido alguma informação?</label>
                      <div>
                        <label>Sim</label>
                        <label>
                          <Switch {...label} />
                        </label>
                        <label>Não</label>
                      </div>
                    </div>
                    <div className="campos-01-pos">
                      <label>Se sim quais foram?</label>
                      <textarea></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "Cliente" && (
              <div className="campos-duvidas-pos">
                <div className="aling-perguntas-acord">
                  <div className="campos-duvidas-pos2">
                    <div className="campos-01-pos">
                      <label>Recomendaria a Pax Primavera</label>
                      <div>
                        <label>Sim</label>
                        <label>
                          <Switch {...label} />
                        </label>
                        <label>Não</label>
                      </div>
                    </div>
                    <div className="campos-01-pos">
                      <label>Avalie a venda do plano de 1 a 5</label>
                      <input></input>
                    </div>
                    <div className="campos-01-pos">
                      <label>Motivo do interesse no plano Pax?</label>
                      <input></input>
                    </div>
                  </div>
                  <div className="campos-duvidas-pos2">
                    <div className="campos-01-pos">
                      <label>Cliente informou outro contato</label>
                      <div>
                        <label>Sim</label>
                        <label>
                          <Switch {...label} />
                        </label>
                        <label>Não</label>
                      </div>
                    </div>
                    <div className="campos-01-pos">
                      <label>Se sims qual contato?</label>
                      <input></input>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
            <div className="conte-perguntas-cliente">
              <label>Comentário do Usuário</label>
              <textarea />
            </div>
            <div className="salva-result-acordion">
              <ButtonIconTextoStart
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
                fontWeightBotao={800}
                title={"SALVAR"}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AcordionPerguntas;

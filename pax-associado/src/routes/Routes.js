import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Associado from "../pages/associado";
import DadosCadastrais from "../pages/dados-cadastrais";
import Dependentes from "../pages/dependentes";
import DadosCobranca from "../pages/dados-cobranca";
import Contato from "../pages/contato";
import Contrato from "../pages/contratos";
import Carteirinha from "../pages/carteirinhas";
import Observacao from "../pages/observacao";
import HistoricoFuneraria from "../pages/historico-funerario";
import HistoricoPET from "../pages/historico-pet";
import HistoricoClinica from "../pages/historico-clinica";
import InativarContrato from "../pages/inativar-contrato";
import PDR from "../pages/pdr";
import Recebimento from "../pages/recebimento";
import RegistrarObito from "../pages/registrar-obito";
import CancelarContrato from "../pages/cancelar";
import Quitar from "../pages/quitar";
import Negociar from "../pages/negociar";
import Extrato from "../pages/extrato";
import Atendimento from "../pages/atendimento";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/associado">
        <Routes>
            <Route exact path="pax-primavera/associado" element={<Associado />} />
            <Route exact path="/" element={<Associado />} />
            <Route exact path="/dados-cadastrais" element={<DadosCadastrais />} />
            <Route exact path="/dados-cobranca" element={<DadosCobranca />} />
            <Route exact path="/dependentes" element={<Dependentes />} />
            <Route exact path="/pdr" element={<PDR />} />
            <Route exact path="/recebimento" element={<Recebimento />} />
            <Route exact path="/atendimento" element={<Atendimento />} />
            <Route exact path="/inativar-contrato" element={<InativarContrato />} />
            <Route exact path="/cancelar-contrato" element={<CancelarContrato />} />
            <Route exact path="/registrar-obito" element={<RegistrarObito />} />
            <Route exact path="/quitar" element={<Quitar />} />
            <Route exact path="/extrato" element={<Extrato />} />
            <Route exact path="/contato" element={<Contato />} />
            <Route exact path="/negociar" element={<Negociar />} />
            <Route exact path="/contrato" element={<Contrato />} />
            <Route exact path="/carteirinha" element={<Carteirinha />} />
            <Route exact path="/observacao" element={<Observacao />} />
            <Route exact path="/historico-funeraria" element={<HistoricoFuneraria />} />
            <Route exact path="/historico-pet" element={<HistoricoPET />} />
            <Route exact path="/historico-clinica" element={<HistoricoClinica />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
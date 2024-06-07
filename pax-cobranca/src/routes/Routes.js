import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cobranca from "../pages/cobranca";
import EscritorioCobranca from "../pages/escritorio-cobranca";
import Envios from '../pages/envios/index'
import MovimentacaoDiaria from "../pages/moventacao-diaria";
import SolicitacoesCobradores from "../pages/solicitacoes-cobradores";
import Rotas from "../pages/rotas";
import Gerencial from "../pages/gerencial";
import Boleto from "../pages/boleto";
import Cobrador from "../pages/cobrador";
import AgendamentosCobradores from "../pages/agendamento-cobradores";
import Telemarketing from "../pages/telemarketing";
import ScriptCobs from "../pages/mensagens-cobrador";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/cobranca">
        <Routes>
            <Route exact path="/" element={<Cobranca />} />
            <Route exact path="/escritorio" element={<EscritorioCobranca />} />
            <Route exact path="/boleto" element={<Boleto />} />
            <Route exact path="/cobrador" element={<Cobrador />} />
            <Route exact path="/envios" element={<Envios />} />
            <Route exact path="/movimentacao-diaria" element={<MovimentacaoDiaria />} />
            <Route exact path="/solicitacoes-cobradores" element={<SolicitacoesCobradores />} />
            <Route exact path="/rotas" element={<Rotas />} />
            <Route exact path="/gerencial" element={<Gerencial />} />
            <Route exact path="/agendamento-cobradores" element={<AgendamentosCobradores />} />
            <Route exact path="/maps" element={<Telemarketing />} />
            <Route exact path="/script" element={<ScriptCobs />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
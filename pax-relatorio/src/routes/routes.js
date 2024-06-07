import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Relatorio from "../pages/relatorio";
import Cobranca from "../pages/cobranca";
import Vendas from "../pages/vendas";
import Ranking from "../pages/ranking";
import Cancelamento from "../pages/cancelamento";
import Obito from "../pages/obito";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/relatorios">
        <Routes>
            <Route exact path="/" element={<Relatorio />} />
            <Route exact path="/cobranca" element={<Cobranca />} />
            <Route exact path="/vendas" element={<Vendas />} />
            <Route exact path="/cancelamentos" element={<Cancelamento />} />
            <Route exact path="/ranking" element={<Ranking />} />
            <Route exact path="/obito" element={<Obito />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
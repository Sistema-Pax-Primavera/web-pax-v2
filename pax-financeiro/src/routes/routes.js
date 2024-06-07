import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Financeiro from "../pages/financeiro";
import Movimentacoes from "../pages/movimentacoes";
import Baixas from "../pages/baixas";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/financeiro">
        <Routes>
            <Route exact path="*" element={<Financeiro />} />
            <Route exact path="/movimentacoes" element={<Movimentacoes />} />
            <Route exact path="/baixas" element={<Baixas />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Suporte from "../pages/suporte";
import AlterarCaixa from "../pages/alterar-caixa";
import AlterarFormaPagamento from "../pages/alterar-forma-pagamento";
import BaixaFilial from "../pages/baixa-filial";
import Cheques from "../pages/cheques";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/suporte">
        <Routes>
        <Route exact path="/" element={<Suporte />} />
        <Route exact path="/alterar-caixa" element={<AlterarCaixa />} />
        <Route exact path="/alterar-forma-pagamento" element={<AlterarFormaPagamento />} />
        <Route exact path="/baixa-filial" element={<BaixaFilial />} />
        <Route exact path="/cheques" element={<Cheques />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
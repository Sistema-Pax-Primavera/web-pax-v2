import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Avulso from "../pages/avulso";
import Balao from "../pages/balao";
import Lote from "../pages/lote";
import BuscaBoletos from "../pages/busca-boletos";
import Boletos from "../pages/boletos";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/boletos">
        <Routes>
            <Route exact path="*" element={<Boletos />} />
            <Route exact path="/avulso" element={<Avulso />} />
            <Route exact path="/balao" element={<Balao />} />
            <Route exact path="/lote" element={<Lote />} />
            <Route exact path="/busca-boletos" element={<BuscaBoletos />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
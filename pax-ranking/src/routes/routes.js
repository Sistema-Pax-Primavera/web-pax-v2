import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ranking from "../pages/ranking";
import RankingTV from "../pages/tv/ranking-tv";

const RoutesApp = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/ranking-tv" element={<RankingTV />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
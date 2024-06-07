import React, { useState, useEffect, useRef } from "react";
import "./ranking-tv.css";
import { FaSyncAlt, FaHome, FaSearch } from "react-icons/fa";
import Pax from "../../../assets/logo-pax-branco.svg";
import ButtonComponent from "../../components/button/button-component";
import TableComponent from "../../components/table/table";
import { useNavigate } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const RankingTV = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [dataInicial, setDataInicial] = useState(today);
  const [dataFinal, setDataFinal] = useState(today);
  const tableWrapperRef = useRef(null);
  const unidades = ["Dourados", "Ponta Porã", "Itaporã"];
  const tipos = ["Escritório", "Boleto", "Cobrador"];

  const initialData = [
    {
      cobradores: "Cobrador 1",
      parcela1: 10,
      parcela2: 50,
      parcela3: 20,
      adiantados: 50,
      pontuacao: 30,
    },
    {
      cobradores: "Cobrador 2",
      parcela1: 12,
      parcela2: 80,
      parcela3: 22,
      adiantados: 60,
      pontuacao: 35,
    },
    {
      cobradores: "Cobrador 3",
      parcela1: 9,
      parcela2: 30,
      parcela3: 18,
      adiantados: 40,
      pontuacao: 27,
    },
    {
      cobradores: "Cobrador 4",
      parcela1: 15,
      parcela2: 60,
      parcela3: 25,
      adiantados: 55,
      pontuacao: 33,
    },
    {
      cobradores: "Cobrador 5",
      parcela1: 11,
      parcela2: 75,
      parcela3: 20,
      adiantados: 58,
      pontuacao: 36,
    },
    {
      cobradores: "Cobrador 6",
      parcela1: 13,
      parcela2: 70,
      parcela3: 21,
      adiantados: 62,
      pontuacao: 38,
    },
    {
      cobradores: "Cobrador 7",
      parcela1: 14,
      parcela2: 55,
      parcela3: 23,
      adiantados: 48,
      pontuacao: 64,
    },
    {
      cobradores: "Cobrador 8",
      parcela1: 16,
      parcela2: 65,
      parcela3: 26,
      adiantados: 45,
      pontuacao: 34,
    },
    {
      cobradores: "Cobrador 9",
      parcela1: 18,
      parcela2: 68,
      parcela3: 28,
      adiantados: 47,
      pontuacao: 37,
    },
    {
      cobradores: "Cobrador 10",
      parcela1: 17,
      parcela2: 90,
      parcela3: 30,
      adiantados: 70,
      pontuacao: 40,
    },
    {
      cobradores: "Cobrador 11",
      parcela1: 10,
      parcela2: 50,
      parcela3: 20,
      adiantados: 50,
      pontuacao: 30,
    },
    {
      cobradores: "Cobrador 12",
      parcela1: 12,
      parcela2: 80,
      parcela3: 22,
      adiantados: 60,
      pontuacao: 35,
    },
    {
      cobradores: "Cobrador 13",
      parcela1: 9,
      parcela2: 30,
      parcela3: 18,
      adiantados: 40,
      pontuacao: 27,
    },
    {
      cobradores: "Cobrador 14",
      parcela1: 15,
      parcela2: 60,
      parcela3: 25,
      adiantados: 55,
      pontuacao: 33,
    },
    {
      cobradores: "Cobrador 15",
      parcela1: 11,
      parcela2: 75,
      parcela3: 20,
      adiantados: 58,
      pontuacao: 36,
    },
    {
      cobradores: "Cobrador 16",
      parcela1: 13,
      parcela2: 70,
      parcela3: 21,
      adiantados: 62,
      pontuacao: 38,
    },
    {
      cobradores: "Cobrador 17",
      parcela1: 14,
      parcela2: 55,
      parcela3: 23,
      adiantados: 48,
      pontuacao: 31,
    },
    {
      cobradores: "Cobrador 18",
      parcela1: 16,
      parcela2: 65,
      parcela3: 26,
      adiantados: 45,
      pontuacao: 34,
    },
    {
      cobradores: "Cobrador 19",
      parcela1: 18,
      parcela2: 68,
      parcela3: 28,
      adiantados: 47,
      pontuacao: 81,
    },
    {
      cobradores: "Cobrador 20",
      parcela1: 17,
      parcela2: 90,
      parcela3: 30,
      adiantados: 70,
      pontuacao: 66,
    },
    {
      cobradores: "Cobrador 21",
      parcela1: 10,
      parcela2: 50,
      parcela3: 20,
      adiantados: 50,
      pontuacao: 30,
    },
    {
      cobradores: "Cobrador 22",
      parcela1: 12,
      parcela2: 80,
      parcela3: 22,
      adiantados: 60,
      pontuacao: 35,
    },
    {
      cobradores: "Cobrador 23",
      parcela1: 9,
      parcela2: 30,
      parcela3: 18,
      adiantados: 40,
      pontuacao: 27,
    },
    {
      cobradores: "Cobrador 24",
      parcela1: 15,
      parcela2: 60,
      parcela3: 25,
      adiantados: 55,
      pontuacao: 33,
    },
    {
      cobradores: "Cobrador 25",
      parcela1: 11,
      parcela2: 75,
      parcela3: 20,
      adiantados: 58,
      pontuacao: 36,
    },
    {
      cobradores: "Cobrador 26",
      parcela1: 13,
      parcela2: 70,
      parcela3: 21,
      adiantados: 62,
      pontuacao: 38,
    },
    {
      cobradores: "Cobrador 27",
      parcela1: 14,
      parcela2: 55,
      parcela3: 23,
      adiantados: 48,
      pontuacao: 64,
    },
    {
      cobradores: "Cobrador 28",
      parcela1: 16,
      parcela2: 65,
      parcela3: 26,
      adiantados: 45,
      pontuacao: 34,
    },
    {
      cobradores: "Cobrador 29",
      parcela1: 18,
      parcela2: 68,
      parcela3: 28,
      adiantados: 47,
      pontuacao: 37,
    },
    {
      cobradores: "Cobrador 30",
      parcela1: 17,
      parcela2: 90,
      parcela3: 30,
      adiantados: 70,
      pontuacao: 40,
    },
    {
      cobradores: "Cobrador 31",
      parcela1: 10,
      parcela2: 50,
      parcela3: 20,
      adiantados: 50,
      pontuacao: 30,
    },
    {
      cobradores: "Cobrador 32",
      parcela1: 12,
      parcela2: 80,
      parcela3: 22,
      adiantados: 60,
      pontuacao: 35,
    },
    {
      cobradores: "Cobrador 33",
      parcela1: 9,
      parcela2: 30,
      parcela3: 18,
      adiantados: 40,
      pontuacao: 27,
    },
    {
      cobradores: "Cobrador 34",
      parcela1: 15,
      parcela2: 60,
      parcela3: 25,
      adiantados: 55,
      pontuacao: 33,
    },
    {
      cobradores: "Cobrador 35",
      parcela1: 11,
      parcela2: 75,
      parcela3: 20,
      adiantados: 58,
      pontuacao: 36,
    },
    {
      cobradores: "Cobrador 36",
      parcela1: 13,
      parcela2: 70,
      parcela3: 21,
      adiantados: 62,
      pontuacao: 38,
    },
    {
      cobradores: "Cobrador 37",
      parcela1: 14,
      parcela2: 55,
      parcela3: 23,
      adiantados: 48,
      pontuacao: 31,
    },
    {
      cobradores: "Cobrador 38",
      parcela1: 16,
      parcela2: 65,
      parcela3: 26,
      adiantados: 45,
      pontuacao: 34,
    },
    {
      cobradores: "Cobrador 39",
      parcela1: 18,
      parcela2: 68,
      parcela3: 28,
      adiantados: 47,
      pontuacao: 81,
    },
    {
      cobradores: "Cobrador 40",
      parcela1: 17,
      parcela2: 90,
      parcela3: 30,
      adiantados: 70,
      pontuacao: 66,
    },
    {
      cobradores: "Cobrador 41",
      parcela1: 10,
      parcela2: 50,
      parcela3: 20,
      adiantados: 50,
      pontuacao: 30,
    },
    {
      cobradores: "Cobrador 42",
      parcela1: 12,
      parcela2: 80,
      parcela3: 22,
      adiantados: 60,
      pontuacao: 35,
    },
    {
      cobradores: "Cobrador 43",
      parcela1: 9,
      parcela2: 30,
      parcela3: 18,
      adiantados: 40,
      pontuacao: 27,
    },
    {
      cobradores: "Cobrador 44",
      parcela1: 15,
      parcela2: 60,
      parcela3: 25,
      adiantados: 55,
      pontuacao: 33,
    },
    {
      cobradores: "Cobrador 45",
      parcela1: 11,
      parcela2: 75,
      parcela3: 20,
      adiantados: 58,
      pontuacao: 36,
    },
    {
      cobradores: "Cobrador 46",
      parcela1: 13,
      parcela2: 70,
      parcela3: 21,
      adiantados: 62,
      pontuacao: 38,
    },
    {
      cobradores: "Cobrador 47",
      parcela1: 14,
      parcela2: 55,
      parcela3: 23,
      adiantados: 48,
      pontuacao: 64,
    },
    {
      cobradores: "Cobrador 48",
      parcela1: 16,
      parcela2: 65,
      parcela3: 26,
      adiantados: 45,
      pontuacao: 34,
    },
    {
      cobradores: "Cobrador 49",
      parcela1: 18,
      parcela2: 68,
      parcela3: 28,
      adiantados: 47,
      pontuacao: 37,
    },
    {
      cobradores: "Cobrador 50",
      parcela1: 17,
      parcela2: 90,
      parcela3: 30,
      adiantados: 70,
      pontuacao: 40,
    },
    {
      cobradores: "Cobrador 51",
      parcela1: 10,
      parcela2: 50,
      parcela3: 20,
      adiantados: 50,
      pontuacao: 30,
    },
    {
      cobradores: "Cobrador 52",
      parcela1: 12,
      parcela2: 80,
      parcela3: 22,
      adiantados: 60,
      pontuacao: 35,
    },
    {
      cobradores: "Cobrador 53",
      parcela1: 9,
      parcela2: 30,
      parcela3: 18,
      adiantados: 40,
      pontuacao: 27,
    },
    {
      cobradores: "Cobrador 54",
      parcela1: 15,
      parcela2: 60,
      parcela3: 25,
      adiantados: 55,
      pontuacao: 33,
    },
    {
      cobradores: "Cobrador 55",
      parcela1: 11,
      parcela2: 75,
      parcela3: 20,
      adiantados: 58,
      pontuacao: 36,
    },
    {
      cobradores: "Cobrador 56",
      parcela1: 13,
      parcela2: 70,
      parcela3: 21,
      adiantados: 62,
      pontuacao: 38,
    },
    {
      cobradores: "Cobrador 57",
      parcela1: 14,
      parcela2: 55,
      parcela3: 23,
      adiantados: 48,
      pontuacao: 31,
    },
    {
      cobradores: "Cobrador 58",
      parcela1: 16,
      parcela2: 65,
      parcela3: 26,
      adiantados: 45,
      pontuacao: 34,
    },
    {
      cobradores: "Cobrador 59",
      parcela1: 18,
      parcela2: 68,
      parcela3: 28,
      adiantados: 47,
      pontuacao: 81,
    },
    {
      cobradores: "Cobrador 60",
      parcela1: 17,
      parcela2: 90,
      parcela3: 30,
      adiantados: 70,
      pontuacao: 66,
    },
  ];

  const [data, setData] = useState([]);
  const [isRotated, setIsRotated] = useState(false);

  const handleRotateScreen = () => {
    setIsRotated(!isRotated);
  };

  useEffect(() => {
    const sortedData = [...initialData].sort(
      (a, b) => b.pontuacao - a.pontuacao
    );
    setData(sortedData);
  }, []);

  return (
    <div className={`container-ranking ${isRotated ? "rotate" : ""}`} style={{ overflow: "hidden" }}>
      <div className="header-ranking">
        <img
          onClick={() => navigate("/login")}
          src={Pax}
          alt="Logo"
          className="logo"
          style={{ width: "80px", marginLeft: "20px" }}
        />
        <div className="header-controls">

          <div className="unidade-ranking2">
            <p>Tipo</p>
            <select>
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="unidade-ranking3">
            <p>Unidade</p>
            <select>
              {unidades.map((unidade, index) => (
                <option key={index} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>
          </div>
          <div className="data-inicial-ranking2">
            <p>Data inicial</p>
            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
          </div>
          <div className="data-inicial-ranking2">
            <p>Data final</p>
            <input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
          <div className="buttons-pesquisa-gira">
            <ButtonComponent
              icon="search"
              onClick={() => { }}
              style={{ marginRight: "10px" }}
            />
            <ButtonComponent
              icon="sync"
              onClick={handleRotateScreen}
              style={{ marginRight: "10px" }}
            />
          </div>
        </div>
      </div>
      <div
        className={`table-ranking ${isRotated ? "rotate-table" : ""}`}
        ref={tableWrapperRef}
      >
        <TableComponent data={data} />
      </div>
      <div className="resumo-dados">
        <div className="icon-input-select2">
          <p>1º Parcela</p>
          <div className="icon-input-select">
            <CurrencyExchangeIcon fontSize="small" />
            <input type="text" value="Valor 1" disabled />
          </div>
        </div>
        <div className="icon-input-select2">
          <p>2º Parcelas</p>
          <div className="icon-input-select">
            <CurrencyExchangeIcon fontSize="small" />
            <input type="text" value="Valor 2" disabled />
          </div>
        </div>
        <div className="icon-input-select2">
          <p>3º Parcelas</p>
          <div className="icon-input-select">
            <CurrencyExchangeIcon fontSize="small" />
            <input type="text" value="Valor 3" disabled />
          </div>
        </div>
        <div className="icon-input-select2">
          <p>Adiantados</p>
          <div className="icon-input-select">
            <CurrencyExchangeIcon fontSize="small" />
            <input type="text" value="Valor 4" disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingTV;

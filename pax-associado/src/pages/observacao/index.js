import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import DateMaskInput from "../../components/inputs";
import "./observacao.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from "react-router-dom";
import MyAccordion from "../../components/accordion";
import TaskIcon from "@mui/icons-material/Task";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { headerObservacao } from "../../entities/headers/header-observacao";
import TableComponent from "../../components/table/table";
import ButtonText from "../../components/button-texto";
import ModalAssociado from "../../components/modal-associado";
import DescriptionIcon from "@mui/icons-material/Description";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  converterData,
  converterDataHora,
  converterDataParaFormatoISO,
} from "../../utils/fuctions";

const Observacao = () => {
  const location = useLocation();
  const cliente = location.state && location.state.cliente;
  const idioma = location.state && location.state.idioma;
  const [isOpen, setIsOpen] = useState(false);
  const [dadosModal, setDadosModal] = useState(null);
  const [user, setUser] = useState(null);
  const [clientes, setCliente] = useState({});
  const [observacao, setObservacao] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [observacaoData, setObservacaoData] = useState([]);
  const [filteredObservacao, setFilteredObservacao] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleSearch2 = () => {
    setLoading(true);

    if (!startDate || !endDate) {
      // Se as datas de início e fim não estiverem definidas,
      // verifique se uma categoria foi selecionada
      if (!selectedCategory) {
        toast.warning("Selecione uma categoria ou informe uma data inicial e final para filtrar!");
        setLoading(false);
        return;
      }

      // Filtrar os dados apenas pela categoria selecionada
      let filteredData = observacaoData.filter(
        (item) => item.categoria === selectedCategory
      );

      // Se uma subcategoria estiver selecionada, filtre também por subcategoria
      if (selectedSubcategory) {
        filteredData = filteredData.filter(
          (item) => item.subcategoria === selectedSubcategory
        );
      }

      setFilteredObservacao(filteredData);
      if (filteredData.length === 0) {
        toast.error("Nenhum resultado encontrado");
      }

      setLoading(false);
    } else {
      // Se as datas de início e fim estiverem definidas, execute a lógica original
      console.log("cai aqui");
      let filteredData = observacaoData.filter((item) => {
        const itemDate = converterDataParaFormatoISO(item.data_criacao);
        return itemDate >= startDate && itemDate <= endDate;
      });

      // Se uma categoria estiver selecionada, filtre também por categoria
      if (selectedCategory) {
        filteredData = filteredData.filter(
          (item) => item.categoria === selectedCategory
        );
      }

      // Se uma subcategoria estiver selecionada, filtre também por subcategoria
      if (selectedSubcategory) {
        filteredData = filteredData.filter(
          (item) => item.subcategoria === selectedSubcategory
        );
      }

      setFilteredObservacao(filteredData);
      if (filteredData.length === 0) {
        toast.error("Nenhum resultado encontrado");
      }

      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    assunto: "",
    data: "",
    cliente: "",
    categoria: "",
    subcategoria: "",
    descricao: "",
  });

  const handleViewClick = (rowData) => {
    //const formattedDate = new Date(rowData.data).toLocaleDateString();
    setDadosModal({
      assunto: rowData.titulo,
      data: rowData.data_criacao, // Utilize a data formatada
      categoria: rowData.categoria,
      subcategoria: rowData.subcategoria,
      cliente: rowData.usuario,
      descricao: rowData.descricao,
    });
    setIsOpen(true); // Abrir a modal quando o usuário clicar para visualizar
  };

  const handleSaveClick = () => {
    const updatedRows = rows.map((row) => {
      if (row.name === formData.assunto) {
        return {
          ...row,
          data: formData.data,
          usuario: formData.cliente,
        };
      }
      return row;
    });
    setRows(updatedRows);
    // Limpar os campos do formulário após salvar
    setFormData({
      assunto: "",
      data: "",
      cliente: "",
      categoria: "",
      subcategoria: "",
      informacoes: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  useEffect(() => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const usuarioObj = JSON.parse(savedUsuario);
      setUser(usuarioObj.usuario);
    }

    // Atualizar os dados do extrato
    if (cliente && cliente.observacao) {
      setObservacaoData(cliente.observacao);
      setFilteredObservacao(cliente.observacao); // Inicialmente, os dados filtrados serão os dados originais
    }
  }, [cliente]);

  useEffect(() => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const usuarioObj = JSON.parse(savedUsuario);
      setUser(usuarioObj.usuario);
    }
  }, []);

  useEffect(() => {
    setCliente(); // Inicializando o estado cliente com os dados iniciais
  }, [cliente]);

  return (
    <>
      <div className="container-associados">
        <Header cliente={cliente} idioma={idioma} />
        <div className="container-observacao-associado">
          <div className="icones-nome">
            <label>
              <AccountCircleIcon fontSize={"small"} />
              {cliente ? cliente.nome : ""} Nº do Contrato -{" "}
              {cliente ? cliente.n_contrato : ""}
            </label>
          </div>
          <div className="container-linha">
            <div className="campos-01">
              <label>Assunto</label>
              <input
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
              ></input>
            </div>
            <div className="data-observacao">
              <label>Data</label>
              <DateMaskInput
                name="data"
                value={formData.data}
                onChange={handleChange}
              />
            </div>
            <div className="campos-01">
              <label>Cliente</label>
              <input
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="container-linha">
            <div className="textarea">
              <label>Informações</label>
              <textarea
                name="informacoes"
                value={formData.informacoes}
                onChange={handleChange}
                placeholder="Escreva seu texto aqui"
                wrap="soft"
              ></textarea>
            </div>
          </div>
          <div className="salva-observacao">
            <ButtonText title="SALVAR" funcao={handleSaveClick} />
          </div>
          <div className="container-linha2"></div>
          {isOpen && dadosModal && (
            <ModalAssociado
              isOpen={isOpen}
              onClose={() => setIsOpen(false)} // Aqui você define a função onClose que fecha o modal
              buttonText="Abrir Modal"
              titulo="Observação"
              icon="ícone_do_botão"
              icone2={<DescriptionIcon fontSize={"small"} />}
            >
              <div className="fundo-modal-observacao">
                <div className="container-linha">
                  <div className="titulo-observacao2">
                    <p>Título</p>
                    <label>{dadosModal.assunto}</label>
                  </div>
                  <div className="titulo-observacao3">
                    <p>Usuário </p>
                    <label>{dadosModal.cliente}</label>
                  </div>
                  <div className="titulo-observacao">
                    <p>Categoria </p>
                    <label>{dadosModal.categoria}</label>
                  </div>
                </div>
                <div className="container-linha">
                  <div className="titulo-observacao3">
                    <p>Sub Categoria </p>
                    <label>{dadosModal.subcategoria}</label>
                  </div>
                  <div className="titulo-observacao3">
                    <p>Data </p>
                    <label>{dadosModal.data}</label>
                  </div>
                </div>
                <div className="container-linha">
                  <div className="descricao-observacao3">
                    <p>Descrição </p>
                    <label>{dadosModal.descricao}</label>
                  </div>
                </div>
              </div>
            </ModalAssociado>
          )}
          <MyAccordion
            title="Historico de F9"
            icon={<TaskIcon />}
            expandedIcon={<ExpandMoreIcon />}
          >
            <div className="container-linha">
              <div className="campos-02">
                <label>De</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                ></input>
              </div>
              <div className="campos-02">
                <label>Até</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                ></input>
              </div>
              <div className="campos-02-observacao">
                <label>Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Selecione uma categoria</option>
                  {/* Renderize opções com base nas categorias disponíveis */}
                  {cliente.observacao.map((obs) => (
                    <option key={obs.categoria} value={obs.categoria}>
                      {obs.categoria}
                    </option>
                  ))}
                </select>
              </div>
              <div className="campos-02-observacao">
                <label>Subcategoria</label>
                <select
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value="">Selecione uma subcategoria</option>
                  {/* Renderize opções com base nas subcategorias disponíveis */}
                  {cliente.observacao.map((obs) => (
                    <option key={obs.subcategoria} value={obs.subcategoria}>
                      {obs.subcategoria}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filtro-extrato">
                <ButtonText title="FILTRAR" funcao={handleSearch2} />
              </div>
            </div>
            <TableComponent
              headers={headerObservacao}
              rows={filteredObservacao}
              actionsLabel={["Ações", "Acciones"]}
              actionCalls={{
                view: (e) => handleViewClick(e),
              }}
            />
          </MyAccordion>
        </div>
      </div>
    </>
  );
};

export default Observacao;

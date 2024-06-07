import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from "../pages/cadastro";
import Usuarios from '../pages/usuarios/index'
import Pet from '../pages/pet/index'
import Atendimento from '../pages/atendimento/index'
import Perfil from "../pages/usuarios/perfil";
import Parentesco from "../pages/pax/parentesco";
import EstadoCivil from "../pages/pax/estado-civil";
import Religiao from "../pages/pax/religiao";
import Bairro from '../pages/cobranca/bairro/index'
import Raca from "../pages/pet/raca";
import Especie from "../pages/pet/especie";
import Cobranca from "../pages/cobranca";
import Rota from "../pages/cobranca/rota";
import RegiaoBairro from "../pages/cobranca/regiao-bairro";
import Municipio from "../pages/cobranca/municipio/index";
import Bordero from "../pages/cobranca/bordero";
import TipoAtendimento from "../pages/atendimento/tipo-atendimento";
import TipoSubAtendimento from "../pages/atendimento/tipo-sub-atendimento";
import Planos from "../pages/pax/planos";
import Adicionais from "../pages/pax/adicionais";
import Concorrencia from "../pages/pax/concorrencia";
import Categoria from "../pages/pax/categoria";
import SubCategoria from "../pages/pax/sub-categoria";
import Situacao from "../pages/pax/situacao";
import Templates from "../pages/pax/templates";
import Profissao from '../pages/pax/profissao'
import CrmVendas from "../pages/pax/crm-vendas";
import Pax from "../pages/pax";
import ItensPlano from "../pages/itens-plano";
import Financeiro from "../pages/financeiro";
import Conta from "../pages/financeiro/conta";
import FormaPagamento from "../pages/financeiro/forma-pagamento";
import PlanoConta from "../pages/financeiro/plano-conta";
import Fornecedor from "../pages/financeiro/fornecedor";
import Funcao from "../pages/usuarios/funcao";
import Permissao from "../pages/usuarios/permissao";
import Setor from "../pages/usuarios/setor";
import CategoriaItem from "../pages/itens-plano/categoria-item";
import Item from "../pages/itens-plano/item";
import Filtro from "../pages/pax/crm-vendas/filtro";
import Colunas from "../pages/pax/crm-vendas/colunas";
import Grupo from "../pages/pax/crm-vendas/grupo";
import Indicados from "../pages/pax/crm-vendas/indicados";
import Atividades from "../pages/pax/crm-vendas/atividades";
import Etiquetas from "../pages/pax/crm-vendas/etiquetas";
import OrigemLead from "../pages/pax/crm-vendas/origem-lead";
import CategoriaAgendamentos from "../pages/pax/crm-vendas/categoria-agendamentos";
import Justificativa from "../pages/pax/crm-vendas/justificativa";
import Gatilhos from "../pages/pax/crm-vendas/gatilhos";
import InteressesCLiente from "../pages/pax/crm-vendas/interesses-cliente";
import Banco from "../pages/financeiro/banco";
import UnidadeFinanceira from "../pages/financeiro/unidade-financeira";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/configuracoes/cadastro">
        <Routes>
            <Route exact path="*" element={<Cadastro />} />
            <Route exact path="/usuarios" element={<Usuarios />} />
            <Route exact path="/cobranca" element={<Cobranca />} />
            <Route exact path="/pet" element={<Pet />} />
            <Route exact path="/atendimento" element={<Atendimento />} />

            <Route exact path="/usuarios/perfil" element={<Perfil />} />
            <Route exact path="/usuarios/funcao" element={<Funcao />} />
            <Route exact path="/usuarios/permissao" element={<Permissao />} />
            <Route exact path="/usuarios/setor" element={<Setor />} />

            <Route exact path="/cobranca/rota" element={<Rota />} />
            <Route exact path="/cobranca/bairro" element={<Bairro />} />
            <Route exact path="/cobranca/regiao-bairro" element={<RegiaoBairro />} />
            <Route exact path="/cobranca/municipio" element={<Municipio />} />
            <Route exact path="/cobranca/bordero" element={<Bordero />} />

            <Route exact path="/pet/raca" element={<Raca />} />
            <Route exact path="/pet/especie" element={<Especie />} />

            <Route exact path="/atendimento/tipo-atendimento" element={<TipoAtendimento />} />
            <Route exact path="/atendimento/tipo-sub-atendimento" element={<TipoSubAtendimento />} />

            <Route exact path="/pax" element={<Pax />} />
            <Route exact path="/pax/planos" element={<Planos />} />
            <Route exact path="/pax/adicionais" element={<Adicionais />} />
            <Route exact path="/pax/parentesco" element={<Parentesco />} />
            <Route exact path="/pax/religiao" element={<Religiao />} />
            <Route exact path="/pax/estado-civil" element={<EstadoCivil />} />
            <Route exact path="/pax/concorrencia" element={<Concorrencia />} />
            <Route exact path="/pax/categoria" element={<Categoria />} />
            <Route exact path="/pax/sub-categoria" element={<SubCategoria />} />
            <Route exact path="/pax/situacao" element={<Situacao />} />
            <Route exact path="/pax/templates" element={<Templates />} />
            <Route exact path="/pax/profissao" element={<Profissao />} />
            <Route exact path="/pax/crm-vendas" element={<CrmVendas />} />

            <Route exact path="/crm-vendas/filtro" element={<Filtro />} />
            <Route exact path="/crm-vendas/colunas" element={<Colunas />} />
            <Route exact path="/crm-vendas/grupo" element={<Grupo />} />
            <Route exact path="/crm-vendas/indicados" element={<Indicados />} />
            <Route exact path="/crm-vendas/atividades" element={<Atividades />} />
            <Route exact path="/crm-vendas/etiquetas" element={<Etiquetas />} />
            <Route exact path="/crm-vendas/origem-lead" element={<OrigemLead />} />
            <Route exact path="/crm-vendas/categoria-agendamentos" element={<CategoriaAgendamentos />} />
            <Route exact path="/crm-vendas/justificativa" element={<Justificativa />} />
            <Route exact path="/crm-vendas/gatilhos" element={<Gatilhos />} />
            <Route exact path="/crm-vendas/interesses-cliente" element={<InteressesCLiente />} />

            <Route exact path="/financeiro" element={<Financeiro />} />
            <Route exact path="/financeiro/conta" element={<Conta />} />
            <Route exact path="/financeiro/banco" element={<Banco />} />
            <Route exact path="/financeiro/forma-pagamento" element={<FormaPagamento />} />
            <Route exact path="/financeiro/plano-conta" element={<PlanoConta />} />
            <Route exact path="/financeiro/unidade-financeira" element={<UnidadeFinanceira />} />
            <Route exact path="/financeiro/fornecedor" element={<Fornecedor />} />

            <Route exact path="/item" element={<ItensPlano />} />
            <Route exact path="/item/categoria-item" element={<CategoriaItem />} />
            <Route exact path="/item/itens" element={<Item />} />



        </Routes>
    </BrowserRouter>
);

export default RoutesApp;
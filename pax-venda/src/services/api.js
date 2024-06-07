
import { Contrato } from '../entities/class/contrato';
import { Vendas } from '../entities/class/vendas';
import { CRM } from '../entities/class/crm';
import httpsInstance from './url';

export const useVendas = () => {
    const https = httpsInstance()

    const getContratos = async () => {
        const response = await https.get("/contratos");
        const { data } = response;
        return data.map((item) => Vendas(item));
    };

    const getContratosFinalizados = async () => {
        const response = await https.get("/contratos-finalizados");
        const { data } = response;
        return data.map((item) => Vendas(item));
    };

    const getContratoBusca = async (value) => {
        try {
            const response = await https.get(`/contratos/busca?value=${value}`);
            const { data } = response;

            if (data) {
                return data.map((item) => Vendas(item));
                //return VendaFinalizada(data)
            }
            return {}
        } catch (error) {
            console.log("Erro ao obter contratos da API:", error);
            return error;
        }
    }
    const getContrato = async (value) => {
        try {
            const response = await https.get(`/contrato?value=${value}`);
            const { data } = response;
            if (data) {
                return data.map((item) => Contrato(item));

            } else {
                console.log("Dados inválidos ou ausentes na resposta da API.");
                return null;
            }
        } catch (error) {
            console.error("Erro ao obter contratos da API:", error);
            return error;
        }
    }

    const getCRMVendas = async () => {
        try {
            const response = await https.get("/crm-vendas");
            const data = response.data;
            if (data && Array.isArray(data)) {
                const crmData = data.map(item => {
                    return new CRM(item);
                });
                return crmData;
            } else {
                return null;
            }
        } catch (error) {
            if (error.response && error.response.status) {
                throw { message: error.message, status: error.response.status };
            } else {
                throw error;
            }
        }
    };


    return {
        getContratos,
        getContratosFinalizados,
        getContratoBusca,
        getContrato,
        getCRMVendas
    }
}




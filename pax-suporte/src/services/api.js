import { FormPag } from '../entities/class/alt-form';
import { Cheque } from '../entities/class/cheque';
import { Suporte } from '../entities/class/suporte';
import httpsInstance from './url';

export const useSuporte = () => {
    const https = httpsInstance()

    const getPagamentos = async (contrato) => {
        try {
            const response = await https.get(`/alt-caixa?contrato=${contrato}`);
            const { data } = response;
            if (data) {
                return Suporte(data)
            }
            return {}
        } catch (error) {
            console.log("Erro ao obter pagamentos da API:", error);
            return error;
        }
    }

    const alterarCaixa = async (contrato, idPag, caixa) => {
        try {
            const response = await https.put('/suporte/alt-caixa', {
                contrato: contrato,
                idPagamento: idPag,
                tipoCaixa: caixa
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar forma de pagamento:", error);
            throw error;
        }
    }

    const getFormPagamento = async (contrato, dataPagamento) => {
        try {
            console.log(contrato)
            const response = await https.get(`/form-pagamento?contrato=${contrato}&pagamento=${dataPagamento}`);
            const { data } = response;
            return FormPag(data)
        } catch (error) {
            console.error("Erro ao obter pagamentos da API:", error);
            throw error;
        }
    }

    const alterarFormPagamento = async (contrato, idPag, formPag) => {
        try {
            const response = await https.put('/suporte/alt-form', {
                contrato: contrato,
                idPagamentos: idPag,
                formaPagto: formPag
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar forma de pagamento:", error);
            throw error;
        }
    }

    const getCheques = async (status) => {
        try {
            const response = await https.get(`/cheque?status=${status}`);
            const { data } = response;
            if (data) {
                return data.map((cheque) =>
                    Cheque(cheque)
                );
            }
        } catch (error) {
            console.log("Erro ao obter cheques da API:", error);
            return error;
        }
    }

    return {
        getPagamentos,
        alterarCaixa,
        getFormPagamento,
        alterarFormPagamento,
        getCheques
    }
}
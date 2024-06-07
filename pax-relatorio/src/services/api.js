import { Cancelamento } from '../entities/class/cancelamento';
import { Cobranca } from '../entities/class/cobranca';
import { Obito } from '../entities/class/obito';
import { Ranking } from '../entities/class/ranking';
import { Vendas } from '../entities/class/venda';
import httpsInstance from './url';

export const useRelatorio = () => {
    const https = httpsInstance()

    const getCobranca = async () => {
        const response = await https.get("/relatorio-cobranca");
        const { data } = response;
        return data.map((item) => Cobranca(item));
    };

    const getVendas = async () => {
        const response = await https.get("/relatorio-vendas");
        const { data } = response;
        return data.map((item) => Vendas(item));
    };

    const getRanking = async () => {
        const response = await https.get("/relatorio-ranking");
        const { data } = response;
        return data.map((item) => Ranking(item));
    };

    const getCancelamento = async () => {
        const response = await https.get("/relatorio-cancelamento");
        const { data } = response;
        return data.map((item) => Cancelamento(item));
    };

    const getObito = async () => {
        const response = await https.get("/relatorio-obito");
        const { data } = response;
        return data.map((item) => Obito(item));
    };

    return {
        getCobranca,
        getVendas,
        getRanking,
        getCancelamento,
        getObito
    }
}




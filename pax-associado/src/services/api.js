
import { Associado } from '../entities/class/associado';
import httpsInstance from './url';

export const useAssociado = () => {
    const https = httpsInstance()

    const getAssociados = async (unidadeId) => {
        try {
            const response = await https.get(`/associados?unidadeId=${unidadeId}`);
            const data = response.data;
            if (data) {
                return data.map((item) => Associado(item));
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

    const getAssociado = async (value, unidadeId) => {
        try {
            const response = await https.get(`/associado/busca?value=${value}&unidadeId=${unidadeId}`);
            return response.data.map((item) => Associado(item));
        } catch (error) {
            if (error.response && error.response.status) {
                throw { message: error.message, status: error.response.status };
            } else {
                throw error;
            }
        }
    };

    return {
        getAssociados,
        getAssociado
    }
}
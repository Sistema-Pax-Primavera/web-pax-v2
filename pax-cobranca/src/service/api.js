import { CRM } from '../entities/class/crm';
import { Mensagens } from '../entities/class/script';
import httpsInstance from './url';

export const useCobranca = () => {
    const https = httpsInstance();

    const getCRMEsc = async () => {
        try {
            const response = await https.get("/crm-escritorio");
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

    const getTelemarketing = async () => {
        try {
            const response = await https.get("/telemarketing");
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

    const getScript = async () => {
        const response = await https.get("/script");
        const { data } = response;
        return data.map((item) => Mensagens(item));
    };


    return {
        getCRMEsc,
        getTelemarketing,
        getScript
    }
}
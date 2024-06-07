import { Telemarketing } from '../entities/class/telemarketing';
import httpsInstance from './url';

export const useTelemarketing = () => {
    const https = httpsInstance();

    const getTelemarketingID = async (id) => {
        try {
            const response = await https.get(`/telemarketing/${id}`);
            const data = response.data;
            if (data) {
                return new Telemarketing(data);
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
        getTelemarketingID
    }
}
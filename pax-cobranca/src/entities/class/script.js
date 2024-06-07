import { converterData } from "../../utils/fuctions";

export const Mensagens = (data) => ({
    id: data?.id,
    nome_cobrador: data?.cobrador,
    data: converterData(data?.data),
    hora: data?.hora,
    tipo: data?.tipo,
    status: data?.status,
    usuario: data?.usuario,
    mensagem: data?.mensagem,
});

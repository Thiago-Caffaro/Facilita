import api from '@/services/api';
import { fetchUserAttributes } from "@/services/auth"

export default function useGetFreq() {
  const getFreq = async () => {
    const atributes = await fetchUserAttributes();
    const matricula = atributes['custom:matricula'];
      try {
        const response = await api.post('/getFrequencia', {
          matricula: matricula
        });
        const data = response.data;
        // Verifica a resposta do servidor e realiza a validação do login.
        if (data.success) {
            // Vínculo bem-sucedido
            console.log('Frequância encontrada', data);
            return {
                data
            }
        } else {
          console.log('Erro de autenticação:', data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer o vínculo:', error);
      }
  }

  return getFreq;
}

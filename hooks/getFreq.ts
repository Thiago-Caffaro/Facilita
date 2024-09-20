import axios from 'axios';
import { fetchUserAttributes } from "aws-amplify/auth"

export default function useGetFreq() {
  const getFreq = async () => {
    const atributes = await fetchUserAttributes();
    const matricula = atributes['custom:matricula'];
      try {
        const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/getFrequencia', {
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

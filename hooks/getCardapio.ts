import axios from 'axios';
import { AuthContext } from '@/context/auth';
import { useContext } from 'react';
export default function getCardapio() {
  const getCardapio = async () => {
    if (matricula) {
      try {
        const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/getCardapio', {});
        const data = response.data;
        // Verifica a resposta do servidor e realiza a validação do login.
        if (data.success) {
            // Vínculo bem-sucedido
            console.log('Cardapio encontrado');
            return {
                Dia1: dia1,
                Dia2: dia2,
                Dia3: dia3,
                Dia4: dia4,
                Dia5: dia5
            }
        } else {
          console.log('Erro de autenticação:', data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer o vínculo:', error);
      }
    } else {
      console.log("Bananas")
    }
    
  }

  return getCardapio;
}

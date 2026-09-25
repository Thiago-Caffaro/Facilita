import api from '@/services/api';
export default function useGetCardapio() {
  const getCardapio = async () => {
      try {
        const response = await api.get('/getCardapio');
        const data = response.data;
        // Verifica a resposta do servidor e realiza a validação do login.
        if (data.success) {
            // Vínculo bem-sucedido
            console.log('Cardapio encontrado', data);
            return {
                Dia1: data.cardapio.Dia1,
                Dia2: data.cardapio.Dia2,
                Dia3: data.cardapio.Dia3,
                Dia4: data.cardapio.Dia4,
                Dia5: data.cardapio.Dia5
            }
        } else {
          console.log('Erro de autenticação:', data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer o vínculo:', error);
      }
  }

  return getCardapio;
}

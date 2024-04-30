import axios from 'axios';

const requerirAlunoData = async (matricula) => {
    try {
        const response = await axios.get('https://api.caffaro.cloud/getAluno', {
            params: {
                matricula: matricula,
            },
        });
        // Verifique a resposta do servidor e realize a validação do login.
        if (response.data.success) {
            // Vínculo bem-sucedido
            console.log('Aluno encontrado');
            
            return {
                nomeAluno: response.data.nomeAluno,
                turmaAluno: response.data.turmaAluno,
                numeroAluno: response.data.numeroAluno,
                matriculaAluno: matricula
            }
        } else {
          // Vínculo falhou
          console.error('Erro de autenticação:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer o vínculo:', error);
      }
}
export default requerirAlunoData;
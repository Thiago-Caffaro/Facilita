import axios from 'axios';

const requerirAlunoData = async (matricula) => {
    try {
        const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/getAluno', {
            matricula: matricula,
        });

        const data = response.data;

        // Verifique a resposta do servidor e realize a validação do login.
        if (data.success) {
            // Vínculo bem-sucedido
            console.log('Aluno encontrado');
            
            return {
                nomeAluno: data.alunoData.aluno.nome,
                turmaAluno: data.alunoData.aluno.turma,
                numeroAluno: data.alunoData.aluno.numero,
                matriculaAluno: matricula
            }
        } else {
          // Vínculo falhou
          console.error('Erro de autenticação:', data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer o vínculo:', error);
      }
}
export default requerirAlunoData;
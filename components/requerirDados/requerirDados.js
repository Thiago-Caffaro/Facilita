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
            // Aqui pego o nome do aluno e separo conforme os espaços entre cada nome, e pego o primeiro nome
            const nomeFormatado = data.alunoData.aluno.nome.split(" ")[0].toLowerCase();
            return {
                nomeAluno: data.alunoData.aluno.nome,
                primeiroNome: nomeFormatado,
                turmaAluno: data.alunoData.aluno.turma,
                numeroAluno: data.alunoData.aluno.numero,
                emailUsuario: data.userData.user.email,
                senhaUsuario: data.userData.user.senha
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
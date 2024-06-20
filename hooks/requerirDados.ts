import axios from 'axios';
import { AuthContext } from '@/context/auth';
import { useContext } from 'react';
export default function useRequerirAlunoData() {
  const { matricula, email } = useContext(AuthContext);
  const requerirAlunoData = async () => {
    if (matricula) {
      try {
        const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/getAluno', {
            matricula: matricula
        });
        const data = response.data;
        // Verifica a resposta do servidor e realiza a validação do login.
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
          console.log(matricula);
          console.log('Erro de autenticação:', data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer o vínculo:', error);
      }
    } else {
      console.log("Bananas", matricula, email)
    }
    
  }

  return requerirAlunoData;
}

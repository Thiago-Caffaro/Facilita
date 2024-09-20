import axios from 'axios';
import requerirAlunoData from '@/hooks/requerirDados';

export default function useGetGrade() {
  const getGrade = async () => {
    const userData = await requerirAlunoData();
    const turma = (userData as {turmaAluno: any;}).turmaAluno;
    try {
      const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/getGradeHoraria', {
        turma: `${turma}`
      });
      const data = response.data;

      if (data.success) {
        console.log('Grade horária encontrada:', data);
        return data;  // Retornando os dados diretamente
      } else {
        console.log('Erro ao obter a grade horária:', data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return getGrade;
}

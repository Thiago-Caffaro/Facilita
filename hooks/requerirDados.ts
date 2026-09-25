import api from '@/services/api';
import { fetchUserAttributes } from "@/services/auth"
async function requerirAlunoData(requestType: string = 'all') {
    const atributes = await fetchUserAttributes();
    //const user = await getCurrentUser();
    if (requestType == 'id'){
      console.log(JSON.stringify(atributes.sub))
        return atributes.sub;
    } else {
      const response = await api.post('/getAluno', {
        matricula: atributes['custom:matricula']
      });
      const data = await response.data;
        console.log(`Aluno ${data.alunoData.aluno.nome} de matricula: ${atributes['custom:matricula']}`);
        console.log(atributes)
        return {
          nomeAluno: data.alunoData.aluno.nome,
          turmaAluno: data.alunoData.aluno.turma,
          numeroAluno: data.alunoData.aluno.numero,
          emailUsuario: atributes['email'],
          matriculaAluno: atributes['custom:matricula']
        }
    }
    

}
export default requerirAlunoData
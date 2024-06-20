/*import { useContext } from 'react'

import requerirAlunoData from "@/hooks/requerirDados";
import { AuthContext } from '../context/auth.js'

export function useSend() {
  const { matricula } = useContext(AuthContext);

  async function Send(data) {
    // Se matricula estiver preenchida:
    if (matricula){
      // Aqui estou esperando os dados do aluno para verificar se a matricula cadastrada bate com alguma do banco de dados
      const alunoData = await requerirAlunoData(matricula);
      if (alunoData){
        try {
          const response = await fetch('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/addUser', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const dataJson = await response.json();
          console.log('Sucesso:', dataJson);
        } catch (error) {
          console.error('Erro:', error);
        }
      } else {
        console.log('A matrícula fornecida não é válida');
      }
    }
  }

  return Send;
}
*/
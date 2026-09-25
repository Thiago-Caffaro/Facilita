import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { AuthContext } from '@/context/auth';
import { useContext, useEffect } from 'react';

export default function useSetUserData() {
  const { setMatricula, matricula, setEmail, email, setUser, user } = useContext(AuthContext);
  // Atualmente este hook não está sendo utilizado
  async function setUserData() { // Hook para setar os dados do aluno localmente no app para evitar muitas requsições ao backend
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      if (attributes) {
        setMatricula(attributes['custom:matricula']);
        setEmail(attributes.email);
        setUser(currentUser);

        console.log("Atributos: " + JSON.stringify(attributes));
      }

    } catch (error) {
      console.log("Erro ao linkar os dados do aluno e usuário:" + error);
    }
  }

  useEffect(() => {
    // useEffect para logar os valores depois que o estado for atualizado
    if (matricula && email && user) {
      console.log(`Dados guardados:
        matricula: ${matricula},
        email: ${email},
        user: ${JSON.stringify(user)}
      `);
    }
  }, [matricula, email, user]); // Monitora as mudanças nos valores do estado

  return setUserData;
}

import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth"
import { AuthContext } from '@/context/auth';
import { useContext } from 'react';
export default function useSetUserData(){
    const { setMatricula, matricula, setEmail, email, setUser, user } = useContext(AuthContext);
    var atributes:any = {};
    async function setUserData(){
        try {
            await getCurrentUser().then(async (user) =>{
                atributes = await fetchUserAttributes();
                setMatricula(atributes['custom:matricula']);
                setEmail(atributes.email);
                setUser(user);
                console.log("atrubutos:" + JSON.stringify(atributes))
            }).then(() => {
                
                console.log(`Dados guardados:
                    matricula: ${matricula},
                    email: ${email},
                    user: ${user}
                    localMatricula: ${atributes['custom:matricula']}`);
            })
        } catch(error){
            console.log("Erro ao linkar os dados do aluno e usuário:" + error);
        }
    
    } 
    return setUserData;
}

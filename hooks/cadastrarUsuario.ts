import { signUp } from '@aws-amplify/auth';
import { router } from 'expo-router';

import { AuthContext } from '@/context/auth'
import { useContext } from 'react';

import useInfoBox from '@/hooks/alertDialog/infoBox';

export default function useCadastrar(){
    const { setHasAlert, setAlertType } = useContext(AuthContext);
    const infoBox = useInfoBox();

    return async function cadastrar(matricula:string, email:string, senha:string) {
        try {
            await signUp({
                username: email,
                password: senha,
                options: {
                    userAttributes: {
                        'custom:matricula': matricula,
                        'custom:hasCompletedSingup': "incompleto",
                        'custom:position': "aluno"
                    },
                }
                // Envio dos dados do usuário
            })	
            console.log('Primeira etapa concluída com sucesso!');
            router.push("(telasIniciais)/confirmarCadastro");
        } catch (error: any) {
            setHasAlert(true);
            console.log(error);
            setAlertType(infoBox(error.name));
        }
    }
}

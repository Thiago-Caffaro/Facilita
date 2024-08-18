import { AuthContext } from '@/context/auth'
import { useContext } from 'react';

export default function useLimparVariaveisGlobais() { 
    // Atualmente serve para limpar os inputs de senha, email, e matricula
    const {
        setEmail,
        setSenha,
        setMatricula,
    } = useContext(AuthContext);
   
    return function limparVariaveisGlobais(){
        setEmail('');
        setSenha('')
        setMatricula('')
    }
    
}


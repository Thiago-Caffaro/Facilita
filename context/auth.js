import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [matricula, setMatricula] = useState('');
    const [content, setContent] = useState('Initial Content');
    const [sentCode, setSentCode] = useState('');

    return(
        <AuthContext.Provider value={{
            matricula,
            setMatricula,
            content, 
            setContent,
            sentCode,
            setSentCode,

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


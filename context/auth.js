import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [matricula, setMatricula] = useState('');
    const [content, setContent] = useState('Initial Content');

    return(
        <AuthContext.Provider value={{
            matricula,
            setMatricula,
            content, 
            setContent
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


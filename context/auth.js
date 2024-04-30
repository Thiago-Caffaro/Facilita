import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [matricula, setMatricula] = useState('');

    return(
        <AuthContext.Provider value={{matricula, setMatricula}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


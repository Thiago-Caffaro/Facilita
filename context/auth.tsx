import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  matricula?: string;
  setMatricula: (matricula: string) => void;
  content: any;
  setContent: (content: any) => void;
  sentCode: string;
  setSentCode: (sentCode: string) => void;
  user?: any; // Defina o tipo correto para user
  setUser: (user: any) => void;
  email: string;
  setEmail: (email: string) => void;
  senha: string;
  setSenha: (senha: string) => void;
  hasAlert: boolean;
  setHasAlert: (hasAlert: boolean) => void;
  alertType?: React.ReactNode;
  setAlertType: (alertType: React.ReactNode) => void;
  userCode: string;
  setUserCode: (userCode: string) => void;
  tempPassword: string;
  setTempPassword: (tempPassword: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}



const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('Initial Content');
  const [sentCode, setSentCode] = useState('');
  const [user, setUser] = useState<any | undefined>();
  const [senha, setSenha] = useState('');
  const [hasAlert, setHasAlert] = useState(true);
  const [alertType, setAlertType] = useState<React.ReactNode>();
  const [userCode, setUserCode] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  return (
    <AuthContext.Provider
      value={{
        matricula,
        setMatricula,
        content,
        setContent,
        sentCode,
        setSentCode,
        user,
        setUser,
        email,
        setEmail,
        senha,
        setSenha,
        hasAlert,
        setHasAlert, 
        alertType, 
        setAlertType,
        setUserCode,
        userCode,
        tempPassword,
        setTempPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

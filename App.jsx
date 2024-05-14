import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/telasIniciais/login/login';
import Cadastro from './pages/telasIniciais/cadastro/cadastro';
import EnviarCod from './pages/telasIniciais/esqueciSenha/enviarCod/enviarCod';
import EnviarEmail from './pages/telasIniciais/esqueciSenha/enviarEmail/enviarEmail';
import NovaSenha from './pages/telasIniciais/esqueciSenha/novaSenha/novaSenha';
import NovaSenhaSuccess from './pages/telasIniciais/esqueciSenha/novaSenha/novaSenhaSuccess';
import Perfil from './pages/perfil/perfil';
import MainScreen from './pages/mainScreen/mainScreen';

import AuthProvider from './context/auth';

export default function App() {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name="EnviarCod" component={EnviarCod} options={{ headerShown: false }} />
            <Stack.Screen name="EnviarEmail" component={EnviarEmail} options={{ headerShown: false }} />
            <Stack.Screen name="NovaSenha" component={NovaSenha} options={{ headerShown: false }} />
            <Stack.Screen name="NovaSenhaSuccess" component={NovaSenhaSuccess} options={{ headerShown: false }} />
            <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
  );
}

//


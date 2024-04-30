import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Cardapio from './pages/cardápio/cardapio';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import EnviarCod from './pages/esqueciSenha/enviarCod/enviarCod';
import EnviarEmail from './pages/esqueciSenha/enviarEmail/enviarEmail';
import NovaSenha from './pages/esqueciSenha/novaSenha/novaSenha';
import NovaSenhaSuccess from './pages/esqueciSenha/novaSenha/novaSenhaSuccess';
import Perfil from './pages/perfil/perfil';

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
              <Stack.Screen name="Cardapio" component={Cardapio} options={{ headerShown: false }} />
              <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
            </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
  );
}

//


import {StyleSheet, View, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';


export default function App() {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
             
            </Stack.Navigator>
      </NavigationContainer>
  );
}

//


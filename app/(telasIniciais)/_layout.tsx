import { Stack } from "expo-router";
import AuthProvider from "@/context/auth";

export default function telasIniciaisLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="login">
          <Stack.Screen name="login" options={{headerShown: false}} />
          <Stack.Screen name="cadastro" options={{headerShown: false}} />
          <Stack.Screen name="confirmarCadastro" options={{headerShown: false}} />
          <Stack.Screen name="redirectCadastro" options={{headerShown: false}} />
          <Stack.Screen name="(esqueciSenha)" options={{headerShown: false}} />
      </Stack>
    </AuthProvider>
  );
}

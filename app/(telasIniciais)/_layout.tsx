import { Stack } from "expo-router";
import AuthProvider from "@/context/auth";

export default function telasIniciaisLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="login"/>
          <Stack.Screen name="cadastro"  />
          <Stack.Screen name="confirmarCadastro"/>
          <Stack.Screen name="redirectCadastro"/>
          <Stack.Screen name="(esqueciSenha)"  />
      </Stack>
    </AuthProvider>
  );
}

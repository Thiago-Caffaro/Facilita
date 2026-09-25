import { Stack } from "expo-router";

export default function TelasIniciaisLayout() {
  return (
      <Stack initialRouteName="login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="login"/>
          <Stack.Screen name="cadastro"  />
          <Stack.Screen name="confirmarCadastro"/>
          <Stack.Screen name="redirectCadastro"/>
          <Stack.Screen name="(esqueciSenha)"  />
      </Stack>
  );
}

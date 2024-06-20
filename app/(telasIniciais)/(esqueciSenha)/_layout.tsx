import { Stack } from "expo-router";

export default function esqueciSenhaLayout() {
  return (
    <Stack initialRouteName="receberCod">
      <Stack.Screen name="receberCod" options={{headerShown: false}} />
      <Stack.Screen name="enviarCod" options={{headerShown: false}} />
      <Stack.Screen name="novaSenha" options={{headerShown: false}} />
      <Stack.Screen name="redirectSenha" options={{headerShown: false}} />
    </Stack>
  );
}

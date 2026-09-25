import { Stack } from "expo-router";
import AuthProvider from "@/context/auth";

// O AuthProvider fica só aqui na raiz: antes cada grupo de telas criava o seu,
// e cada um guardava um estado diferente (email, alertas...)
export default function RootLayout() {
  return (
    <AuthProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(telasIniciais)" options={{ headerShown: false }} />
          <Stack.Screen name="(mainScreen)" options={{ headerShown: false }} />
        </Stack>
    </AuthProvider>
  );
}

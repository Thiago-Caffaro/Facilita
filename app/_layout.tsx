import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from "@/context/auth";

export default function RootLayout() {
  return (
    <AuthProvider>
    <GestureHandlerRootView>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(telasIniciais)" options={{ headerShown: false }} />
          <Stack.Screen name="(mainScreen)" options={{ headerShown: false }} />
        </Stack>
    </GestureHandlerRootView>
    </AuthProvider>

  );
}

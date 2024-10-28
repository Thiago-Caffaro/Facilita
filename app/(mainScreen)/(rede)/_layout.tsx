import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from "@/context/auth";

export default function RedesLayout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="posts" options={{ headerShown: false }} />
          <Stack.Screen name="createPost" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

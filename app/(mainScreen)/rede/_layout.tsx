import { Stack } from "expo-router";

export default function RedesLayout() {
  return (
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="createPost" options={{ headerShown: false }} />
        </Stack>
  );
}

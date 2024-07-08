import { Tabs } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from "@/context/auth";
export default function MainScreenLayout() {
  return (
    <AuthProvider>
    <GestureHandlerRootView>
        <Tabs initialRouteName="main" >
          <Tabs.Screen name="main" options={{ headerShown: false }}  />
          <Tabs.Screen name="ajuda" options={{ headerShown: false }} />
          <Tabs.Screen name="perfil" options={{ headerShown: false }} />
          <Tabs.Screen name="chat" options={{headerShown: false,  headerStyle: { backgroundColor: '#4CAF50' }}} />
          <Tabs.Screen name="chats/[otherUserId]" options={{headerShown: true, tabBarButton: () => null}} />
        </Tabs>
    </GestureHandlerRootView>
    </AuthProvider>
  );
}

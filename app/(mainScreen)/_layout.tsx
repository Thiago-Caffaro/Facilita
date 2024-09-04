import { Tabs } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from "@/context/auth";
import navBarStyles from "@/styles/navBarStyles";

export default function MainScreenLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
          <Tabs initialRouteName="main" 
            screenOptions={{
          tabBarActiveBackgroundColor: "green",
          tabBarInactiveBackgroundColor: "#429D1E",

          tabBarShowLabel: false, // Para ocultar os rótulos das abas
        }}>
            <Tabs.Screen name="main" options={{ headerShown: false, }} />
            <Tabs.Screen name="ajuda"  options={{ headerShown: false }} />
            <Tabs.Screen name="perfil" options={{ headerShown: false }} />
            <Tabs.Screen name="chat" options={{headerShown: false,  headerStyle: { backgroundColor: '#4CAF50' }}} />
          </Tabs>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

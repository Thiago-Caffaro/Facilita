import { Image }from 'react-native';
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
            <Tabs.Screen name="main" 
            options={{ 
              headerShown: false, 
              tabBarIcon: ({ color, size }) => (
                <Image source={require("@/assets/icons/HomeIcon.png")} style={{ width: 40, height: 40, tintColor: "white" }} />
              )  
            }} />
            <Tabs.Screen name="ajuda"
              options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Image source={require("@/assets/icons/AjudaIcon.png")} style={{ width: 40, height: 40, tintColor: "white" }} />
                )  
              }}/>
            <Tabs.Screen name="perfil" 
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Image source={require("@/assets/icons/PerfilIcon.png")} style={{ width: 30, height: 33, tintColor: "white" }} />
                ) 

               }} />
            <Tabs.Screen name="chat" 
              options={{
                headerShown: false,  
                headerStyle: { backgroundColor: '#4CAF50' },
                tabBarIcon: ({ color, size }) => (
                  <Image source={require("@/assets/icons/SoeSopIcon.png")} style={{ width: 40, height: 40, tintColor: "white" }} />
                ) 
              }} />
          </Tabs>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

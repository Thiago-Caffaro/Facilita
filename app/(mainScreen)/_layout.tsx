import { Image }from 'react-native';
import { Tabs } from "expo-router";

export default function MainScreenLayout() {
  return (
          <Tabs initialRouteName="main" 
            screenOptions={{
              tabBarActiveBackgroundColor: "green",
              tabBarInactiveBackgroundColor: "#429D1E",
              tabBarShowLabel: false, // Para ocultar os rótulos das abas

              
        }}>
          <Tabs.Screen name="perfil" 
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Image source={require("@/assets/icons/PerfilIcon.png")} tintColor="white" style={{ width: 30, height: 33 }} />
                ) 
               }} />
            <Tabs.Screen name="main" 
            options={{ 
              headerShown: false, 
              tabBarIcon: ({ color, size }) => (
                <Image source={require("@/assets/icons/HomeIcon.png")} tintColor="white" style={{ width: 40, height: 40 }} />
              )  
            }} />
            
            <Tabs.Screen name="ajuda"
              options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Image source={require("@/assets/icons/AjudaIcon.png")} tintColor="white" style={{ width: 40, height: 40 }} />
                )  
              }}/>
              <Tabs.Screen name="rede"
              options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Image source={require("@/assets/icons/ChatIcon.png")} tintColor="white" style={{ width: 40, height: 40 }} />
                )  
              }}/>
            
            
          </Tabs>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import RegisterScreen from './src/screens/RegisterScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Registrar') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Histórico') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#6366f1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Registrar" 
            component={RegisterScreen}
            options={{ title: 'Diário de Bem-Estar' }}
          />
          <Tab.Screen 
            name="Histórico" 
            component={HistoryScreen}
            options={{ title: 'Meu Histórico' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


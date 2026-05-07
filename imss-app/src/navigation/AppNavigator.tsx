import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LandingScreen } from '../screens/LandingScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { NewVaccineScreen } from '../screens/NewVaccineScreen';
import { AlertsScreen } from '../screens/AlertsScreen';
import { VaccineSelectionScreen } from '../screens/VaccineSelectionScreen';
import { RapidRegistrationScreen } from '../screens/RapidRegistrationScreen';

export type AppStackParamList = {
  Landing: undefined;
  Search: { mode?: 'register' | 'history' } | undefined;
  Profile: { mode?: 'register' | 'history' } | undefined;
  History: undefined;
  NewVaccine: undefined;
  Alerts: undefined;
  VaccineSelection: undefined;
  RapidRegistration: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#006455',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ title: 'Búsqueda de Paciente' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Perfil del Paciente' }}
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Historial' }}
        />
        <Stack.Screen 
          name="NewVaccine" 
          component={NewVaccineScreen} 
          options={{ title: 'Nueva Aplicación' }}
        />
        <Stack.Screen 
          name="Alerts" 
          component={AlertsScreen} 
          options={{ title: 'Panel de Alertas' }}
        />
        <Stack.Screen 
          name="VaccineSelection" 
          component={VaccineSelectionScreen} 
          options={{ title: 'Selección Vacunas' }}
        />
        <Stack.Screen 
          name="RapidRegistration" 
          component={RapidRegistrationScreen} 
          options={{ title: 'Registro Vacunado' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/AppNavigator';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useAppStore } from '../store/useAppStore';
import { AlertBadge } from '../components/AlertBadge';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Search'>;
  route: RouteProp<AppStackParamList, 'Search'>;
};

export const SearchScreen: React.FC<Props> = ({ navigation, route }) => {
  const mode = route.params?.mode;
  const [nss, setNss] = useState('');
  const [error, setError] = useState('');
  const setActivePatient = useAppStore((state) => state.setActivePatient);

  const handleSearch = () => {
    if (!nss) {
      setError('Por favor ingresa un NSS válido');
      return;
    }
    
    // Mock user found
    setActivePatient({
      nss,
      name: 'Juan Pérez',
      age: 68,
      riskGroups: ['Adulto Mayor (65+)', 'Diabetes'],
    });
    
    navigation.navigate('Profile', { mode });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View className="mb-8 items-center mt-10">
          <Text className="text-3xl font-bold text-imss-green text-center">
            Módulo de Vacunación
          </Text>
          <Text className="text-imss-wine text-base mt-2 text-center">
            IMSS Digital
          </Text>
        </View>

        <View className="mb-6">
          <AlertBadge onPress={() => navigation.navigate('Alerts')} />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
            <Text className="text-xl font-bold text-imss-dark-wine mb-4">
              Buscar Paciente
            </Text>
            
            <CustomInput
              label="Número de Seguridad Social (NSS)"
              placeholder="Ej. 1234567890"
              value={nss}
              onChangeText={(text) => {
                setNss(text);
                setError('');
              }}
              keyboardType="number-pad"
              error={error}
            />
            
            <CustomButton
              title="Buscar Expediente"
              onPress={handleSearch}
              className="mt-4"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

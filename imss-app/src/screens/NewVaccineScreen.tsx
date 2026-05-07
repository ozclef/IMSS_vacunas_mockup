import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useAppStore } from '../store/useAppStore';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'NewVaccine'>;
};

export const NewVaccineScreen: React.FC<Props> = ({ navigation }) => {
  const patient = useAppStore((state) => state.activePatient);
  const [vaccine, setVaccine] = useState('');
  const [lote, setLote] = useState('');
  const [dose, setDose] = useState('');

  const handleSave = () => {
    if (!vaccine || !lote || !dose) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    Alert.alert(
      'Confirmar Registro',
      `¿Registrar aplicación de ${vaccine} para ${patient?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            Alert.alert('Éxito', 'Registro guardado correctamente');
            navigation.navigate('History');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-2xl font-bold text-imss-dark-wine mb-2">
          Nueva Aplicación
        </Text>
        <Text className="text-gray-500 mb-6">Paciente: {patient?.name}</Text>

        <View className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">
          <CustomInput
            label="Vacuna"
            placeholder="Ej. Influenza"
            value={vaccine}
            onChangeText={setVaccine}
          />
          <CustomInput
            label="Lote (COFEPRIS)"
            placeholder="Ej. L-123456"
            value={lote}
            onChangeText={setLote}
          />
          <CustomInput
            label="Dosis"
            placeholder="Ej. Única"
            value={dose}
            onChangeText={setDose}
          />
          
          <CustomButton
            title="Validar y Guardar"
            onPress={handleSave}
            className="mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

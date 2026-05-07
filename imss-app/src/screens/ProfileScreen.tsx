import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../store/useAppStore';
import { CustomButton } from '../components/CustomButton';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Profile'>;
  route: RouteProp<AppStackParamList, 'Profile'>;
};

export const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const mode = route.params?.mode;
  const patient = useAppStore((state) => state.activePatient);

  if (!patient) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-imss-wine">Paciente no encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <Text className="text-2xl font-bold text-imss-dark-wine mb-2">
            {patient.name}
          </Text>
          <Text className="text-imss-green font-semibold mb-4 text-lg">
            NSS: {patient.nss}
          </Text>
          
          <View className="flex-row items-center mb-2">
            <Text className="font-semibold text-gray-700 w-24">Edad:</Text>
            <Text className="text-gray-600">{patient.age} años</Text>
          </View>
          
          <View className="mt-4">
            <Text className="font-semibold text-gray-700 mb-2">Grupos de Riesgo Detectados:</Text>
            <View className="flex-row flex-wrap">
              {patient.riskGroups.map((group, index) => (
                <View key={index} className="bg-red-100 rounded-full px-3 py-1 mr-2 mb-2">
                  <Text className="text-red-800 text-xs font-bold">{group}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="space-y-4">
          {mode === 'history' ? (
            <CustomButton
              title="Ver Historial de Vacunación"
              onPress={() => navigation.navigate('History')}
            />
          ) : (
            <>
              <CustomButton
                title="Registrar Nueva Vacuna"
                onPress={() => navigation.navigate('NewVaccine')}
              />
              <CustomButton
                title="Ver Historial de Vacunación"
                onPress={() => navigation.navigate('History')}
                variant="outline"
                className="mt-4"
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

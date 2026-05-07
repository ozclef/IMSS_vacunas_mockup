import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { CustomButton } from '../components/CustomButton';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Alerts'>;
};

const GLOBAL_ALERTS = [
  { id: '1', title: 'Lote de vacunas defect...', lot: 'LV-1234', location: 'N/A', ageRange: 'N/A', details: 'El lote LV-1234 de Influenza ha sido reportado con anomalías de temperatura. Se aconseja cuarentena inmediata y no aplicación.' },
  { id: '2', title: 'Brote de Influenza altm...', lot: 'N/A', location: 'Celaya, Guanajuato', ageRange: 'N/A', details: 'Se ha detectado un brote inusual de Influenza en la región. Se recomienda reforzar la vacunación en grupos vulnerables de la localidad.' },
  { id: '3', title: 'Campaña nacional de...', lot: 'N/A', location: 'N/A', ageRange: '50-99', details: 'Campaña nacional de vacunación para adultos mayores y vulnerables en curso del 30 de Abril hasta el 13 de Mayo en todos los centros de atención de salud pública de la república. Asegúrese de vacunarse si pertenece a uno de los siguientes grupos de riesgo: ...' },
  { id: '4', title: '...', lot: '...', location: '...', ageRange: '...', details: '' },
  { id: '5', title: '...', lot: '...', location: '...', ageRange: '...', details: '' },
];

export const AlertsScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const activeAlert = GLOBAL_ALERTS.find(a => a.id === selectedAlertId);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-imss-green p-6 flex-row items-center">
        <Text className="text-3xl font-extrabold text-white flex-1 text-center">Alertas Generales</Text>
      </View>
      
      <ScrollView contentContainerStyle={{ padding: 24, flexDirection: 'row' }}>
        
        {/* LEFT COLUMN: Table */}
        <View className="flex-[3] mr-4">
          <View className="border border-gray-400 rounded overflow-hidden">
            <View className="flex-row bg-imss-wine p-3 border-b border-gray-400">
              <Text className="flex-[2] text-white font-bold text-center">Alerta</Text>
              <Text className="flex-1 text-white font-bold text-center border-l border-gray-400 pl-2">Lote</Text>
              <Text className="flex-[2] text-white font-bold text-center border-l border-gray-400 pl-2">Localidad</Text>
              <Text className="flex-[1.5] text-white font-bold text-center border-l border-gray-400 pl-2">Rango de Edad</Text>
            </View>

            {GLOBAL_ALERTS.map((alert, index) => (
              <TouchableOpacity 
                key={alert.id}
                onPress={() => setSelectedAlertId(alert.id)}
                className={`flex-row p-3 border-b border-gray-300 ${selectedAlertId === alert.id ? 'bg-imss-cream/50' : (index % 2 === 0 ? 'bg-white' : 'bg-gray-100')}`}
              >
                <Text className={`flex-[2] text-center font-bold ${selectedAlertId === alert.id ? 'text-imss-dark-wine' : 'text-gray-700'}`}>{alert.title}</Text>
                <Text className="flex-1 text-center border-l border-gray-300 pl-2 text-gray-700 font-semibold">{alert.lot}</Text>
                <Text className="flex-[2] text-center border-l border-gray-300 pl-2 text-gray-700 font-semibold">{alert.location}</Text>
                <Text className="flex-[1.5] text-center border-l border-gray-300 pl-2 text-gray-700 font-semibold">{alert.ageRange}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View className="mt-6 items-center">
            <CustomButton 
              title="Ver detalles" 
              className="w-64 bg-imss-green" 
              onPress={() => {}} // Could scroll to right panel or open modal on small screens
            />
          </View>
        </View>

        {/* RIGHT COLUMN: Detail Panel */}
        <View className="flex-[2] ml-4 bg-gray-200 rounded-2xl p-6 border border-gray-300 shadow-sm">
          
          {activeAlert && activeAlert.details ? (
            <>
              <View className="border-2 border-gray-500 rounded-lg p-4 mb-6 bg-gray-300">
                <Text className="text-gray-100 font-bold text-lg leading-6 text-justify" style={{ color: '#FDFEFE', textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2 }}>
                  {activeAlert.details}
                </Text>
              </View>

              <View className="flex-row items-center mb-6">
                <View className="bg-imss-green rounded-xl px-4 py-2 self-start flex-1 mr-4">
                  <Text className="text-white font-extrabold text-xl">Destinatarios</Text>
                </View>
                <View className="flex-1">
                  <CustomButton 
                    title="Envío Masivo" 
                    onPress={() => alert('Mensaje enviado exitosamente a los destinatarios.')}
                    className="w-full bg-imss-green mb-3"
                  />
                  <CustomButton 
                    title="Cancelar" 
                    onPress={() => setSelectedAlertId(null)}
                    className="w-full bg-imss-wine"
                  />
                </View>
              </View>

              <Text className="text-gray-700 font-bold text-sm">
                El siguiente mensaje será enviado a la población en general que cumpla con los siguientes requisitos:
              </Text>
              <Text className="text-gray-700 font-bold text-sm mt-1">
                * {activeAlert.ageRange !== 'N/A' && activeAlert.ageRange !== '...' ? `Rango de edad entre ${activeAlert.ageRange.replace('-', ' y ')} años` : 'Todos los rangos de edad'}
              </Text>
              {activeAlert.location !== 'N/A' && activeAlert.location !== '...' && (
                <Text className="text-gray-700 font-bold text-sm mt-1">
                  * Residentes de {activeAlert.location}
                </Text>
              )}
            </>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 text-lg text-center font-bold">Seleccione una alerta para ver los detalles y programar el envío masivo.</Text>
            </View>
          )}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

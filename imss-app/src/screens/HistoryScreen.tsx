import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { MOCK_PATIENTS } from '../data/mockData';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'History'>;
};

export const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [search, setSearch] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const activePatient = selectedPatientId ? MOCK_PATIENTS[selectedPatientId] : null;

  // Autocomplete filtering logic
  const filteredNssList = useMemo(() => {
    if (!search) return [];
    const keys = Object.keys(MOCK_PATIENTS);
    return keys.filter(k => k.includes(search)).slice(0, 5); // show up to 5 matching
  }, [search]);

  const isSearchExact = !!MOCK_PATIENTS[search];
  
  const defaultNssList = Object.keys(MOCK_PATIENTS).slice(0, 5);
  const dropdownList = search.length === 0 ? defaultNssList : filteredNssList;
  const shouldRenderDropdown = !activePatient && (search.length === 0 || filteredNssList.length > 0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6 pb-2 border-b border-gray-200">
        <Text className="text-3xl font-extrabold text-imss-dark-wine">Historial</Text>
      </View>
      
      <ScrollView contentContainerStyle={{ padding: 24, flexDirection: isMobile ? 'column' : 'row' }} keyboardShouldPersistTaps="handled">
        
        {/* LEFT COLUMN: Search & History */}
        <View className={`flex-1 ${isMobile ? 'mb-6' : 'mr-4'}`}>
          {/* Search Box */}
          <View className="mb-6 relative z-30">
            <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-2">
              <Text className="text-white font-bold">CURP ó NSS</Text>
            </View>
            <CustomInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
                setSelectedPatientId(null);
                setSelectedAlertId(null);
              }}
              placeholder="Ej: 1111111111"
              keyboardType="number-pad"
            />
            {shouldRenderDropdown && !activePatient && (
              <View className="bg-white border border-gray-300 rounded-lg max-h-64 mt-1 overflow-hidden shadow-md absolute w-full" style={{top: 75}}>
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                  {dropdownList.map(nssKey => (
                    <TouchableOpacity 
                      key={nssKey} 
                      className="p-3 border-b border-gray-200 flex-row justify-between"
                      onPress={() => {
                        setSearch(nssKey);
                        setSelectedPatientId(nssKey);
                        setSelectedAlertId(null);
                      }}
                    >
                      <Text className="text-gray-800 font-bold">{nssKey}</Text>
                      <Text className="text-xs text-gray-500">{MOCK_PATIENTS[nssKey].name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Historial de Vacunacion Table */}
          {activePatient && (
            <View>
              <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-2">
                <Text className="text-white font-bold">Historial de Vacunación</Text>
              </View>
              <View className="border border-gray-300 rounded-lg overflow-hidden">
                <View className="flex-row bg-imss-wine p-3">
                  <Text className="flex-[1.5] text-white font-bold">Evento</Text>
                  <Text className="flex-[2] text-white font-bold">Detalles</Text>
                  <Text className="flex-1 text-white font-bold">Fecha</Text>
                </View>
                {activePatient.history && activePatient.history.length > 0 ? (
                  activePatient.history.map((h: any, i: number) => (
                    <View key={h.id} className={`flex-row p-3 border-t border-gray-300 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                      <Text className="flex-[1.5] font-bold text-gray-800">{h.title || h.vaccine}</Text>
                      <Text className="flex-[2] text-gray-600 text-xs">{h.desc || `Lote: ${h.lot}, Unidad: ${h.location}`}</Text>
                      <Text className="flex-1 text-gray-600 text-xs">{h.date || 'Sin fecha'}</Text>
                    </View>
                  ))
                ) : (
                  <View className="p-4 bg-white"><Text className="text-center text-gray-500">Sin registros</Text></View>
                )}
              </View>
            </View>
          )}
        </View>

        {/* RIGHT COLUMN: Info & Alerts */}
        <View className={`flex-1 bg-gray-200 rounded-2xl p-4 border border-gray-300 ${isMobile ? '' : 'ml-4'}`}>
          
          {/* Info Paciente */}
          <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-4">
            <Text className="text-white font-bold">Info Paciente</Text>
          </View>
          
          <View className="flex-row mb-6">
            <View className="flex-[2] mr-2">
              <Text className="text-gray-600 font-bold mb-1">Nombre</Text>
              <View className="bg-gray-300 rounded p-2 border border-gray-400">
                <Text className="font-bold">{activePatient ? activePatient.name : '-'}</Text>
              </View>
            </View>
            <View className="flex-1 mr-2">
              <Text className="text-gray-600 font-bold mb-1">Edad</Text>
              <View className="bg-gray-300 rounded p-2 border border-gray-400">
                <Text className="font-bold">{activePatient ? activePatient.age : '-'}</Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-gray-600 font-bold mb-1">Sexo</Text>
              <View className="bg-gray-300 rounded p-2 border border-gray-400">
                <Text className="font-bold">{activePatient ? activePatient.sex : '-'}</Text>
              </View>
            </View>
          </View>

          {/* Seleccionar Alertas */}
          <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-4">
            <Text className="text-white font-bold">Seleccionar Alertas</Text>
          </View>

          <View className="bg-gray-300 flex-1 rounded-lg p-3 mb-6 flex-row flex-wrap">
            {activePatient && activePatient.alerts && activePatient.alerts.length > 0 ? (
              activePatient.alerts.map((alert: any) => (
                <TouchableOpacity 
                  key={alert.id} 
                  onPress={() => setSelectedAlertId(selectedAlertId === alert.id ? null : alert.id)}
                  className={`p-3 rounded-lg w-full mb-2 border-2 ${selectedAlertId === alert.id ? 'bg-imss-wine border-imss-dark-wine' : 'bg-white border-gray-400'}`}
                >
                  <Text className={`font-bold mb-1 ${selectedAlertId === alert.id ? 'text-white' : 'text-gray-800'}`}>{alert.title}</Text>
                  <Text className={`text-xs ${selectedAlertId === alert.id ? 'text-gray-200' : 'text-gray-600'}`}>{alert.description}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-500 mt-4 w-full text-center">
                {activePatient ? 'El paciente no tiene alertas.' : 'Seleccione un paciente para ver alertas.'}
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View className="items-center">
            <CustomButton 
              title="Mandar Alertas" 
              onPress={() => alert('Alertas enviadas exitosamente al paciente.')}
              className="w-48 mb-3"
              disabled={!activePatient || !selectedAlertId}
            />
            <CustomButton 
              title="Cancelar" 
              onPress={() => navigation.goBack()}
              className="w-48 bg-imss-wine"
            />
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../store/useAppStore';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { MOCK_PATIENTS } from '../data/mockData';
import { AlertBadge } from '../components/AlertBadge';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'RapidRegistration'>;
};

export const RapidRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [nss, setNss] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScanSuccessVisible, setIsScanSuccessVisible] = useState(false);

  const sessionData = useAppStore((state) => state.sessionData);

  const matchedPatient = MOCK_PATIENTS[nss];
  const isPatientFound = !!matchedPatient || nss.length >= 10;

  // Autocomplete filtering logic for NSS
  const filteredNssList = useMemo(() => {
    if (!nss) return [];
    const keys = Object.keys(MOCK_PATIENTS);
    return keys.filter(k => k.includes(nss)).slice(0, 5); // show up to 5 matching
  }, [nss]);

  const isNssExact = !!MOCK_PATIENTS[nss];
  
  const showDropdown = nss.length > 0 && !isNssExact;
  // If empty, show first 3
  const defaultNssList = Object.keys(MOCK_PATIENTS).slice(0, 3);
  const dropdownList = nss.length === 0 ? defaultNssList : filteredNssList;
  const shouldRenderDropdown = !isNssExact && (nss.length === 0 || filteredNssList.length > 0);

  const handleConfirm = () => {
    // Save vaccine to DB mock
    setIsModalVisible(true);
  };

  const handleNextPatient = () => {
    setIsModalVisible(false);
    setNss('');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          
          <View className="mb-6 bg-white p-4 rounded-xl border border-gray-300 shadow-sm">
            <Text className="text-gray-500 font-bold mb-1">Sesión Activa:</Text>
            <Text className="font-semibold text-lg text-imss-dark-wine">{sessionData?.vaccine}</Text>
            <Text className="text-gray-600">{sessionData?.location} | Lote: {sessionData?.lot}</Text>
          </View>

          <Text className="text-3xl font-extrabold text-black mb-6 text-center">Registro Rápido</Text>

          {/* Escanear QR Button */}
          <TouchableOpacity 
            className="bg-imss-cream p-4 rounded-xl shadow-sm mb-6 flex-row items-center justify-center border-2 border-imss-green"
            activeOpacity={0.8}
            onPress={() => setIsScanSuccessVisible(true)}
          >
            <Image 
              source={require('../../assets/imss-digital.png')} 
              style={{ width: 40, height: 40, marginRight: 12 }} 
              resizeMode="contain" 
            />
            <Text className="text-imss-dark-wine font-extrabold text-lg">Escanear QR IMSS Digital</Text>
          </TouchableOpacity>

          {/* Buscador NSS */}
          <View className="mb-6 relative z-30">
            <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-2 flex-row items-center">
              <Image source={require('../../assets/magnifying-glass.png')} style={{width: 14, height: 14, tintColor: 'white', marginRight: 4}} />
              <Text className="text-white font-bold">NSS manual</Text>
            </View>
            <CustomInput
              value={nss}
              onChangeText={setNss}
              placeholder="Ej: 1111111111"
              keyboardType="number-pad"
            />
            {shouldRenderDropdown && (
              <View className="bg-white border border-gray-300 rounded-lg max-h-48 mt-1 overflow-hidden shadow-md">
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                  {dropdownList.map(nssKey => (
                    <TouchableOpacity 
                      key={nssKey} 
                      className="p-3 border-b border-gray-200 flex-row justify-between"
                      onPress={() => setNss(nssKey)}
                    >
                      <Text className="text-gray-800 font-bold">{nssKey}</Text>
                      <Text className="text-xs text-gray-500">{MOCK_PATIENTS[nssKey].name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View className="flex-1 relative z-10">
            <View className="bg-white border border-gray-300 rounded-2xl p-4 flex-1">
              <Text className="text-lg font-extrabold text-imss-dark-wine border-b border-gray-200 pb-2 mb-4">
                Validación de Expediente
              </Text>
              
              {isPatientFound ? (
                <>
                  <Text className="text-sm font-bold text-gray-700 mb-2">
                    Paciente: {matchedPatient ? matchedPatient.name : 'Paciente de Prueba'}
                  </Text>
                  
                  {matchedPatient && matchedPatient.alerts && matchedPatient.alerts.length > 0 ? (
                    matchedPatient.alerts.map((alert: any) => (
                      <View key={alert.id} className={`p-3 rounded-lg border-2 mb-4 ${alert.type === 'danger' ? 'bg-imss-cream border-red-400' : 'bg-gray-100 border-yellow-500'}`}>
                        <Text className={`font-bold mb-1 ${alert.type === 'danger' ? 'text-imss-dark-wine' : 'text-yellow-800'}`}>{alert.title}</Text>
                        <Text className={`text-xs ${alert.type === 'danger' ? 'text-black' : 'text-gray-700'}`}>{alert.description}</Text>
                      </View>
                    ))
                  ) : (
                    <View className="bg-imss-green/20 p-3 rounded-lg border-2 border-imss-green mb-4">
                      <Text className="font-bold text-imss-dark-wine mb-1">Sin Alertas Críticas</Text>
                      <Text className="text-xs text-black">El paciente no tiene alertas de esquema incompleto o vencido en este momento.</Text>
                    </View>
                  )}
                </>
              ) : (
                <Text className="text-gray-400 text-center mt-10">Ingrese un NSS para ver alertas</Text>
              )}
            </View>
          </View>

          <View className="flex-row justify-between mt-6 relative z-10">
            <CustomButton
              title="Terminar Captura"
              onPress={() => navigation.navigate('Landing')}
              className="w-[48%] bg-imss-wine"
            />
            <CustomButton
              title="Confirmar"
              onPress={handleConfirm}
              className="w-[48%]"
              disabled={!isPatientFound}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal for Save */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center px-4">
          <View className="bg-white rounded-3xl p-6 w-full items-center shadow-lg">
            <View className="w-16 h-16 bg-imss-green rounded-full justify-center items-center mb-4">
              <Text className="text-white text-3xl font-bold">✓</Text>
            </View>
            <Text className="text-2xl font-extrabold text-imss-dark-wine mb-2 text-center">¡Registro Exitoso!</Text>
            <Text className="text-gray-600 text-center mb-6">
              La vacuna se ha guardado correctamente en el Expediente Clínico de {matchedPatient ? matchedPatient.name : 'NSS ' + nss}.
            </Text>
            <CustomButton
              title="Siguiente Paciente"
              onPress={handleNextPatient}
              className="w-full"
            />
          </View>
        </View>
      </Modal>

      {/* Success Modal for Scan */}
      <Modal visible={isScanSuccessVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center px-4">
          <View className="bg-white rounded-3xl p-6 w-full items-center shadow-lg">
            <View className="w-16 h-16 bg-imss-green rounded-full justify-center items-center mb-4">
              <Image source={require('../../assets/imss-digital.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
            </View>
            <Text className="text-2xl font-extrabold text-imss-dark-wine mb-2 text-center">Escaneo Exitoso</Text>
            <Text className="text-gray-600 text-center mb-6">
              Se ha validado la identidad del paciente a través de IMSS Digital.
            </Text>
            <CustomButton
              title="Continuar"
              onPress={() => {
                setIsScanSuccessVisible(false);
                setNss('2222222222'); // Auto-fill with a mock patient
              }}
              className="w-full bg-imss-green"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

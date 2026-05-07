import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { useAppStore } from '../store/useAppStore';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { VACCINES_CATALOG, COFEPRIS_LOTS, LOCATIONS } from '../data/mockData';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'VaccineSelection'>;
};

export const VaccineSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [lot, setLot] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const setSessionData = useAppStore((state) => state.setSessionData);

  // Autocomplete filtering logic
  const filteredLocations = useMemo(() => {
    if (!location) return [];
    return LOCATIONS.filter(l => l.name.toLowerCase().includes(location.toLowerCase()));
  }, [location]);

  const filteredVaccines = useMemo(() => {
    if (!vaccine) return [];
    return VACCINES_CATALOG.filter(v => v.name.toLowerCase().includes(vaccine.toLowerCase()));
  }, [vaccine]);

  const filteredLots = useMemo(() => {
    if (!lot) return [];
    return COFEPRIS_LOTS.filter(l => l.lotNumber.toLowerCase().includes(lot.toLowerCase()));
  }, [lot]);

  // Check if exactly matching
  const isLocationExact = useMemo(() => LOCATIONS.some(l => l.name === location), [location]);
  const isVaccineExact = useMemo(() => VACCINES_CATALOG.some(v => v.name === vaccine), [vaccine]);
  const isLotExact = useMemo(() => COFEPRIS_LOTS.some(l => l.lotNumber === lot), [lot]);

  const handleContinue = () => {
    if (!isLocationExact) {
      setErrorMsg('Por favor seleccione una UMF o Recinto válido de la lista.');
      return;
    }
    if (!isVaccineExact) {
      setErrorMsg('Por favor seleccione una Vacuna válida de la lista.');
      return;
    }
    if (!isLotExact) {
      setErrorMsg('Por favor seleccione un Lote válido de la lista.');
      return;
    }
    
    // Check if lot is quarantined
    const selectedLot = COFEPRIS_LOTS.find(l => l.lotNumber === lot);
    if (selectedLot?.status === 'En Cuarentena') {
      setErrorMsg('ERROR CRÍTICO: El lote seleccionado está En Cuarentena por COFEPRIS y no puede ser utilizado.');
      return;
    }

    setErrorMsg('');
    setSessionData({ location, vaccine, lot });
    navigation.navigate('RapidRegistration');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Text className="text-2xl font-extrabold text-black mb-8 text-center">Selección Vacunas</Text>

          {/* Ubicación */}
          <View className="mb-6 relative z-30">
            <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-2">
              <Text className="text-white font-bold">UMF o Recinto</Text>
            </View>
            <CustomInput
              value={location}
              onChangeText={(t) => { setLocation(t); setErrorMsg(''); }}
              placeholder="Buscar ubicación..."
            />
            {(!isLocationExact) && (location.length === 0 || filteredLocations.length > 0) && (
              <View className="bg-white border border-gray-300 rounded-lg max-h-48 mt-1 overflow-hidden">
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                  {(location.length === 0 ? LOCATIONS.slice(0, 3) : filteredLocations).map(loc => (
                    <TouchableOpacity 
                      key={loc.id} 
                      className="p-3 border-b border-gray-200"
                      onPress={() => setLocation(loc.name)}
                    >
                      <Text className="text-gray-800">{loc.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            {location.length > 0 && !isLocationExact && filteredLocations.length === 0 && (
              <Text className="text-red-500 text-xs mt-1">Ubicación no encontrada en el catálogo.</Text>
            )}
          </View>

          {/* Vacuna */}
          <View className="mb-6 relative z-20">
            <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-2">
              <Text className="text-white font-bold">Vacuna</Text>
            </View>
            <CustomInput
              value={vaccine}
              onChangeText={(t) => { setVaccine(t); setErrorMsg(''); }}
              placeholder="Buscar vacuna..."
            />
            {(!isVaccineExact) && (vaccine.length === 0 || filteredVaccines.length > 0) && (
              <View className="bg-white border border-gray-300 rounded-lg max-h-48 mt-1 overflow-hidden">
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                  {(vaccine.length === 0 ? VACCINES_CATALOG.slice(0, 3) : filteredVaccines).map(v => (
                    <TouchableOpacity 
                      key={v.id} 
                      className="p-3 border-b border-gray-200 flex-row justify-between"
                      onPress={() => setVaccine(v.name)}
                    >
                      <Text className="text-gray-800">{v.name}</Text>
                      <Text className="text-xs text-gray-500">Prioridad {v.priority}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Lote */}
          <View className="mb-6 relative z-10">
            <View className="bg-imss-green rounded-full px-4 py-1 self-start mb-2">
              <Text className="text-white font-bold">Lote</Text>
            </View>
            <CustomInput
              value={lot}
              onChangeText={(t) => { setLot(t); setErrorMsg(''); }}
              placeholder="Buscar lote..."
            />
            {(!isLotExact) && (lot.length === 0 || filteredLots.length > 0) && (
              <View className="bg-white border border-gray-300 rounded-lg max-h-48 mt-1 overflow-hidden">
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                  {(lot.length === 0 ? COFEPRIS_LOTS.slice(0, 3) : filteredLots).map(l => (
                    <TouchableOpacity 
                      key={l.id} 
                      className="p-3 border-b border-gray-200 flex-row justify-between"
                      onPress={() => setLot(l.lotNumber)}
                    >
                      <Text className="text-gray-800">{l.lotNumber}</Text>
                      <Text className={`text-xs font-bold ${l.status === 'Liberado' ? 'text-imss-green' : 'text-red-500'}`}>
                        {l.status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {errorMsg ? (
            <View className="bg-red-100 border border-red-400 p-3 rounded-lg mb-4">
              <Text className="text-red-700 font-bold text-center">{errorMsg}</Text>
            </View>
          ) : null}

          <View className="mt-auto items-end pt-4">
            <CustomButton
              title="Continuar"
              onPress={handleContinue}
              className="w-40"
              disabled={!location || !vaccine || !lot}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

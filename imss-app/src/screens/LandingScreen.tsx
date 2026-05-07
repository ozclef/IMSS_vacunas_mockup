import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Landing'>;
};

export const LandingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-imss-green px-4 py-6 pt-10 flex-row justify-between items-center">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            {/* Omit back arrow as this is the root screen, or could add an empty view for spacing */}
            <Text className="text-white text-3xl font-extrabold tracking-wider">CENTINELA</Text>
          </View>
          <Text className="text-white text-base font-semibold">
            Sistema Nacional de Gestión de Vacunas
          </Text>
        </View>
        <Image 
          source={require('../../assets/imss-logo-small.png')} 
          style={{ width: 50, height: 60 }} 
          resizeMode="contain" 
        />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 40, alignItems: 'center' }}>
        
        {/* Button 1: Registrar Vacuna */}
        <View className="items-center mb-10">
          <TouchableOpacity
            className="bg-imss-cream rounded-3xl w-40 h-40 justify-center items-center shadow-md mb-4"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VaccineSelection')}
          >
            <Image 
              source={require('../../assets/writing.png')} 
              style={{ width: 80, height: 80, tintColor: '#006455' }} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-black font-extrabold text-xl">Registrar Vacuna</Text>
        </View>

        {/* Button 2: Revisar Historial */}
        <View className="items-center mb-10">
          <TouchableOpacity
            className="bg-imss-cream rounded-3xl w-40 h-40 justify-center items-center shadow-md mb-4"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('History')}
          >
            <Image 
              source={require('../../assets/magnifying-glass.png')} 
              style={{ width: 80, height: 80, tintColor: '#006455' }} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-black font-extrabold text-xl">Revisar Historial</Text>
        </View>

        {/* Button 3: Alertas */}
        <View className="items-center">
          <TouchableOpacity
            className="bg-imss-cream rounded-3xl w-40 h-40 justify-center items-center shadow-md mb-4"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Alerts')}
          >
            <Image 
              source={require('../../assets/siren.png')} 
              style={{ width: 80, height: 80, tintColor: '#006455' }} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-black font-extrabold text-xl">Alertas</Text>
        </View>

      </ScrollView>

      {/* Footer */}
      <View className="bg-imss-green h-12 w-full" />
    </SafeAreaView>
  );
};

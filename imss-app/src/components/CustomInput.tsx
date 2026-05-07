import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { COLORS } from '../constants/theme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {label ? (
        <Text className="text-imss-dark-wine font-semibold mb-1">{label}</Text>
      ) : null}
      <TextInput
        className={`bg-gray-100 px-4 py-3 rounded-lg border border-gray-300 text-black ${
          error ? 'border-red-500' : 'focus:border-imss-green'
        }`}
        placeholderTextColor={COLORS.darkGray}
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

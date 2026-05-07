import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  className = '',
  ...props
}) => {
  let baseStyle = 'py-3 px-6 rounded-lg items-center justify-center flex-row';
  let textStyle = 'font-bold text-base';

  switch (variant) {
    case 'primary':
      baseStyle += ' bg-imss-green';
      textStyle += ' text-white';
      break;
    case 'secondary':
      baseStyle += ' bg-imss-wine';
      textStyle += ' text-white';
      break;
    case 'danger':
      baseStyle += ' bg-red-600';
      textStyle += ' text-white';
      break;
    case 'outline':
      baseStyle += ' border-2 border-imss-green bg-transparent';
      textStyle += ' text-imss-green';
      break;
  }

  return (
    <TouchableOpacity
      className={`${baseStyle} ${className} ${props.disabled ? 'opacity-50' : ''}`}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.green : COLORS.white} />
      ) : (
        <Text className={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

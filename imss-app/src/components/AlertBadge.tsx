import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export const AlertBadge: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const alerts = useAppStore((state) => state.alerts);
  const count = alerts.length;

  if (count === 0) return null;

  return (
    <TouchableOpacity
      className="bg-imss-cream px-3 py-2 rounded-full flex-row items-center justify-center self-start"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className="text-imss-dark-wine font-bold text-sm">
        {count} {count === 1 ? 'Alerta Pendiente' : 'Alertas Pendientes'}
      </Text>
    </TouchableOpacity>
  );
};

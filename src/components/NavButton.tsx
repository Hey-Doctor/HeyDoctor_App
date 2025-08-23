// components/NavButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PageName = keyof RootStackParamList;

interface NavButtonProps {
  title?: string;
  destination: PageName;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({
  title,
  destination,
  className = '',
  textClassName = '',
  disabled = false,
  onPress,
  children
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    if (disabled) return;
    
    if (onPress) {
      onPress();
    }
    
    navigation.navigate(destination as any);
  };

  return (
    <TouchableOpacity
      className={`${className} ${disabled ? 'opacity-50' : ''}`}
      onPress={handlePress}
      disabled={disabled}
    >
      {children ? (
        children
      ) : (
        <Text className={textClassName}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
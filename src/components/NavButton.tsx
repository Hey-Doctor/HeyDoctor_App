// components/NavButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  RootStackParamList,
  TabParamList,
} from '~/types/navigation';
import type { NavigatorScreenParams } from '@react-navigation/native';

type RootNav = NativeStackNavigationProp<RootStackParamList>;

type ToTab = {
  tab: keyof TabParamList;    // 'LocationTab' | 'HomeTab' | ...
  screen?: string;            // 스택 내부 스크린 이름(있으면)
  params?: Record<string, any>;
};

interface NavButtonProps {
  title?: string;
  destination?: keyof RootStackParamList; // 루트 이동(비권장)
  toTab?: ToTab;                           // ✅ 권장(탭 유지)
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({
  title,
  destination,
  toTab,
  className = '',
  textClassName = '',
  disabled = false,
  onPress,
  children,
}) => {
  const navigation = useNavigation<RootNav>();

  const handlePress = () => {
    if (disabled) return;
    onPress?.();

    if (toTab) {
      // 👉 TabParamList로 향하는 정적 파라미터 객체를 한 번 만들고
      //    NavigatorScreenParams<TabParamList>로 단언해준다.
      const toMainTabs = (
        toTab.screen
          ? { screen: toTab.tab, params: { screen: toTab.screen, params: toTab.params } }
          : { screen: toTab.tab }
      ) as NavigatorScreenParams<TabParamList>;

      navigation.navigate('MainTabs', toMainTabs);
      return;
    }

    if (destination) {
      navigation.navigate(destination as any);
    }
  };

  return (
    <TouchableOpacity
      className={`${className} ${disabled ? 'opacity-50' : ''}`}
      onPress={handlePress}
      disabled={disabled}
    >
      {children ?? <Text className={textClassName}>{title}</Text>}
    </TouchableOpacity>
  );
};
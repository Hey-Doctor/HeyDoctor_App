import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { height: screenHeight } = Dimensions.get('window');

export type BottomSheetState = 'collapsed' | 'half';

interface BottomSheetProps {
  initialState?: BottomSheetState;
  collapsedHeight?: number;
  halfHeightPercentage?: number;
  onStateChange?: (state: BottomSheetState) => void;
  children?: React.ReactNode;
  enableBackdrop?: boolean;
}

export default function BottomSheet({
  initialState = 'collapsed',
  collapsedHeight = 35,
  halfHeightPercentage = 0.35,
  onStateChange,
  children,
  enableBackdrop = true,
}: BottomSheetProps) {
  
  const COLLAPSED_HEIGHT = collapsedHeight;
  const HALF_HEIGHT = screenHeight * halfHeightPercentage;

  const COLLAPSED_POSITION = screenHeight - COLLAPSED_HEIGHT;
  const HALF_POSITION = screenHeight - HALF_HEIGHT;

  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>(initialState);
  
  const getInitialPosition = () => {
    switch (initialState) {
      case 'half': return HALF_POSITION;
      default: return COLLAPSED_POSITION;
    }
  };

  const translateY = useSharedValue(getInitialPosition());

  const moveToPosition = (state: BottomSheetState) => {
    let targetPosition;
    
    switch (state) {
      case 'collapsed':
        targetPosition = COLLAPSED_POSITION;
        break;
      case 'half':
        targetPosition = HALF_POSITION;
        break;
    }

    translateY.value = withSpring(targetPosition, { 
      damping: 15,
      stiffness: 100
    });
    
    setBottomSheetState(state);
    onStateChange?.(state);
  };

  let startY = 0;
  
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startY = translateY.value;
    })
    .onUpdate((event) => {
      const newY = startY + event.translationY;
      
      if (newY < HALF_POSITION) {
        const overshoot = HALF_POSITION - newY;
        translateY.value = HALF_POSITION - overshoot * 0.3;
      } else if (newY > COLLAPSED_POSITION) {
        const overshoot = newY - COLLAPSED_POSITION;
        translateY.value = COLLAPSED_POSITION + overshoot * 0.3;
      } else {
        translateY.value = newY;
      }
    })
    .onEnd((event) => {
      const currentY = translateY.value;
      const velocity = event.velocityY;
      const actualDragDistance = Math.abs(currentY - startY);
      
      if (actualDragDistance < 30) {
        if (startY >= COLLAPSED_POSITION - 10) {
          runOnJS(moveToPosition)('collapsed');
        } else {
          runOnJS(moveToPosition)('half');
        }
        return;
      }
      
      if (Math.abs(velocity) > 3000) {
        if (velocity > 0) {
          runOnJS(moveToPosition)('collapsed');
        } else {
          runOnJS(moveToPosition)('half');
        }
        return;
      }

      const halfThreshold = HALF_POSITION + (COLLAPSED_POSITION - HALF_POSITION) * 0.5;
      
      if (currentY >= halfThreshold) {
        runOnJS(moveToPosition)('collapsed');
      } else {
        runOnJS(moveToPosition)('half');
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      <GestureDetector gesture={panGesture}>
        <Animated.View 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50"
          style={[
            { height: screenHeight },
            bottomSheetStyle
          ]}
        >
          <View className="py-2 items-center">
            <View className="w-12 h-1 bg-gray-400 rounded-full mt-3 mb-2" />
          </View>
          
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
}
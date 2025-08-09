// components/MapButton.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface MapButtonProps {
 text?: string;
 imageSource?: any;
 onPress?: () => void;
}

export default function MapButton({ text, imageSource, onPress }: MapButtonProps) {
 return (
   <TouchableOpacity
     className="p-4 flex flex-row gap-2 bg-white rounded-full elevation-xl justify-center items-center z-20"
     onPress={onPress}
   >
     {imageSource && (
       <Image 
         source={imageSource} 
         className="w-[20px] h-[20px]" 
       />
     )}
     {text && (
       <Text className="text-sm font-semibold">{text}</Text>
     )}
   </TouchableOpacity>
 );
}
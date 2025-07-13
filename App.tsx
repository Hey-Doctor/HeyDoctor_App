import "./global.css"
import { Text, View } from "react-native";
import Home from "~/screens/Home/Home";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Home />
    </View>
  );
}
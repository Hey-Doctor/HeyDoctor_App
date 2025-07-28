import "./global.css"
import { Text, View } from "react-native";
import Home from "~/screens/Home/Home";
import Login from "~/screens/Login/Login";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Login />
    </View>
  );
}
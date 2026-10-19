import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface CabecalhoTelaProps {
  titulo: string;
}

export function CabecalhoTela({ titulo }: CabecalhoTelaProps) {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-[#FFFFFF] shadow-sm elevation-1 relative">
      <TouchableOpacity onPress={() => router.back()} className="p-2 z-10">
        <MaterialIcons name="arrow-back" size={24} color="#111" />
      </TouchableOpacity>
      <View className="absolute inset-x-0 items-center justify-center pointer-events-none">
        <Text className="text-lg font-bold text-[#111]">{titulo}</Text>
      </View>

      <View className="p-2 w-10"></View>
    </View>
  );
}

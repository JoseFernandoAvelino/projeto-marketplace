import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface CabecalhoTelaProps {
  titulo: string;
}

export function CabecalhoTela({ titulo }: CabecalhoTelaProps) {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-[#FFFFFF] shadow-sm elevation-1">
      <TouchableOpacity onPress={() => router.back()} className="p-2">
        <MaterialIcons name="arrow-back" size={24} color="#111" />
      </TouchableOpacity>
      <Text className="text-base font-bold text-[#111]">{titulo}</Text>
      <View className="flex-row items-center">
        <TouchableOpacity className="mr-3 p-2">
          <MaterialIcons name="more-vert" size={24} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

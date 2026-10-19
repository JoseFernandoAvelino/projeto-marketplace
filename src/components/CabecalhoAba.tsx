import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface CabecalhoAbaProps {
  titulo: string;
}

export function CabecalhoAba({ titulo }: CabecalhoAbaProps) {
  return (
    <View className="flex-row justify-between items-center px-5 pt-2 pb-4">
      <View className="flex-row items-center flex-1">
        <MaterialIcons name="storefront" size={28} color="#006D43" />
        <View className="ml-2 flex-1">
          <Text
            className="text-base font-black text-[#006D43]"
            numberOfLines={1}
          >
            App Marketplace
          </Text>
          <Text className="text-xs text-[#6D7A70] font-bold mt-0.5">
            {titulo}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center pl-4">
        <TouchableOpacity
          className="w-9 h-9 rounded-full bg-[#E8EEF5] items-center justify-center overflow-hidden"
          onPress={() => router.navigate("/perfil")}
        >
          <MaterialIcons name="person" size={24} color="#006D43" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

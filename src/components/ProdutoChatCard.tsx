import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export function ProdutoChatCard() {
  return (
    <View className="bg-white mx-4 mt-4 p-3 rounded-2xl shadow-sm elevation-1 flex-row items-center">
      <View className="w-14 h-14 bg-[#E8EEF5] rounded-xl items-center justify-center relative">
        <MaterialIcons name="headset" size={24} color="#A0AAB2" />
        <View className="absolute top-1 left-1 bg-[#0051D5] px-1 rounded">
          <Text className="text-[6px] font-bold text-white uppercase">
            Novo
          </Text>
        </View>
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-sm font-bold text-[#111]" numberOfLines={1}>
          Produto
        </Text>
        <View className="flex-row items-end mt-0.5">
          <Text className="text-base font-black text-[#00995D]">R$ 800</Text>
          <Text className="text-[10px] text-[#A0AAB2] line-through ml-2 mb-1">
            R$ 1.000
          </Text>
        </View>
        <Text className="text-[10px] text-[#6D7A70] mt-0.5">
          Centro • Surubim
        </Text>
      </View>
      <TouchableOpacity className="bg-[#F2F5F9] px-3 py-2 rounded-xl flex-row items-center">
        <Text className="text-xs font-bold text-[#0051D5] mr-1">
          Ver anúncio
        </Text>
        <MaterialIcons name="open-in-new" size={14} color="#0051D5" />
      </TouchableOpacity>
    </View>
  );
}

import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function PropostaBalao() {
  return (
    <View className="bg-[#0051D5] rounded-2xl p-4 mb-3 mx-4 w-[85%] self-center shadow-md elevation-2">
      <View className="flex-row justify-between items-center mb-3 border-b border-[#3373E0] pb-2">
        <Text className="text-xs font-black text-white tracking-widest">
          PROPOSTA FORMAL
        </Text>
        <View className="bg-[#3373E0] px-2 py-1 rounded-full">
          <Text className="text-[9px] font-bold text-white">
            Aguardando resposta
          </Text>
        </View>
      </View>
      <Text className="text-xs text-white/90 mb-1">Valor proposto:</Text>
      <Text className="text-2xl font-black text-white mb-3">R$ 1.000,00</Text>
      <View className="flex-row justify-between items-end">
        <View className="flex-row items-center">
          <MaterialIcons name="location-on" size={14} color="#FFF" />
          <Text className="text-xs font-bold text-white ml-1">
            Localização do Cliente
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-[10px] text-white/80 mr-1">14:35</Text>
          <MaterialIcons name="done-all" size={14} color="#FFF" />
        </View>
      </View>
    </View>
  );
}

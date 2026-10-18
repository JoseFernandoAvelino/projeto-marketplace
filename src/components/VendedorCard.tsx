import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface VendedorCardProps {
  nome?: string;
}

export function VendedorCard({ nome = "Vendedor" }: VendedorCardProps) {
  return (
    <View className="bg-white rounded-2xl mx-5 mt-4 p-4 shadow-sm elevation-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xs font-bold text-[#6D7A70] uppercase tracking-wider">
          Vendedor
        </Text>
        <View className="flex-row items-center bg-[#EAF3EE] px-2 py-1 rounded-md">
          <MaterialIcons name="verified-user" size={12} color="#00995D" />
          <Text className="text-[10px] font-bold text-[#00995D] ml-1">
            Vendedor Verificado
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4">
        <View className="relative">
          <View className="w-12 h-12 rounded-full bg-[#E8EEF5] items-center justify-center">
            <MaterialIcons name="person" size={24} color="#A0AAB2" />
          </View>
          <View className="absolute bottom-0 right-0 bg-[#00995D] rounded-full p-[2px] border-2 border-white">
            <MaterialIcons name="check" size={10} color="#FFF" />
          </View>
        </View>
        <View className="ml-3">
          <Text className="text-base font-bold text-[#111]">{nome}</Text>
          <View className="flex-row items-center">
            <MaterialIcons name="star" size={14} color="#F59E0B" />
            <Text className="text-xs font-bold text-[#111] ml-1">4.9</Text>
            <Text className="text-xs text-[#6D7A70] ml-1">(42 avaliações)</Text>
          </View>
        </View>
      </View>

      <View className="flex-row bg-[#F2F5F9] rounded-xl p-3">
        <View className="flex-1 flex-row items-center justify-center border-r border-[#D3DAEF]">
          <MaterialIcons name="shopping-bag" size={16} color="#006D43" />
          <View className="ml-2">
            <Text className="text-[11px] font-bold text-[#111]">38 vendas</Text>
            <Text className="text-[9px] text-[#6D7A70]">concluídas</Text>
          </View>
        </View>
        <View className="flex-1 flex-row items-center justify-center pl-2">
          <MaterialIcons name="bolt" size={16} color="#0051D5" />
          <View className="ml-2">
            <Text className="text-[11px] font-bold text-[#111]">
              Vendedor Ativo
            </Text>
            <Text className="text-[9px] text-[#6D7A70]">
              responde 100% dos clientes
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
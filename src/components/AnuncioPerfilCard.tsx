import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface AnuncioPerfilCardProps {
  titulo: string;
  preco: string;
  local: string;
  visualizacoes?: number;
  imagem?: string;
  onPress?: () => void;
  onEditar?: () => void;
}

export function AnuncioPerfilCard({
  titulo,
  preco,
  local,
  visualizacoes = 0,
  imagem,
  onPress,
  onEditar,
}: AnuncioPerfilCardProps) {
  return (
    <View className="bg-white rounded-2xl mb-4 border border-[#F2F5F9] shadow-sm elevation-1 overflow-hidden">
      <TouchableOpacity className="flex-row p-3" onPress={onPress} activeOpacity={0.8}>
        <View className="w-20 h-20 bg-[#E8EEF5] rounded-xl items-center justify-center overflow-hidden">
          {imagem ? (
            <Image source={{ uri: imagem }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <MaterialIcons name="image" size={28} color="#A0AAB2" />
          )}
        </View>
        <View className="flex-1 ml-3 justify-between py-1">
          <View className="flex-row justify-between items-start">
            <View className="bg-[#EAF3EE] px-1.5 py-0.5 rounded flex-row items-center">
              <View className="w-1.5 h-1.5 bg-[#00995D] rounded-full mr-1" />
              <Text className="text-[9px] font-bold text-[#00995D] uppercase">
                Ativo
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="visibility" size={12} color="#A0AAB2" />
              <Text className="text-[10px] text-[#A0AAB2] ml-1">
                {visualizacoes}
              </Text>
            </View>
          </View>
          <Text className="text-sm font-bold text-[#111]" numberOfLines={1}>
            {titulo}
          </Text>
          <View className="flex-row justify-between items-end">
            <Text className="text-base font-black text-[#00995D]">{preco}</Text>
            <Text className="text-[10px] text-[#6D7A70]">{local}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="flex-row border-t border-[#F2F5F9] px-2 py-2">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center py-1"
          onPress={onEditar}
        >
          <MaterialIcons name="edit" size={14} color="#0051D5" />
          <Text className="text-xs font-bold text-[#0051D5] ml-1">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center py-1">
          <MaterialIcons
            name="pause-circle-outline"
            size={14}
            color="#6D7A70"
          />
          <Text className="text-xs font-bold text-[#6D7A70] ml-1">Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center py-1">
          <MaterialIcons name="rocket-launch" size={14} color="#F59E0B" />
          <Text className="text-xs font-bold text-[#F59E0B] ml-1">
            Destacar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-2 py-1 items-center justify-center">
          <MaterialIcons name="more-vert" size={16} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProdutoCardProps {
  imagem?: string;
  tag: string;
  tagCor: string;
  preco: string;
  titulo: string;
  local: string;
  tempo: string;
  onPress?: () => void;
}

export function ProdutoCard({
  imagem,
  tag,
  tagCor,
  preco,
  titulo,
  local,
  tempo,
  onPress,
}: ProdutoCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[48%] bg-white rounded-2xl mb-4 shadow-sm elevation-1 overflow-hidden"
      activeOpacity={0.8}
    >
      <View className="relative w-full h-36 bg-[#F2F5F9] items-center justify-center">
        {imagem ? (
          <Image
            source={{ uri: imagem }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <MaterialIcons name="image" size={40} color="#A0AAB2" />
        )}
        <View
          className={`absolute top-2 left-2 px-2 py-1 rounded-md ${tagCor}`}
        >
          <Text className="text-[9px] font-bold text-white uppercase">
            {tag}
          </Text>
        </View>
        <View className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full items-center justify-center shadow-sm">
          <MaterialIcons name="favorite-border" size={14} color="#555" />
        </View>
      </View>
      <View className="p-3">
        <Text className="text-base font-black text-[#006D43] mb-1">
          {preco}
        </Text>
        <Text
          className="text-xs text-[#111] font-semibold mb-2"
          numberOfLines={1}
        >
          {titulo}
        </Text>
        <View className="flex-row items-center mb-1">
          <MaterialIcons name="location-on" size={12} color="#A0AAB2" />
          <Text className="text-[10px] text-[#6D7A70] ml-1" numberOfLines={1}>
            {local}
          </Text>
        </View>
        <Text className="text-[10px] text-[#A0AAB2] ml-4">{tempo}</Text>
      </View>
    </TouchableOpacity>
  );
}
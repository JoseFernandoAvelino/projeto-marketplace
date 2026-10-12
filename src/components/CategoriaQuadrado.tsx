import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface CategoriaQuadradoProps {
  titulo: string;
  icone: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}

export function CategoriaQuadrado({
  titulo,
  icone,
  onPress,
}: CategoriaQuadradoProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[22%] bg-white items-center justify-center p-3 rounded-2xl border border-[#F2F5F9] mb-4 shadow-sm elevation-1"
      activeOpacity={0.7}
    >
      <View className="w-10 h-10 bg-[#E8EEF5] rounded-full items-center justify-center mb-1.5">
        <MaterialIcons name={icone} size={20} color="#006D43" />
      </View>
      <Text
        className="text-[9px] font-black text-[#111] text-center"
        numberOfLines={2}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

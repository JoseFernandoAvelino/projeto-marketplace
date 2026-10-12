import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
  icone: keyof typeof MaterialIcons.glyphMap;
  ehLogo?: boolean;
}

export function CabecalhoAuth({
  titulo,
  subtitulo,
  icone,
  ehLogo,
}: CabecalhoProps) {
  return (
    <View className="items-center mb-8 w-full">
      {ehLogo ? (
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-[#E8EEF5] rounded-3xl items-center justify-center mb-4">
            <MaterialIcons name="storefront" size={48} color="#006D43" />
          </View>
          <Text className="text-[28px] font-black text-[#006D43] tracking-tighter">
            App Marketplace
          </Text>
        </View>
      ) : (
        <View className="w-20 h-20 rounded-full bg-[#E8EEF5] items-center justify-center mb-4">
          <MaterialIcons name={icone} size={40} color="#006D43" />
        </View>
      )}

      <Text className="text-2xl font-bold text-[#111] mb-2">{titulo}</Text>
      <Text className="text-[15px] text-[#666] text-center leading-relaxed">
        {subtitulo}
      </Text>
    </View>
  );
}

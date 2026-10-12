import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface ConfiguracaoItemProps {
  titulo: string;
  subtitulo: string;
  icone: keyof typeof MaterialIcons.glyphMap;
  alerta?: boolean;
}

export function ConfiguracaoItem({
  titulo,
  subtitulo,
  icone,
  alerta,
}: ConfiguracaoItemProps) {
  return (
    <TouchableOpacity className="flex-row items-center py-4 border-b border-[#F2F5F9]">
      <View className="w-10 h-10 bg-[#E8EEF5] rounded-full items-center justify-center relative">
        <MaterialIcons name={icone} size={20} color="#0051D5" />
      </View>
      <View className="flex-1 ml-4">
        <View className="flex-row items-center">
          <Text className="text-sm font-bold text-[#111]">{titulo}</Text>
          {alerta && (
            <View className="w-2 h-2 bg-[#00995D] rounded-full ml-2" />
          )}
        </View>
        <Text className="text-[11px] text-[#6D7A70] mt-0.5">{subtitulo}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#A0AAB2" />
    </TouchableOpacity>
  );
}

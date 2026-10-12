import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface BotaoProps extends TouchableOpacityProps {
  titulo: string;
  icone: keyof typeof MaterialIcons.glyphMap;
}

export function Botao({ titulo, icone, ...resto }: BotaoProps) {
  return (
    <TouchableOpacity
      className="flex-row h-[52px] bg-[#006D43] rounded-full items-center justify-center mt-2"
      {...resto}
    >
      <Text className="text-white text-base font-bold mr-2">{titulo}</Text>
      <MaterialIcons name={icone} size={18} color="#FFF" />
    </TouchableOpacity>
  );
}

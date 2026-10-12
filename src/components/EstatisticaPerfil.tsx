import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface EstatisticaPerfilProps {
  valor: string;
  label: string;
  icone?: keyof typeof MaterialIcons.glyphMap;
  corIcone?: string;
}

export function EstatisticaPerfil({
  valor,
  label,
  icone,
  corIcone = "#6D7A70",
}: EstatisticaPerfilProps) {
  return (
    <View className="flex-1 items-center justify-center py-2">
      <Text className="text-lg font-black text-[#00995D]">{valor}</Text>
      <View className="flex-row items-center mt-1">
        {icone && <MaterialIcons name={icone} size={12} color={corIcone} />}
        <Text className={`text-[10px] text-[#6D7A70] ${icone ? "ml-1" : ""}`}>
          {label}
        </Text>
      </View>
    </View>
  );
}

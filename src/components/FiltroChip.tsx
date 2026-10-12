import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

interface FiltroChipProps {
  titulo: string;
  icone?: keyof typeof MaterialIcons.glyphMap;
  ativo?: boolean;
  onPress: () => void;
}

export function FiltroChip({ titulo, icone, ativo, onPress }: FiltroChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-4 py-2 rounded-full border mr-2.5 ${
        ativo ? "bg-[#EAF3EE] border-[#00995D]" : "bg-white border-[#E8EEF5]"
      }`}
      activeOpacity={0.7}
    >
      {icone && (
        <MaterialIcons
          name={icone}
          size={14}
          color={ativo ? "#00995D" : "#6D7A70"}
          className="mr-1.5"
        />
      )}
      <Text
        className={`text-xs font-bold ${ativo ? "text-[#00995D]" : "text-[#6D7A70]"}`}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

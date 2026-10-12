import { Text, TouchableOpacity, View } from "react-native";

interface ToggleSwitchProps {
  ativo: boolean;
  onToggle: () => void;
  titulo: string;
  subtitulo: string;
}

export function ToggleSwitch({
  ativo,
  onToggle,
  titulo,
  subtitulo,
}: ToggleSwitchProps) {
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={onToggle}
        className={`w-12 h-6 rounded-full px-1 justify-center ${ativo ? "bg-[#00995D]" : "bg-[#D3DAEF]"}`}
      >
        <View
          className={`w-4 h-4 bg-white rounded-full transition-all ${ativo ? "self-end" : "self-start"}`}
        />
      </TouchableOpacity>
      <View className="ml-3">
        <Text className="text-[13px] font-bold text-[#111]">{titulo}</Text>
        <Text className="text-[10px] text-[#6D7A70]">{subtitulo}</Text>
      </View>
    </View>
  );
}

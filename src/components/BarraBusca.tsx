import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export function BarraBusca() {
  return (
    <View className="flex-row items-center bg-[#F2F5F9] rounded-xl px-4 py-3">
      <MaterialIcons name="search" size={20} color="#6D7A70" />
      <TextInput
        className="flex-1 ml-2 text-sm text-[#111]"
        placeholder="Buscar produtos, eletrônicos, móveis..."
        placeholderTextColor="#A0AAB2"
      />
    </View>
  );
}

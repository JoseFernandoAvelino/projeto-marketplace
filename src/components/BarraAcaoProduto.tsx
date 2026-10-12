import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function BarraAcaoProduto() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 w-full bg-white border-t border-[#F2F5F9] flex-row px-5 pt-4 shadow-lg elevation-10"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#F2F5F9] rounded-full h-12 mr-3">
        <MaterialIcons name="local-offer" size={18} color="#0051D5" />
        <Text className="text-[#0051D5] font-bold ml-2">Fazer Proposta</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#00995D] rounded-full h-12">
        <MaterialIcons name="chat" size={18} color="#FFF" />
        <Text className="text-white font-bold ml-2">Enviar Mensagem</Text>
      </TouchableOpacity>
    </View>
  );
}

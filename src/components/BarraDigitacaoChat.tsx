import { MaterialIcons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function BarraDigitacaoChat() {
  const insets = useSafeAreaInsets();
  const sugestoes = [
    "Ainda está disponível?",
    "Faz entrega?",
    "Qual o menor valor?",
  ];

  return (
    <View
      className="bg-white border-t border-[#F2F5F9]"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View className="flex-row px-3 py-2 border-b border-[#F2F5F9]">
        {sugestoes.map((sugestao, index) => (
          <TouchableOpacity
            key={index}
            className="bg-[#F2F5F9] px-3 py-1.5 rounded-full mr-2"
          >
            <Text className="text-[11px] font-bold text-[#0051D5]">
              {sugestao}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-row items-center px-4 pt-3">
        <TouchableOpacity className="w-10 h-10 bg-[#F2F5F9] rounded-full items-center justify-center mr-2">
          <MaterialIcons name="add-photo-alternate" size={20} color="#6D7A70" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-[#F2F5F9] rounded-full items-center justify-center mr-2">
          <MaterialIcons name="local-offer" size={18} color="#6D7A70" />
        </TouchableOpacity>
        <View className="flex-1 bg-[#F2F5F9] rounded-full px-4 py-2 flex-row items-center mr-2">
          <TextInput
            className="flex-1 text-[13px] text-[#111] p-0"
            placeholder="Escreva uma mensagem..."
            placeholderTextColor="#A0AAB2"
          />
          <MaterialIcons
            name="sentiment-satisfied-alt"
            size={20}
            color="#A0AAB2"
          />
        </View>
        <TouchableOpacity className="w-11 h-11 bg-[#00995D] rounded-full items-center justify-center shadow-sm">
          <MaterialIcons name="send" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

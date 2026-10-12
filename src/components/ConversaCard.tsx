import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface ConversaCardProps {
  nome: string;
  produto: string;
  ultimaMensagem: string;
  tempo: string;
  naoLida?: boolean;
  onPress: () => void;
}

export function ConversaCard({
  nome,
  produto,
  ultimaMensagem,
  tempo,
  naoLida,
  onPress,
}: ConversaCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white flex-row items-center px-5 py-4 border-b border-[#F2F5F9]"
      activeOpacity={0.7}
    >
      <View className="relative">
        <View className="w-14 h-14 rounded-full bg-[#E8EEF5] items-center justify-center">
          <MaterialIcons name="person" size={28} color="#A0AAB2" />
        </View>
        {naoLida && (
          <View className="absolute top-0 right-0 w-4 h-4 bg-[#00995D] rounded-full border-2 border-white" />
        )}
      </View>

      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`text-base ${naoLida ? "font-black text-[#111]" : "font-bold text-[#111]"}`}
          >
            {nome}
          </Text>
          <Text
            className={`text-[10px] ${naoLida ? "font-bold text-[#00995D]" : "text-[#A0AAB2]"}`}
          >
            {tempo}
          </Text>
        </View>
        <Text
          className="text-[10px] font-bold text-[#006D43] mb-0.5 uppercase tracking-wider"
          numberOfLines={1}
        >
          {produto}
        </Text>
        <Text
          className={`text-[13px] ${naoLida ? "font-bold text-[#111]" : "text-[#6D7A70]"}`}
          numberOfLines={1}
        >
          {ultimaMensagem}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

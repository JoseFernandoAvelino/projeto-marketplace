import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface MensagemBalaoProps {
  texto: string;
  hora: string;
  enviada?: boolean;
  temAnexo?: boolean;
}

export function MensagemBalao({
  texto,
  hora,
  enviada,
  temAnexo,
}: MensagemBalaoProps) {
  const alinhamento = enviada
    ? "self-end bg-[#006D43] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
    : "self-start bg-white shadow-sm elevation-1 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl";
  const corTexto = enviada ? "text-white" : "text-[#111]";
  const corHora = enviada ? "text-[#A3E0B5]" : "text-[#A0AAB2]";

  return (
    <View className={`max-w-[80%] p-3 mb-3 mx-4 ${alinhamento}`}>
      <Text className={`text-[13px] leading-relaxed ${corTexto}`}>{texto}</Text>

      {temAnexo && (
        <View className="w-full h-32 bg-[#F2F5F9] rounded-xl mt-2 items-center justify-center relative">
          <MaterialIcons name="image" size={32} color="#A0AAB2" />
          <View className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded flex-row items-center">
            <MaterialIcons name="photo-camera" size={10} color="#111" />
            <Text className="text-[9px] font-bold text-[#111] ml-1">
              Foto real
            </Text>
          </View>
        </View>
      )}

      <View className="flex-row items-center justify-end mt-1">
        <Text className={`text-[10px] ${corHora} mr-1`}>{hora}</Text>
        {enviada && <MaterialIcons name="done-all" size={14} color="#A3E0B5" />}
      </View>
    </View>
  );
}

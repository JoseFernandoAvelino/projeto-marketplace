import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarraDigitacaoChat } from "../../components/BarraDigitacaoChat";
import { CabecalhoTela } from "../../components/CabecalhoTela";
import { MensagemBalao } from "../../components/MensagemBalao";
import { ProdutoChatCard } from "../../components/ProdutoChatCard";
import { PropostaBalao } from "../../components/PropostaBalao";

export default function ChatDetalhe() {
  const { nome } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <CabecalhoTela titulo="Detalhes Da Conversa" />
      <View className="bg-white px-5 py-3 border-b border-[#E8EEF5] flex-row items-center justify-between shadow-sm elevation-1 relative z-10">
        <View className="flex-row items-center">
          <View className="relative">
            <View className="w-10 h-10 rounded-full bg-[#E8EEF5] items-center justify-center">
              <MaterialIcons name="person" size={24} color="#A0AAB2" />
            </View>
          </View>
          <View className="ml-3">
            <View className="flex-row items-center">
              <Text className="text-sm font-bold text-[#111]">
                {nome || "Usuário"}
              </Text>
              <MaterialIcons
                name="verified"
                size={12}
                color="#00995D"
                className="ml-1"
              />
            </View>
          </View>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity className="p-2">
            <MaterialIcons name="phone" size={20} color="#6D7A70" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 ml-1">
            <MaterialIcons name="person" size={20} color="#6D7A70" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <ProdutoChatCard />
        <View className="bg-[#EAF3EE] flex-row items-center mx-4 mt-3 px-3 py-2 rounded-xl">
          <MaterialIcons name="security" size={16} color="#006D43" />
          <Text className="flex-1 text-[10px] text-[#006D43] ml-2 leading-tight">
            Negocie com segurança: nunca compartilhe dados importantes no app.
          </Text>
        </View>
        <View className="self-center bg-[#E8EEF5] px-3 py-1 rounded-full my-4">
          <Text className="text-[10px] font-bold text-[#6D7A70]">
            Hoje, 14:30
          </Text>
        </View>
        <MensagemBalao
          texto="Boa tarde, este produto está disponível? Está novo?"
          hora="14:30"
        />
        <MensagemBalao
          texto="Boa tarde! Sim, está disponível. Produto novo."
          hora="14:31"
          enviada
        />
        <MensagemBalao texto="Ótimo, vou enviar uma proposta!" hora="14:33" />
        <PropostaBalao />
        <MensagemBalao
          texto="Fechado por R$ 1.000! Consigo entregar para você amanhã."
          hora="14:38"
          enviada
        />
      </ScrollView>
      <BarraDigitacaoChat />
    </SafeAreaView>
  );
}

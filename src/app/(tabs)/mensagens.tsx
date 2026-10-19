import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CabecalhoAba } from "../../components/CabecalhoAba";
import { ConversaCard } from "../../components/ConversaCard";

export default function Mensagens() {
  const conversas = [
    {
      id: "1",
      nome: "Vendedor 1",
      produto: "Headfone ANC",
      ultimaMensagem: "Fechado por R$300 na Praça do centro!",
      tempo: "14:30",
      naoLida: true,
    },
    {
      id: "2",
      nome: "Vendedor 2",
      produto: "Jaqueta Couro Legítimo",
      ultimaMensagem: "Faz por R$250 se eu buscar hoje a noite?",
      tempo: "Ontem",
      naoLida: true,
    },
    {
      id: "3",
      nome: "Vendedor 3",
      produto: "Café Arábico",
      ultimaMensagem: "Obrigado! Aguardo o envio.",
      tempo: "Segunda",
      naoLida: false,
    },
    {
      id: "4",
      nome: "Vendedor 4",
      produto: "Cadeira Ergonômica",
      ultimaMensagem: "Aceita troca num monitor de 24 polegadas?",
      tempo: "02/10",
      naoLida: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <View className="bg-white shadow-sm elevation-1 z-10">
        <CabecalhoAba titulo="Mensagens" />
        <View className="px-5 pb-4 flex-row items-center space-x-3">
          <View className="flex-1 flex-row items-center bg-[#F2F5F9] rounded-xl px-4 py-2.5">
            <MaterialIcons name="search" size={20} color="#6D7A70" />
            <TextInput
              className="flex-1 ml-2 text-sm text-[#111] p-0"
              placeholder="Buscar conversas..."
              placeholderTextColor="#A0AAB2"
            />
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-[#E8EEF5] items-center justify-center">
            <MaterialIcons name="filter-list" size={22} color="#006D43" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row px-5 py-4 gap-x-3">
          <TouchableOpacity className="flex-1 bg-[#111] py-2.5 rounded-full items-center shadow-sm">
            <Text className="text-white text-xs font-bold">Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white py-2.5 rounded-full items-center border border-[#E8EEF5] shadow-sm">
            <Text className="text-[#6D7A70] text-xs font-bold">Comprando</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white py-2.5 rounded-full items-center border border-[#E8EEF5] shadow-sm">
            <Text className="text-[#6D7A70] text-xs font-bold">Vendendo</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white rounded-t-3xl overflow-hidden mt-2 pt-2 shadow-sm elevation-1 min-h-[500px]">
          {conversas.map((conversa) => (
            <ConversaCard
              key={conversa.id}
              nome={conversa.nome}
              produto={conversa.produto}
              ultimaMensagem={conversa.ultimaMensagem}
              tempo={conversa.tempo}
              naoLida={conversa.naoLida}
              onPress={() =>
                router.push({
                  pathname: "/mensagem/[id]",
                  params: {
                    id: conversa.id,
                    nome: conversa.nome,
                  },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

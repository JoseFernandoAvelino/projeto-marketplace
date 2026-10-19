import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarraBusca } from "../../components/BarraBusca";
import { FiltroCategoria } from "../../components/FiltroCategoria";
import { ListaProdutos } from "../../components/ListaProdutos";
import { api } from "../../lib/api";
import { Produto } from "../../lib/produtos";

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  async function carregarProdutos() {
    setCarregando(true);
    setErro("");
    try {
      setProdutos(await api<Produto[]>("/produtos"));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar os produtos.");
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, []),
  );

  function pesquisar() {
    router.push({ pathname: "/(tabs)/explorar", params: { busca } });
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <View className="flex-row justify-between items-center px-5 pt-2 pb-4">
        <View className="flex-row items-center flex-1">
          <MaterialIcons name="storefront" size={28} color="#006D43" />
          <View className="ml-2 flex-1">
            <Text
              className="text-base font-black text-[#006D43]"
              numberOfLines={1}
            >
              App Marketplace
            </Text>
            <Text className="text-xs text-[#6D7A70] font-bold mt-0.5">
              Início
            </Text>
          </View>
        </View>
        <View className="flex-row items-center pl-4">
          <View className="w-9 h-9 rounded-full bg-[#E8EEF5] items-center justify-center overflow-hidden">
            <MaterialIcons name="person" size={24} color="#006D43" />
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-5 mb-5">
          <BarraBusca
            value={busca}
            onChangeText={setBusca}
            onSubmitEditing={pesquisar}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          className="mb-6"
        >
          <FiltroCategoria
            titulo="Todos"
            icone="grid-view"
            corPrincipal="#FFFFFF"
            corFundo="bg-[#006D43]"
          />
          <FiltroCategoria
            titulo="Destacados"
            icone="star"
            corPrincipal="#F59E0B"
            corFundo="bg-[#FEF3C7]"
          />
          <FiltroCategoria
            titulo="Em Alta"
            icone="local-fire-department"
            corPrincipal="#DC2626"
            corFundo="bg-[#FEE2E2]"
          />
        </ScrollView>
        <View className="px-5 mb-8">
          <View className="bg-[#EAF3EE] rounded-2xl p-3 relative overflow-hidden">
            <View className="flex-row items-center mb-2">
              <MaterialIcons name="location-on" size={14} color="#00995D" />
              <Text className="text-[10px] font-bold text-[#00995D] ml-1 tracking-widest uppercase">
                Cidade Surubim • PE
              </Text>
            </View>
            <Text className="text-xl font-black text-[#00331D] mb-2 leading-tight">
              Compre e venda perto de você
            </Text>
            <Text className="text-xs text-[#005232] leading-relaxed">
              Negociação rápida, sem frete caro e direto com seus vizinhos.
            </Text>
            <View className="absolute right-4 top-1/2 -translate-y-6 w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm elevation-2">
              <MaterialIcons name="edit-location" size={40} color="#006D43" />
            </View>
          </View>
        </View>
        <View className="pl-5 mb-8">
          <Text className="text-lg font-bold text-[#111] mb-4">
            Vendedores Locais Verificados
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} className="items-center mr-4">
                <View className="w-16 h-16 bg-[#E8EEF5] rounded-full items-center justify-center border-[3px] border-[#00995D] relative mb-1.5">
                  <MaterialIcons name="storefront" size={28} color="#006D43" />
                  <View className="absolute bottom-0 right-0 bg-[#00995D] rounded-full p-[2px] border-2 border-white">
                    <MaterialIcons name="check" size={12} color="#FFF" />
                  </View>
                </View>
                <Text className="text-[11px] font-bold text-[#111]">
                  Loja {item}
                </Text>
              </View>
            ))}
            <View className="items-center justify-center mr-5 px-2">
              <View className="w-16 h-16 bg-[#F2F5F9] rounded-full items-center justify-center mb-1.5">
                <MaterialIcons name="arrow-forward" size={24} color="#6D7A70" />
              </View>
              <Text className="text-[11px] font-bold text-[#6D7A70]">
                Ver mais
              </Text>
            </View>
          </ScrollView>
        </View>
        <View className="px-5 flex-row justify-between items-end mb-4">
          <View>
            <Text className="text-lg font-bold text-[#111]">
              Anúncios Recentes
            </Text>
            <Text className="text-xs text-[#6D7A70]">
              Os produtos mais novos da sua região
            </Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.push("/(tabs)/explorar")}
          >
            <Text className="text-xs font-bold text-[#006D43] mr-1">
              Ver todos
            </Text>
            <MaterialIcons name="arrow-forward" size={16} color="#006D43" />
          </TouchableOpacity>
        </View>
        <View className="px-5">
          <ListaProdutos
            produtos={produtos}
            carregando={carregando}
            erro={erro}
            onTentarDeNovo={carregarProdutos}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

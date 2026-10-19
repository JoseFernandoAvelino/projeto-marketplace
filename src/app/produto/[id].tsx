import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BarraAcaoProduto } from "../../components/BarraAcaoProduto";
import { Botao } from "../../components/Botao";
import { CabecalhoTela } from "../../components/CabecalhoTela";
import { VendedorCard } from "../../components/VendedorCard";
import { api } from "../../lib/api";
import { formatarPreco, Produto, tempoDesde } from "../../lib/produtos";
import { usuarioAtual } from "../../lib/sessao";

export default function DetalhesProduto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState("");
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const larguraEcra = Dimensions.get("window").width;
  const aoMudarFoto = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / larguraEcra);
    if (slide !== fotoAtiva) {
      setFotoAtiva(slide);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setErro("");
      api<Produto>(`/produtos/${id}`)
        .then(setProduto)
        .catch((e) =>
          setErro(
            e instanceof Error ? e.message : "Erro ao carregar o produto.",
          ),
        );
    }, [id]),
  );

  if (erro || !produto) {
    return (
      <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
        <CabecalhoTela titulo="Detalhes Do Produto" />
        <View className="flex-1 items-center justify-center px-8">
          {erro ? (
            <>
              <MaterialIcons name="error-outline" size={40} color="#A0AAB2" />
              <Text className="text-sm text-[#6D7A70] text-center mt-2">
                {erro}
              </Text>
            </>
          ) : (
            <ActivityIndicator size="large" color="#006D43" />
          )}
        </View>
      </SafeAreaView>
    );
  }

  const ehDono = usuarioAtual()?.id === produto.vendedor_id;

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <CabecalhoTela titulo="Detalhes Do Produto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="w-full h-80 bg-[#E8EEF5] relative">
          {produto.imagens && produto.imagens.length > 0 ? (
            <>
              <FlatList
                data={produto.imagens}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={aoMudarFoto}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => `${item}-${index}`}
                style={{ width: larguraEcra, height: 320 }}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={{ width: larguraEcra, height: 320 }}
                    resizeMode="cover"
                  />
                )}
              />

              {produto.imagens.length > 1 && (
                <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-1.5 pointer-events-none">
                  {produto.imagens.map((_, index) => (
                    <View
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        fotoAtiva === index
                          ? "w-6 bg-[#006D43]"
                          : "w-2 bg-white/70"
                      }`}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View className="w-full h-full items-center justify-center">
              <MaterialIcons name="image" size={64} color="#A0AAB2" />
            </View>
          )}

          <TouchableOpacity className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <MaterialIcons name="favorite-border" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-b-3xl px-5 pt-5 pb-6 shadow-sm elevation-1">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center bg-[#F2F5F9] px-2 py-1 rounded-md">
              <MaterialIcons name="verified" size={14} color="#0051D5" />
              <Text className="text-[11px] font-bold text-[#0051D5] ml-1">
                {produto.condicao}
              </Text>
            </View>
            <Text className="text-[11px] text-[#6D7A70]">
              {tempoDesde(produto.criado_em)}
            </Text>
          </View>
          <Text className="text-xl font-black text-[#111] mb-2 leading-tight">
            {produto.titulo}
          </Text>
          <View className="flex-row items-end mb-4">
            <Text className="text-3xl font-black text-[#006D43]">
              {formatarPreco(produto.preco)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between border-t border-[#F2F5F9] pt-4">
            <View className="flex-row items-center flex-1">
              <MaterialIcons name="location-on" size={18} color="#00995D" />
              <Text
                className="text-[11px] text-[#6D7A70] ml-1"
                numberOfLines={1}
              >
                {produto.localizacao || "Local não informado"}
              </Text>
            </View>
            <View className="flex-row items-center flex-1 justify-end">
              <MaterialIcons name="local-shipping" size={18} color="#00995D" />
              <Text className="text-[11px] text-[#6D7A70] ml-1 text-right">
                {produto.faz_entrega ? "Faz entrega" : "Entrega em mãos"}
              </Text>
            </View>
          </View>
        </View>
        <VendedorCard nome={produto.vendedor_nome} />
        <View className="bg-white rounded-2xl mx-5 mt-4 p-5 shadow-sm elevation-1">
          <Text className="text-base font-bold text-[#111] mb-2">
            Descrição
          </Text>
          <Text className="text-[13px] text-[#555] leading-relaxed">
            {produto.descricao || "O vendedor não adicionou uma descrição."}
          </Text>
          <View className="flex-row flex-wrap mt-3">
            {produto.aceita_proposta && (
              <Text className="text-[11px] font-bold text-[#00995D] mr-4">
                ✓ Aceita propostas
              </Text>
            )}
            {produto.aceita_troca && (
              <Text className="text-[11px] font-bold text-[#00995D]">
                ✓ Aceita trocas
              </Text>
            )}
          </View>
        </View>
        <View className="bg-white rounded-2xl mx-5 mt-4 p-5 shadow-sm elevation-1">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-base font-bold text-[#111]">
              Localização Aproximada
            </Text>
          </View>
          <View className="w-full h-32 bg-[#E8EEF5] rounded-xl relative overflow-hidden mb-3 items-center justify-center">
            <View className="bg-white flex-row items-center px-3 py-2 rounded-lg shadow-sm elevation-2">
              <MaterialIcons name="near-me" size={16} color="#006D43" />
              <Text className="text-[12px] font-bold text-[#111] ml-2">
                {produto.localizacao || "Ponto Central (~500m)"}
              </Text>
            </View>
          </View>
          <Text className="text-[11px] text-[#A0AAB2] leading-tight">
            Recomendamos realizar a negociação em locais públicos e
            movimentados, para a sua segurança e comodidade.
          </Text>
        </View>
      </ScrollView>
      {ehDono ? (
        <View
          className="absolute bottom-0 w-full bg-white border-t border-[#F2F5F9] px-5 pt-3"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          <Botao
            titulo="Editar anúncio"
            icone="edit"
            onPress={() =>
              router.push({
                pathname: "/editar/[id]",
                params: { id: String(produto.id) },
              })
            }
            style={{ marginTop: 0 }}
          />
        </View>
      ) : (
        <BarraAcaoProduto />
      )}
    </SafeAreaView>
  );
}

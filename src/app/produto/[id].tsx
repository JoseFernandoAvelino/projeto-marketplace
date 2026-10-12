import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarraAcaoProduto } from "../../components/BarraAcaoProduto";
import { CabecalhoTela } from "../../components/CabecalhoTela";
import { VendedorCard } from "../../components/VendedorCard";

export default function DetalhesProduto() {
  const { id, titulo, preco, tag, local, tempo, imagem } =
    useLocalSearchParams();

  const urlImagem =
    typeof imagem === "string" ? imagem : "https://via.placeholder.com/800";

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <CabecalhoTela titulo="Detalhes Do Produto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="w-full h-80 bg-[#E8EEF5] relative">
          <Image
            source={{ uri: urlImagem }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
            <MaterialIcons name="favorite-border" size={20} color="#555" />
          </TouchableOpacity>
          <View className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full flex-row items-center">
            <MaterialIcons name="photo-library" size={12} color="#FFF" />
            <Text className="text-white text-xs font-bold ml-1">1/4</Text>
          </View>
        </View>
        <View className="bg-white rounded-b-3xl px-5 pt-5 pb-6 shadow-sm elevation-1">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center bg-[#F2F5F9] px-2 py-1 rounded-md">
              <MaterialIcons name="verified" size={14} color="#0051D5" />
              <Text className="text-[11px] font-bold text-[#0051D5] ml-1">
                {tag}
              </Text>
            </View>
            <Text className="text-[11px] text-[#6D7A70]">{tempo}</Text>
          </View>
          <Text className="text-xl font-black text-[#111] mb-2 leading-tight">
            {titulo}
          </Text>
          <View className="flex-row items-end mb-4">
            <Text className="text-3xl font-black text-[#006D43]">{preco}</Text>
          </View>
          <View className="flex-row items-center justify-between border-t border-[#F2F5F9] pt-4">
            <View className="flex-row items-center flex-1">
              <MaterialIcons name="location-on" size={18} color="#00995D" />
              <Text
                className="text-[11px] text-[#6D7A70] ml-1"
                numberOfLines={1}
              >
                {local}
              </Text>
            </View>
            <View className="flex-row items-center flex-1 justify-end">
              <MaterialIcons name="local-shipping" size={18} color="#00995D" />
              <Text className="text-[11px] text-[#6D7A70] ml-1 text-right">
                Entrega em mãos
              </Text>
            </View>
          </View>
        </View>
        <VendedorCard />
        <View className="bg-white rounded-2xl mx-5 mt-4 p-5 shadow-sm elevation-1">
          <Text className="text-base font-bold text-[#111] mb-2">
            Descrição
          </Text>
          <Text className="text-[13px] text-[#555] leading-relaxed">
            Detalhes do produto...{"\n"}
            Detalhes do produto...{"\n"}
            Detalhes do produto...
          </Text>
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
                Ponto Central (~500m)
              </Text>
            </View>
          </View>
          <Text className="text-[11px] text-[#A0AAB2] leading-tight">
            Recomendamos realizar a negociação em locais públicos e
            movimentados, para a sua segurança e comodidade.
          </Text>
        </View>
      </ScrollView>
      <BarraAcaoProduto />
    </SafeAreaView>
  );
}

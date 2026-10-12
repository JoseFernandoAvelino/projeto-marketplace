import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarraBusca } from "../../components/BarraBusca";
import { FiltroCategoria } from "../../components/FiltroCategoria";
import { ProdutoCard } from "../../components/ProdutoCard";

const PRODUTOS_DESTAQUE = [
  {
    id: "5",
    titulo: "Bike Aro 29 Alumínio",
    preco: "R$ 1.550",
    tag: "⭐ Destaque",
    tagCor: "bg-[#F59E0B]",
    local: "Surubim • 1.7 km",
    tempo: "Há 5 horas",
    imagem:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
  },
  {
    id: "2",
    titulo: "Cadeira Ergonômica",
    preco: "R$ 680",
    tag: "⭐ Destaque",
    tagCor: "bg-[#F59E0B]",
    local: "Caruaru • 55 km",
    tempo: "Há 1 hora",
    imagem:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
  },
];

const PRODUTOS_ALTA = [
  {
    id: "1",
    titulo: "Smartphone Pro Max",
    preco: "R$ 2.450",
    tag: "🔥 Em Alta",
    tagCor: "bg-[#DC2626]",
    local: "Surubim • 1.2 km",
    tempo: "Há 25 minutos",
    imagem:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
  },
  {
    id: "3",
    titulo: "Headphone ANC Bluetooth",
    preco: "R$ 390",
    tag: "🔥 Em Alta",
    tagCor: "bg-[#DC2626]",
    local: "Surubim • 3.5 km",
    tempo: "Há 2 horas",
    imagem:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
  },
];

export default function Home() {
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
          <BarraBusca />
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
              Produtos em Destaque
            </Text>
            <Text className="text-xs text-[#6D7A70]">
              Os melhores da sua região
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
        <View className="px-5 flex-row flex-wrap justify-between mb-4">
          {PRODUTOS_DESTAQUE.map((item) => (
            <ProdutoCard
              key={item.id}
              imagem={item.imagem}
              tag={item.tag}
              tagCor={item.tagCor}
              preco={item.preco}
              titulo={item.titulo}
              local={item.local}
              tempo={item.tempo}
              onPress={() => {
                router.push({
                  pathname: "/produto/[id]",
                  params: {
                    id: item.id,
                    titulo: item.titulo,
                    preco: item.preco,
                    tag: item.tag,
                    local: item.local,
                    tempo: item.tempo,
                    imagem: item.imagem,
                  },
                });
              }}
            />
          ))}
        </View>
        <View className="px-5 flex-row justify-between items-end mb-4 mt-2">
          <View>
            <Text className="text-lg font-bold text-[#111]">Em Alta</Text>
            <Text className="text-xs text-[#6D7A70]">
              Os mais buscados agora
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
        <View className="px-5 flex-row flex-wrap justify-between">
          {PRODUTOS_ALTA.map((item) => (
            <ProdutoCard
              key={item.id}
              imagem={item.imagem}
              tag={item.tag}
              tagCor={item.tagCor}
              preco={item.preco}
              titulo={item.titulo}
              local={item.local}
              tempo={item.tempo}
              onPress={() => {
                router.push({
                  pathname: "/produto/[id]",
                  params: {
                    id: item.id,
                    titulo: item.titulo,
                    preco: item.preco,
                    tag: item.tag,
                    local: item.local,
                    tempo: item.tempo,
                    imagem: item.imagem,
                  },
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

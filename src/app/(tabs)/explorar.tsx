import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarraBusca } from "../../components/BarraBusca";
import { CategoriaQuadrado } from "../../components/CategoriaQuadrado";
import { FiltroChip } from "../../components/FiltroChip";

export default function Explorar() {
  const [localAtivo, setLocalAtivo] = useState(true);
  const [precoAtivo, setPrecoAtivo] = useState(false);
  const [condicaoAtiva, setCondicaoAtiva] = useState(false);
  const [entregaAtiva, setEntregaAtiva] = useState(false);
  const [trocaAtiva, setTrocaAtiva] = useState(false);
  const categorias = [
    { titulo: "Eletrônicos & Tech", icone: "smartphone" as const },
    { titulo: "Móveis & Casa", icone: "chair" as const },
    { titulo: "Moda & Acesso.", icone: "checkroom" as const },
    { titulo: "Veículos", icone: "directions-car" as const },
    { titulo: "Esportes & Lazer", icone: "pedal-bike" as const },
    { titulo: "Livros & Jogos", icone: "menu-book" as const },
    { titulo: "Brinquedos", icone: "smart-toy" as const },
    { titulo: "Outros", icone: "more-horiz" as const },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <View className="px-5 pt-3 pb-4 bg-white shadow-sm elevation-1 z-10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-black text-[#111]">Explorar</Text>
        </View>
        <BarraBusca />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            <FiltroChip
              titulo="Localização"
              icone="location-on"
              ativo={localAtivo}
              onPress={() => setLocalAtivo(!localAtivo)}
            />
            <FiltroChip
              titulo="Preço"
              icone="local-offer"
              ativo={precoAtivo}
              onPress={() => setPrecoAtivo(!precoAtivo)}
            />
            <FiltroChip
              titulo="Condição"
              icone="star-border"
              ativo={condicaoAtiva}
              onPress={() => setCondicaoAtiva(!condicaoAtiva)}
            />
            <FiltroChip
              titulo="Entrega"
              icone="local-shipping"
              ativo={entregaAtiva}
              onPress={() => setEntregaAtiva(!entregaAtiva)}
            />
            <FiltroChip
              titulo="Aceita Troca"
              icone="swap-horiz"
              ativo={trocaAtiva}
              onPress={() => setTrocaAtiva(!trocaAtiva)}
            />
          </ScrollView>
        </View>
        <View className="px-5 mt-6">
          <Text className="text-sm font-black text-[#111] mb-4 uppercase tracking-wider">
            Filtrar por categorias
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {categorias.map((cat, idx) => (
              <CategoriaQuadrado
                key={idx}
                titulo={cat.titulo}
                icone={cat.icone}
                onPress={() => {}}
              />
            ))}
          </View>
        </View>
        <View className="px-5 mt-6 items-center justify-center min-h-[150px]">
          <MaterialIcons name="search-off" size={48} color="#A0AAB2" />
          <Text className="text-sm font-bold text-[#6D7A70] mt-2 text-center">
            Nenhum produto encontrado
          </Text>
          <Text className="text-xs text-[#A0AAB2] mt-1 text-center">
            Tente ajustar os filtros ou pesquisar outro termo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarraBusca } from "../../components/BarraBusca";
import { CategoriaQuadrado } from "../../components/CategoriaQuadrado";
import { FiltroChip } from "../../components/FiltroChip";
import { ListaProdutos } from "../../components/ListaProdutos";
import { api } from "../../lib/api";
import { CATEGORIAS, Produto } from "../../lib/produtos";

export default function Explorar() {
  const [localAtivo, setLocalAtivo] = useState(true);
  const [precoAtivo, setPrecoAtivo] = useState(false);
  const [condicaoAtiva, setCondicaoAtiva] = useState(false);
  const [entregaAtiva, setEntregaAtiva] = useState(false);
  const [trocaAtiva, setTrocaAtiva] = useState(false);
  const params = useLocalSearchParams<{ busca?: string }>();
  const [busca, setBusca] = useState(params.busca ?? "");
  const [categoria, setCategoria] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function buscarProdutos(termo: string, cat: string) {
    setCarregando(true);
    setErro("");
    try {
      const filtros = new URLSearchParams();
      if (termo.trim()) filtros.append("busca", termo.trim());
      if (cat) filtros.append("categoria", cat);
      setProdutos(await api<Produto[]>(`/produtos?${filtros.toString()}`));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao buscar os produtos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (params.busca !== undefined) setBusca(params.busca);
  }, [params.busca]);
  
  useEffect(() => {
    const espera = setTimeout(() => buscarProdutos(busca, categoria), 400);
    return () => clearTimeout(espera);
  }, [busca, categoria]);

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <View className="px-5 pt-3 pb-4 bg-white shadow-sm elevation-1 z-10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-black text-[#111]">Explorar</Text>
        </View>
        <BarraBusca value={busca} onChangeText={setBusca} />
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
            {CATEGORIAS.map((cat) => (
              <CategoriaQuadrado
                key={cat.id}
                titulo={cat.nome}
                icone={cat.icone}
                selecionado={categoria === cat.id}
                onPress={() => setCategoria(categoria === cat.id ? "" : cat.id)}
              />
            ))}
          </View>
        </View>
        <View className="px-5 mt-2">
          <Text className="text-sm font-black text-[#111] mb-4 uppercase tracking-wider">
            {busca.trim() || categoria ? "Resultados" : "Todos os produtos"}
          </Text>
          <ListaProdutos
            produtos={produtos}
            carregando={carregando}
            erro={erro}
            onTentarDeNovo={() => buscarProdutos(busca, categoria)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
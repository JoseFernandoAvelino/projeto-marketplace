import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { formatarPreco, Produto, tempoDesde } from "../lib/produtos";
import { ProdutoCard } from "./ProdutoCard";

interface ListaProdutosProps {
  produtos: Produto[];
  carregando: boolean;
  erro: string;
  onTentarDeNovo: () => void;
}

export function ListaProdutos({ produtos, carregando, erro, onTentarDeNovo }: ListaProdutosProps) {
  if (carregando) {
    return (
      <View className="items-center justify-center py-10">
        <ActivityIndicator size="large" color="#006D43" />
      </View>
    );
  }

  if (erro) {
    return (
      <View className="items-center justify-center py-8 px-5">
        <MaterialIcons name="wifi-off" size={40} color="#A0AAB2" />
        <Text className="text-xs text-[#6D7A70] text-center mt-2">{erro}</Text>
        <TouchableOpacity onPress={onTentarDeNovo} className="mt-3 px-4 py-2 bg-[#E8EEF5] rounded-full">
          <Text className="text-xs font-bold text-[#006D43]">Tentar de novo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (produtos.length === 0) {
    return (
      <View className="items-center justify-center min-h-[150px]">
        <MaterialIcons name="search-off" size={48} color="#A0AAB2" />
        <Text className="text-sm font-bold text-[#6D7A70] mt-2 text-center">
          Nenhum produto encontrado
        </Text>
        <Text className="text-xs text-[#A0AAB2] mt-1 text-center">
          Tente pesquisar outro termo ou categoria.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap justify-between">
      {produtos.map((produto) => (
        <ProdutoCard
          key={produto.id}
          imagem={produto.imagens[0]}
          tag={produto.condicao}
          tagCor="bg-[#006D43]"
          preco={formatarPreco(produto.preco)}
          titulo={produto.titulo}
          local={produto.localizacao || "Local não informado"}
          tempo={tempoDesde(produto.criado_em)}
          onPress={() =>
            router.push({ pathname: "/produto/[id]", params: { id: String(produto.id) } })
          }
        />
      ))}
    </View>
  );
}
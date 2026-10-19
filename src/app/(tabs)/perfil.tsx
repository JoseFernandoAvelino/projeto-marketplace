import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnuncioPerfilCard } from "../../components/AnuncioPerfilCard";
import { Botao } from "../../components/Botao";
import { ConfiguracaoItem } from "../../components/ConfiguracaoItem";
import { EstatisticaPerfil } from "../../components/EstatisticaPerfil";
import { api } from "../../lib/api";
import { formatarPreco, Produto } from "../../lib/produtos";
import { sair, usuarioAtual } from "../../lib/sessao";

export default function Perfil() {
  const usuario = usuarioAtual();
  const [anuncios, setAnuncios] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!usuario) return;
      setCarregando(true);
      api<Produto[]>(`/produtos?vendedor_id=${usuario.id}`)
        .then(setAnuncios)
        .catch(() => setAnuncios([]))
        .finally(() => setCarregando(false));
    }, [usuario?.id]),
  );

  function sairDaConta() {
    sair();
    router.replace("/");
  }

  const confirmarExclusao = (id: number) => {
    Alert.alert(
      "Excluir Anúncio",
      "Tem certeza que deseja apagar este anúncio permanentemente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => executarExclusao(id),
        },
      ],
    );
  };

  const executarExclusao = async (id: number) => {
    try {
      await api(`/produtos/${id}`, { metodo: "DELETE" });
      setAnuncios((prev) => prev.filter((p) => p.id !== id));
      Alert.alert("Sucesso", "O anúncio foi removido permanentemente.");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível excluir o anúncio.",
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <View className="flex-row justify-between items-center px-5 pt-2 pb-4 bg-[#F7F8FC]">
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
              Meu Perfil
            </Text>
          </View>
        </View>
        <View className="flex-row items-center pl-4">
          <View className="w-9 h-9 rounded-full bg-[#E8EEF5] items-center justify-center overflow-hidden">
            <MaterialIcons name="settings" size={24} color="#006D43" />
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="items-center mt-2 px-5">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-[#E8EEF5] items-center justify-center border-4 border-white shadow-sm elevation-2">
              <MaterialIcons name="person" size={48} color="#A0AAB2" />
            </View>
            <TouchableOpacity className="absolute top-0 right-0 bg-white p-1.5 rounded-full shadow-sm elevation-1">
              <MaterialIcons name="photo-camera" size={14} color="#0051D5" />
            </TouchableOpacity>
            <View className="absolute bottom-0 right-2 bg-white rounded-full p-0.5 shadow-sm elevation-1">
              <MaterialIcons name="verified" size={20} color="#00995D" />
            </View>
          </View>
          <View className="flex-row items-center mt-3">
            <Text className="text-xl font-black text-[#111]">
              {usuario?.nome ?? "Visitante"}
            </Text>
            <View className="flex-row items-center bg-[#EAF3EE] px-2 py-0.5 rounded-full ml-2">
              <MaterialIcons name="security" size={10} color="#00995D" />
              <Text className="text-[9px] font-bold text-[#00995D] ml-1">
                Verificado
              </Text>
            </View>
          </View>
          <View className="flex-row items-center mt-1">
            <MaterialIcons name="calendar-today" size={10} color="#6D7A70" />
            <Text className="text-[11px] text-[#6D7A70] ml-1">
              {usuario?.email ?? "Faça login para ver seus anúncios"}
            </Text>
          </View>
        </View>
        <View className="bg-white mx-5 mt-6 rounded-2xl flex-row items-center py-2 shadow-sm elevation-1 border border-[#F2F5F9]">
          <EstatisticaPerfil valor="12" label="Vendas" icone="shopping-bag" />
          <View className="w-[1px] h-10 bg-[#F2F5F9]" />
          <EstatisticaPerfil
            valor="4.9"
            label="48 avaliações"
            icone="star"
            corIcone="#F59E0B"
          />
          <View className="w-[1px] h-10 bg-[#F2F5F9]" />
          <EstatisticaPerfil
            valor="100%"
            label="Responsivo"
            icone="bolt"
            corIcone="#0051D5"
          />
        </View>
        <View className="px-5 mt-5">
          <Botao
            titulo="Criar novo anúncio"
            icone="add-circle-outline"
            onPress={() => router.push("/(tabs)/anunciar")}
            style={{ marginTop: 0 }}
          />
        </View>
        <View className="px-5 mt-8 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-[#111]">
                Meus Anúncios
              </Text>
              <View className="bg-[#E8EEF5] px-2 py-0.5 rounded-full ml-2">
                <Text className="text-[10px] font-bold text-[#0051D5]">
                  {anuncios.length}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <MaterialIcons name="filter-list" size={16} color="#006D43" />
              <Text className="text-xs font-bold text-[#006D43] ml-1">
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row bg-[#F2F5F9] rounded-full p-1 mb-4">
            <TouchableOpacity className="flex-1 bg-white py-2 rounded-full items-center shadow-sm">
              <Text className="text-[11px] font-bold text-[#111]">
                Ativos ({anuncios.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-2 rounded-full items-center">
              <Text className="text-[11px] text-[#6D7A70]">Vendidos (0)</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-2 rounded-full items-center">
              <Text className="text-[11px] text-[#6D7A70]">Pausados (0)</Text>
            </TouchableOpacity>
          </View>
          {carregando && usuario ? (
            <ActivityIndicator color="#006D43" style={{ marginVertical: 24 }} />
          ) : anuncios.length === 0 ? (
            <Text className="text-xs text-[#6D7A70] text-center my-6">
              Você ainda não tem anúncios publicados.
            </Text>
          ) : (
            anuncios.map((anuncio) => (
              <AnuncioPerfilCard
                key={anuncio.id}
                titulo={anuncio.titulo}
                preco={formatarPreco(anuncio.preco)}
                local={anuncio.localizacao}
                imagem={anuncio.imagens?.[0]}
                onPress={() =>
                  router.push({
                    pathname: "/produto/[id]",
                    params: { id: String(anuncio.id) },
                  })
                }
                onEditar={() =>
                  router.push({
                    pathname: "/editar/[id]",
                    params: { id: String(anuncio.id) },
                  })
                }
                onExcluir={() => confirmarExclusao(anuncio.id)}
              />
            ))
          )}
        </View>
        <View className="px-5 mt-4 mb-8">
          <Text className="text-lg font-bold text-[#111] mb-2">
            Configurações da Conta
          </Text>
          <View className="bg-white rounded-2xl px-4 py-1 border border-[#F2F5F9] shadow-sm elevation-1">
            <ConfiguracaoItem
              titulo="Dados Pessoais e Endereço"
              subtitulo="Verifique ou altere seus dados pessoais e endereço"
              icone="badge"
            />
            <ConfiguracaoItem
              titulo="Planos e Assinaturas"
              subtitulo="Destaque seu perfil e seus itens"
              icone="store"
            />
            <ConfiguracaoItem
              titulo="Pagamentos"
              subtitulo="Configure e revise seus pagamentos"
              icone="account-balance-wallet"
            />
            <ConfiguracaoItem
              titulo="Segurança & Verificação"
              subtitulo="Autentique sua conta e ganhe o selo de verificado"
              icone="security"
            />
            <ConfiguracaoItem
              titulo="Configurações do App"
              subtitulo="Configure o app da sua maneira"
              icone="settings"
            />
          </View>
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-center mx-5 py-4 bg-white rounded-2xl border border-[#F2F5F9] shadow-sm elevation-1"
          onPress={sairDaConta}
        >
          <MaterialIcons name="logout" size={20} color="#D32F2F" />
          <Text className="text-sm font-bold text-[#D32F2F] ml-2">
            Sair da Conta
          </Text>
        </TouchableOpacity>

        <Text className="text-[10px] text-[#A0AAB2] text-center mt-6 mb-4">
          App Marketplace
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

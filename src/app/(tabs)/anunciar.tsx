import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Botao } from "../../components/Botao";
import { CabecalhoTela } from "../../components/CabecalhoTela";
import { SeletorOpcao } from "../../components/SeletorOpcao";
import { ToggleSwitch } from "../../components/ToggleSwitch";

export default function NovoAnuncio() {
  const insets = useSafeAreaInsets();
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [condicao, setCondicao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [aceitaProposta, setAceitaProposta] = useState(true);
  const [fazEntrega, setFazEntrega] = useState(false);
  const [aceitaTroca, setAceitaTroca] = useState(false);

  const categorias = [
    {
      id: "celulares",
      nome: "Eletrônicos & Tech",
      icone: "smartphone" as const,
    },
    { id: "moveis", nome: "Móveis & Casa", icone: "chair" as const },
    { id: "moda", nome: "Moda & Acesso.", icone: "checkroom" as const },
    { id: "veiculos", nome: "Veículos", icone: "directions-car" as const },
    { id: "esportes", nome: "Esportes & Lazer", icone: "pedal-bike" as const },
    { id: "livros", nome: "Livros & Jogos", icone: "menu-book" as const },
    { id: "brinquedos", nome: "Brinquedos", icone: "smart-toy" as const },
    { id: "outras", nome: "Outras Categorias", icone: "grid-view" as const },
  ];

  const condicoes = ["Novo", "Ótimo estado", "Usado"];

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <CabecalhoTela titulo="Novo Anúncio" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-5 pt-5 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base font-bold text-[#111]">
                Fotos do Produto
              </Text>
              <View className="bg-[#EAF3EE] px-2 py-1 rounded-md">
                <Text className="text-[10px] font-bold text-[#00995D]">
                  Até 6 fotos
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              <TouchableOpacity className="w-24 h-24 bg-[#E8EEF5] rounded-xl items-center justify-center mr-3 border border-[#D3DAEF] border-dashed">
                <View className="w-10 h-10 bg-[#00995D] rounded-full items-center justify-center mb-1">
                  <MaterialIcons name="add-a-photo" size={20} color="#FFF" />
                </View>
                <Text className="text-[10px] font-bold text-[#006D43]">
                  Adicionar Fotos
                </Text>
                <Text className="text-[9px] text-[#6D7A70]">
                  Galeria / Câmera
                </Text>
              </TouchableOpacity>
              <View className="w-24 h-24 bg-[#E8EEF5] rounded-xl items-center justify-center mr-3 border border-[#D3DAEF] relative">
                <MaterialIcons name="image" size={32} color="#A0AAB2" />
                <View className="absolute top-1.5 left-1.5 bg-[#00995D] px-1.5 py-0.5 rounded">
                  <Text className="text-[8px] font-bold text-white uppercase">
                    Principal
                  </Text>
                </View>
                <TouchableOpacity className="absolute top-1.5 right-1.5 bg-[#111] rounded-full p-1">
                  <MaterialIcons name="close" size={10} color="#FFF" />
                </TouchableOpacity>
              </View>
              <View className="w-24 h-24 bg-[#E8EEF5] rounded-xl items-center justify-center mr-3 border border-[#D3DAEF] relative">
                <MaterialIcons name="image" size={32} color="#A0AAB2" />
                <TouchableOpacity className="absolute top-1.5 right-1.5 bg-[#111] rounded-full p-1">
                  <MaterialIcons name="close" size={10} color="#FFF" />
                </TouchableOpacity>
              </View>
            </ScrollView>
            <Text className="text-[11px] text-[#6D7A70] mt-2 leading-tight">
              Dica: Anúncios com 3 ou mais fotos nítidas vendem até 4x mais
              rápido!
            </Text>
          </View>
          <View className="px-5 mb-6">
            <Text className="text-sm font-bold text-[#111] mb-2">
              Título do Produto *
            </Text>
            <View className="bg-[#F2F5F9] rounded-xl px-4 py-3 relative">
              <TextInput
                className="text-sm text-[#111] pr-10 min-h-[20px]"
                placeholder="Ex: Smartphone 128GB"
                placeholderTextColor="#A0AAB2"
                value={titulo}
                onChangeText={setTitulo}
                maxLength={70}
              />
              <Text className="absolute right-3 top-3 text-[10px] text-[#A0AAB2]">
                {titulo.length}/70
              </Text>
            </View>
          </View>
          <View className="px-5 mb-3">
            <Text className="text-sm font-bold text-[#111] mb-3">
              Categoria *
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {categorias.map((cat) => (
                <SeletorOpcao
                  key={cat.id}
                  titulo={cat.nome}
                  icone={cat.icone}
                  selecionado={categoria === cat.id}
                  onPress={() => setCategoria(cat.id)}
                  estiloContainer="w-[48%] mb-3"
                />
              ))}
            </View>
          </View>
          <View className="px-5 mb-6">
            <Text className="text-sm font-bold text-[#111] mb-2">
              Preço de Venda *
            </Text>
            <View className="bg-white rounded-xl px-4 py-4 mb-4 border border-[#E8EEF5] shadow-sm elevation-1 flex-row items-center">
              <Text className="text-xl font-bold text-[#00995D] mr-2">R$</Text>
              <TextInput
                className="flex-1 text-2xl font-black text-[#111] min-h-[30px]"
                placeholder="0,00"
                placeholderTextColor="#A0AAB2"
                keyboardType="numeric"
                value={preco}
                onChangeText={setPreco}
              />
            </View>
            <View className="mb-2">
              <ToggleSwitch
                ativo={aceitaProposta}
                onToggle={() => setAceitaProposta(!aceitaProposta)}
                titulo="Aceito propostas e negociação"
                subtitulo="Aumenta suas chances de fechar negócio rápido"
              />
            </View>
            <View className="mb-2">
              <ToggleSwitch
                ativo={fazEntrega}
                onToggle={() => setFazEntrega(!fazEntrega)}
                titulo="Faço entrega"
                subtitulo="Posso entregar em locais combinados"
              />
            </View>
            <View className="mb-2">
              <ToggleSwitch
                ativo={aceitaTroca}
                onToggle={() => setAceitaTroca(!aceitaTroca)}
                titulo="Aceito trocas"
                subtitulo="Estou aberto a negociar por outros itens"
              />
            </View>
          </View>
          <View className="px-5 mb-6">
            <Text className="text-sm font-bold text-[#111] mb-3">
              Condição do Produto *
            </Text>
            <View className="flex-row justify-between">
              {condicoes.map((cond) => (
                <SeletorOpcao
                  key={cond}
                  titulo={cond}
                  selecionado={condicao === cond}
                  onPress={() => setCondicao(cond)}
                  estiloContainer="flex-1 mx-1"
                  variante="solido"
                />
              ))}
            </View>
          </View>
          <View className="px-5 mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-bold text-[#111]">
                Descrição detalhada
              </Text>
              <Text className="text-[11px] text-[#A0AAB2]">Opcional</Text>
            </View>
            <View className="bg-[#F2F5F9] rounded-xl px-4 py-3 min-h-[100px]">
              <TextInput
                className="text-sm text-[#111] leading-relaxed"
                placeholder="Descreva o produto, tempo de uso, motivo do desapego, se possui caixa, cabos ou nota fiscal..."
                placeholderTextColor="#A0AAB2"
                multiline
                textAlignVertical="top"
                value={descricao}
                onChangeText={setDescricao}
              />
            </View>
          </View>
          <View className="px-5 mb-6">
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="location-on" size={16} color="#006D43" />
              <Text className="text-sm font-bold text-[#111] ml-1">
                Localização Aproximada
              </Text>
            </View>
            <View className="flex-row items-center mb-5">
              <View className="flex-1 bg-white rounded-xl px-4 py-3 mr-2 border border-[#E8EEF5]">
                <Text className="text-sm text-[#111]">
                  Centro, Surubim - PE
                </Text>
              </View>
              <TouchableOpacity className="bg-[#E8EEF5] flex-row items-center px-4 py-3 rounded-xl">
                <MaterialIcons name="my-location" size={16} color="#111" />
                <Text className="text-xs font-bold text-[#111] ml-2">
                  Atual
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mt-3 bg-[#EAF3EE] p-3 rounded-xl">
              <MaterialIcons
                name="check-circle-outline"
                size={16}
                color="#00995D"
              />
              <Text className="text-[11px] text-[#006D43] ml-2 flex-1 leading-tight">
                Combine os detalhes de entrega ou troca diretamente no chat do
                app de forma segura.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        className="absolute bottom-0 w-full bg-white px-5 pt-3 pb-2 border-t border-[#F2F5F9]"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <Botao
          titulo="Publicar Anúncio"
          icone="send"
          onPress={() => router.push("/(tabs)/home")}
          style={{ marginTop: 0 }}
        />
      </View>
    </SafeAreaView>
  );
}

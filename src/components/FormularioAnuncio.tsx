import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { FileSystemUploadType } from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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
import { api, API_URL } from "../lib/api";
import { CATEGORIAS, CONDICOES, lerPreco, Produto } from "../lib/produtos";
import { usuarioAtual } from "../lib/sessao";
import { Botao } from "./Botao";
import { CabecalhoTela } from "./CabecalhoTela";
import { SeletorOpcao } from "./SeletorOpcao";
import { ToggleSwitch } from "./ToggleSwitch";

interface FormularioAnuncioProps {
  produtoId?: number;
}

export function FormularioAnuncio({ produtoId }: FormularioAnuncioProps) {
  const ehEdicao = produtoId !== undefined;
  const insets = useSafeAreaInsets();
  const [fotos, setFotos] = useState<string[]>([]);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [condicao, setCondicao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("Centro, Surubim - PE");
  const [aceitaProposta, setAceitaProposta] = useState(true);
  const [fazEntrega, setFazEntrega] = useState(false);
  const [aceitaTroca, setAceitaTroca] = useState(false);
  const [carregandoProduto, setCarregandoProduto] = useState(ehEdicao);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!ehEdicao) return;
    api<Produto>(`/produtos/${produtoId}`)
      .then((p) => {
        setTitulo(p.titulo);
        setCategoria(p.categoria);
        setPreco(String(p.preco).replace(".", ","));
        setCondicao(p.condicao);
        setDescricao(p.descricao);
        setLocalizacao(p.localizacao);
        setAceitaProposta(p.aceita_proposta);
        setFazEntrega(p.faz_entrega);
        setAceitaTroca(p.aceita_troca);
      })
      .catch((e) =>
        Alert.alert(
          "Erro",
          e instanceof Error ? e.message : "Erro ao carregar o anúncio.",
        ),
      )
      .finally(() => setCarregandoProduto(false));
  }, [produtoId]);

  function limparFormulario() {
    setFotos([]);
    setTitulo("");
    setCategoria("");
    setPreco("");
    setCondicao("");
    setDescricao("");
    setAceitaProposta(true);
    setFazEntrega(false);
    setAceitaTroca(false);
  }

  const adicionarFoto = () => {
    if (fotos.length >= 6) {
      Alert.alert("Limite", "Você pode enviar no máximo 6 fotos.");
      return;
    }

    Alert.alert("Adicionar Foto", "Escolha de onde deseja enviar a foto", [
      { text: "Tirar Foto", onPress: abrirCamera },
      { text: "Escolher da Galeria", onPress: abrirGaleria },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const abrirCamera = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (permissao.status !== "granted") {
      Alert.alert(
        "Permissão Necessária",
        "Precisamos de acesso à câmera para tirar fotos.",
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setFotos([...fotos, resultado.assets[0].uri]);
    }
  };

  const abrirGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setFotos([...fotos, resultado.assets[0].uri]);
    }
  };

  const removerFoto = (indexParaRemover: number) => {
    setFotos(fotos.filter((_, index) => index !== indexParaRemover));
  };

  async function salvar() {
    const usuario = usuarioAtual();
    if (!usuario) {
      Alert.alert("Faça login", "Entre na sua conta para anunciar.");
      return router.replace("/");
    }

    const valor = lerPreco(preco);
    if (fotos.length === 0)
      return Alert.alert("Atenção", "Adicione pelo menos 1 foto.");
    if (!titulo.trim())
      return Alert.alert("Atenção", "Informe o título do produto.");
    if (!categoria) return Alert.alert("Atenção", "Escolha uma categoria.");
    if (Number.isNaN(valor) || valor < 0)
      return Alert.alert("Atenção", "Informe um preço válido.");
    if (!condicao)
      return Alert.alert("Atenção", "Escolha a condição do produto.");

    setSalvando(true);
    try {
      const urlsFinais = [];

      for (const uri of fotos) {
        if (uri.startsWith("http")) {
          urlsFinais.push(uri);
        } else {
          const response = await FileSystem.uploadAsync(
            `${API_URL}/uploads`,
            uri,
            {
              fieldName: "file",
              httpMethod: "POST",
              uploadType: FileSystemUploadType.MULTIPART,
            },
          );

          if (response.status !== 200) {
            throw new Error("Falha ao fazer upload da imagem");
          }

          const data = JSON.parse(response.body);

          urlsFinais.push(`${API_URL}${data.url}`);
        }
      }

      const dados = {
        usuario_id: usuario.id,
        imagens: urlsFinais,
        titulo: titulo.trim(),
        categoria,
        preco: valor,
        condicao,
        descricao: descricao.trim(),
        localizacao: localizacao.trim(),
        aceita_proposta: aceitaProposta,
        faz_entrega: fazEntrega,
        aceita_troca: aceitaTroca,
      };

      if (ehEdicao) {
        await api(`/produtos/${produtoId}`, { metodo: "PUT", corpo: dados });
        Alert.alert("Pronto!", "Anúncio atualizado.");
        router.back();
      } else {
        const criado = await api<Produto>("/produtos", {
          metodo: "POST",
          corpo: dados,
        });
        limparFormulario();
        Alert.alert("Pronto!", "Seu anúncio foi publicado.");
        router.push({
          pathname: "/produto/[id]",
          params: { id: String(criado.id) },
        });
      }
    } catch (e) {
      Alert.alert(
        "Erro",
        e instanceof Error ? e.message : "Não foi possível salvar o anúncio.",
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregandoProduto) {
    return (
      <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
        <CabecalhoTela titulo="Editar Anúncio" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#006D43" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]" edges={["top"]}>
      <CabecalhoTela titulo={ehEdicao ? "Editar Anúncio" : "Novo Anúncio"} />
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
                Fotos do Produto *
              </Text>
              <View className="bg-[#EAF3EE] px-2 py-1 rounded-md">
                <Text className="text-[10px] font-bold text-[#00995D]">
                  {fotos.length}/6 fotos
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {fotos.length < 6 && (
                <TouchableOpacity
                  className="w-24 h-24 mr-3 bg-[#E8EEF5] rounded-xl items-center justify-center border border-[#D3DAEF] border-dashed"
                  onPress={adicionarFoto}
                >
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
              )}

              {fotos.map((uri, index) => (
                <View
                  key={index}
                  className="w-24 h-24 rounded-xl mr-3 relative border border-[#E8EEF5]"
                >
                  <Image
                    source={{ uri }}
                    className="w-full h-full rounded-xl"
                  />

                  {index === 0 && (
                    <View className="absolute top-1.5 left-1.5 bg-[#00995D] px-1.5 py-0.5 rounded">
                      <Text className="text-[8px] font-bold text-white uppercase">
                        Principal
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => removerFoto(index)}
                    className="absolute top-1.5 right-1.5 bg-[#111] rounded-full p-1 opacity-80"
                  >
                    <MaterialIcons name="close" size={12} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
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
              {CATEGORIAS.map((cat) => (
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
              {CONDICOES.map((cond) => (
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
            <View className="bg-white rounded-xl px-4 py-3 border border-[#E8EEF5]">
              <TextInput
                className="text-sm text-[#111]"
                placeholder="Ex: Centro, Surubim - PE"
                placeholderTextColor="#A0AAB2"
                value={localizacao}
                onChangeText={setLocalizacao}
                maxLength={120}
              />
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
          titulo={
            salvando
              ? "Salvando..."
              : ehEdicao
                ? "Salvar Alterações"
                : "Publicar Anúncio"
          }
          icone={ehEdicao ? "check" : "send"}
          onPress={salvar}
          disabled={salvando}
          style={{ marginTop: 0 }}
        />
      </View>
    </SafeAreaView>
  );
}

import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Botao } from "../components/Botao";
import { CabecalhoAuth } from "../components/CabecalhoAuth";
import { Input } from "../components/Input";
import { api } from "../lib/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function lidarComCadastro() {
    setErro("");
    setSucesso("");
    if (!nome.trim() || !cpf.trim() || !email.trim() || !senha) {
      return setErro("Preencha todos os campos.");
    }
    if (senha !== confirmarSenha) return setErro("As senhas não coincidem.");
    setCarregando(true);
    try {
      await api("/usuarios", {
        metodo: "POST",
        corpo: { nome: nome.trim(), cpf, email: email.trim(), senha },
      });
      setSucesso("Cadastro realizado! Redirecionando...");
      setTimeout(() => router.replace("/"), 1200);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível cadastrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1 bg-[#F7F8FC]"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 32,
            paddingBottom: 32,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <CabecalhoAuth
            icone="person-add-alt-1"
            titulo="Criar Conta"
            subtitulo={
              "Junte-se à nossa comunidade e comece\na comprar e vender hoje mesmo."
            }
          />
          <View className="w-full bg-white rounded-2xl p-6 shadow-sm elevation-2">
            <Text className="text-xs font-bold text-[#555] mb-2">
              Nome completo
            </Text>
            <Input
              icone="person-outline"
              placeholder="Seu nome"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
            <Text className="text-xs font-bold text-[#555] mb-2 -mt-1">
              CPF
            </Text>
            <Input
              icone="badge"
              placeholder="000.000.000-00"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              maxLength={14}
            />
            <Text className="text-xs font-bold text-[#555] mb-2 -mt-1">
              E-mail
            </Text>
            <Input
              icone="mail-outline"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text className="text-xs font-bold text-[#555] mb-2 -mt-1">
              Senha (mín. 6 caracteres)
            </Text>
            <Input
              icone="lock-outline"
              placeholder="Crie uma senha forte"
              value={senha}
              onChangeText={setSenha}
              ehSenha
            />
            <Text className="text-xs font-bold text-[#555] mb-2 -mt-1">
              Confirmar senha
            </Text>
            <Input
              icone="lock-outline"
              placeholder="Repita sua senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              ehSenha
            />
            {erro ? (
              <Text className="text-[#D32F2F] text-xs text-center mb-4 font-bold">
                {erro}
              </Text>
            ) : null}
            {sucesso ? (
              <Text className="text-[#00995D] text-[13px] text-center mb-4 font-bold">
                {sucesso}
              </Text>
            ) : null}
            <Botao
              titulo={carregando ? "Cadastrando..." : "Cadastrar"}
              icone="check"
              onPress={lidarComCadastro}
              disabled={carregando}
            />
          </View>
          <View className="flex-row mt-8 items-center justify-center">
            <Text className="text-sm text-[#666]">Já tem conta? </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text className="text-sm font-bold text-[#008B74]">Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
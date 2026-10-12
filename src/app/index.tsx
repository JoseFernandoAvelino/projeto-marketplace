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
import { validarLogin } from "../lib/auth-store";

export default function Login() {
  const [email, setEmail] = useState("teste@app.com");
  const [senha, setSenha] = useState("123456");
  const [erro, setErro] = useState("");

  function lidarComEntrada() {
    setErro("");
    if (!email.trim() || !senha) return setErro("Preencha e-mail e senha.");
    try {
      validarLogin(email, senha);
      router.replace("/(tabs)/home");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível entrar.");
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
            ehLogo
            icone="storefront"
            titulo="Bem-vindo!"
            subtitulo={
              "Entre na sua conta para comprar e vender\ncom facilidade na sua cidade."
            }
          />
          <View className="w-full bg-white rounded-2xl p-6 shadow-sm elevation-2">
            <Text className="text-xs font-bold text-[#555] mb-2">E-mail</Text>
            <Input
              icone="mail-outline"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View className="flex-row justify-between items-center mb-2 -mt-1">
              <Text className="text-xs font-bold text-[#555]">Senha</Text>
              <TouchableOpacity>
                <Text className="text-xs font-bold text-[#0051D5]">
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>
            </View>
            <Input
              icone="lock-outline"
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              ehSenha
            />
            {erro ? (
              <Text className="text-[#D32F2F] text-xs text-center mb-4 font-bold">
                {erro}
              </Text>
            ) : null}
            <Botao
              titulo="Entrar"
              icone="arrow-forward"
              onPress={lidarComEntrada}
            />
          </View>
          <View className="flex-row mt-8 items-center justify-center">
            <Text className="text-sm text-[#666]">Ainda não tem conta? </Text>
            <TouchableOpacity onPress={() => router.push("/cadastro")}>
              <Text className="text-sm font-bold text-[#008B74]">
                Cadastre-se grátis
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

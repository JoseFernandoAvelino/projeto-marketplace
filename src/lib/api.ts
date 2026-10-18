import Constants from "expo-constants";
const ENDERECO_FIXO = "192.168.1.5";

function descobrirEndereco() {
  if (ENDERECO_FIXO) return ENDERECO_FIXO;
  const hostUri = Constants.expoConfig?.hostUri;
  const ip = hostUri ? hostUri.split(":")[0] : "localhost";
  return `http://${ip}:3333`;
}

export const API_URL = descobrirEndereco();

type Opcoes = {
  metodo?: "GET" | "POST" | "PUT" | "DELETE";
  corpo?: unknown;
};

export async function api<T = any>(caminho: string, opcoes: Opcoes = {}): Promise<T> {
  let resposta: Response;
  try {
    resposta = await fetch(API_URL + caminho, {
      method: opcoes.metodo ?? "GET",
      headers: { "Content-Type": "application/json" },
      body: opcoes.corpo !== undefined ? JSON.stringify(opcoes.corpo) : undefined,
    });
  } catch {
    throw new Error(
      `Não foi possível conectar à API (${API_URL}). Confira se o backend está rodando e se o celular está no mesmo Wi-Fi.`
    );
  }

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const detalhe = dados?.detail;
    if (typeof detalhe === "string") throw new Error(detalhe);
    if (resposta.status === 422) throw new Error("Confira os campos preenchidos.");
    throw new Error("Algo deu errado. Tente novamente.");
  }
  return dados as T;
}
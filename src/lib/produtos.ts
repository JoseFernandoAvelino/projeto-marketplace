import { MaterialIcons } from "@expo/vector-icons";

export interface Produto {
  id: number;
  vendedor_id: number;
  vendedor_nome?: string;
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number;
  condicao: string;
  aceita_proposta: boolean;
  faz_entrega: boolean;
  aceita_troca: boolean;
  localizacao: string;
  imagens: string[];
  criado_em: string;
}

export const CATEGORIAS: {
  id: string;
  nome: string;
  icone: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { id: "celulares", nome: "Eletrônicos & Tech", icone: "smartphone" },
  { id: "moveis", nome: "Móveis & Casa", icone: "chair" },
  { id: "moda", nome: "Moda & Acesso.", icone: "checkroom" },
  { id: "veiculos", nome: "Veículos", icone: "directions-car" },
  { id: "esportes", nome: "Esportes & Lazer", icone: "pedal-bike" },
  { id: "livros", nome: "Livros & Jogos", icone: "menu-book" },
  { id: "brinquedos", nome: "Brinquedos", icone: "smart-toy" },
  { id: "outras", nome: "Outras Categorias", icone: "grid-view" },
];

export const CONDICOES = ["Novo", "Ótimo estado", "Usado"];
export function formatarPreco(valor: number) {
  const temCentavos = valor % 1 !== 0;
  return (
    "R$ " +
    valor.toLocaleString("pt-BR", {
      minimumFractionDigits: temCentavos ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
}


export function lerPreco(texto: string) {
  let limpo = texto.replace(/[R$\s]/g, "");
  if (limpo.includes(",")) limpo = limpo.replace(/\./g, "").replace(",", ".");
  return limpo ? Number(limpo) : NaN;
}


export function tempoDesde(data: string) {
  const quando = new Date(/[zZ]|[+-]\d\d:\d\d$/.test(data) ? data : data + "Z");
  const minutos = Math.floor((Date.now() - quando.getTime()) / 60000);
  if (minutos < 1) return "Agora mesmo";
  if (minutos < 60) return `Há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `Há ${horas} hora${horas > 1 ? "s" : ""}`;
  const dias = Math.floor(horas / 24);
  return `Há ${dias} dia${dias > 1 ? "s" : ""}`;
}
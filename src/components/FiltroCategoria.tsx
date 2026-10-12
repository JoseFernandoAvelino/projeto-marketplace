import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

interface FiltroCategoriaProps {
  titulo: string;
  icone: keyof typeof MaterialIcons.glyphMap;
  ativo?: boolean;
  corPrincipal?: string;
  corFundo?: string;
}

export function FiltroCategoria({
  titulo,
  icone,
  ativo,
  corPrincipal,
  corFundo,
}: FiltroCategoriaProps) {
  if (ativo) {
    return (
      <TouchableOpacity className="flex-row items-center bg-[#111] px-4 py-2.5 rounded-full">
        <MaterialIcons name={icone} size={16} color="#FFF" />
        <Text className="text-white text-sm font-bold ml-2">{titulo}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`flex-row items-center ${corFundo} px-4 py-2.5 rounded-full`}
    >
      <MaterialIcons name={icone} size={16} color={corPrincipal} />
      <Text style={{ color: corPrincipal }} className="text-sm font-bold ml-2">
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

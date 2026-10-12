import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

interface SeletorOpcaoProps {
  titulo: string;
  icone?: keyof typeof MaterialIcons.glyphMap;
  selecionado: boolean;
  onPress: () => void;
  estiloContainer?: string;
  variante?: "contorno" | "solido";
}

export function SeletorOpcao({
  titulo,
  icone,
  selecionado,
  onPress,
  estiloContainer = "",
  variante = "contorno",
}: SeletorOpcaoProps) {
  const bgAtivo =
    variante === "solido"
      ? "bg-[#00995D]"
      : "bg-[#EAF3EE] border border-[#00995D]";
  const bgInativo = "bg-[#F2F5F9] border border-transparent";
  const textoAtivo = variante === "solido" ? "text-white" : "text-[#00995D]";
  const textoInativo = "text-[#111]";
  const iconeCorAtiva = variante === "solido" ? "#FFFFFF" : "#00995D";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center px-3 py-3 rounded-xl ${selecionado ? bgAtivo : bgInativo} ${estiloContainer}`}
    >
      {icone && (
        <MaterialIcons
          name={icone}
          size={18}
          color={selecionado ? iconeCorAtiva : "#006D43"}
        />
      )}
      <Text
        className={`text-xs font-bold ${icone ? "ml-2" : ""} ${selecionado ? textoAtivo : textoInativo}`}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

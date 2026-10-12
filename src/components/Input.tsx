import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

interface InputProps extends TextInputProps {
  icone: keyof typeof MaterialIcons.glyphMap;
  ehSenha?: boolean;
}

export function Input({ icone, ehSenha, ...resto }: InputProps) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <View className="flex-row items-center bg-[#F2F5F9] rounded-xl h-[52px] px-4 mb-5">
      <MaterialIcons name={icone} size={20} color="#6D7A70" className="mr-2" />
      <TextInput
        className="flex-1 text-sm text-[#111] h-full"
        placeholderTextColor="#A0AAB2"
        secureTextEntry={ehSenha && !mostrar}
        {...resto}
      />
      {ehSenha && (
        <TouchableOpacity onPress={() => setMostrar(!mostrar)} className="p-1">
          <MaterialIcons
            name={mostrar ? "visibility" : "visibility-off"}
            size={20}
            color="#6D7A70"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

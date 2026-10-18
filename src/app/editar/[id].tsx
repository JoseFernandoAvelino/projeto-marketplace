import { useLocalSearchParams } from "expo-router";
import { FormularioAnuncio } from "../../components/FormularioAnuncio";

export default function EditarAnuncio() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <FormularioAnuncio produtoId={Number(id)} />;
}
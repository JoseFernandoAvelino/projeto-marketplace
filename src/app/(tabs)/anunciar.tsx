import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Anunciar() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Novo Anúncio</Text>

      <TouchableOpacity style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>+ Adicionar Fotos</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Título do produto" />
      <TextInput
        style={styles.input}
        placeholder="Preço (R$)"
        keyboardType="numeric"
      />
      <TextInput style={styles.input} placeholder="Condição (Novo ou Usado)" />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do produto detalhada..."
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Publicar Produto"
          onPress={() => alert("Anúncio criado!")}
          color="#007BFF"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  imagePlaceholder: {
    height: 150,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderStyle: "dashed",
  },
  imageText: { color: "#6c757d", fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: { height: 100 },
  buttonContainer: { marginTop: 10 },
});

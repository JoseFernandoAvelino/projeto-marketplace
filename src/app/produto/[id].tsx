import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetalhesProduto() {
  const { nome, preco, status } = useLocalSearchParams();

  const vendedor = {
    nome: "João Pedro Holanda",
    avaliacao: "4.9 (20 avaliações)",
    membroDesde: "Membro desde 2026",
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />

      <View style={styles.productInfo}>
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.price}>{preco}</Text>
        <Text style={styles.desc}>Condição: {status}</Text>
      </View>

      <Text style={styles.sectionTitle}>Sobre o Vendedor</Text>
      <TouchableOpacity
        style={styles.sellerCard}
        onPress={() => router.push("/(tabs)/perfil" as any)}
      >
        <View style={styles.sellerAvatar} />
        <View style={styles.sellerDetails}>
          <Text style={styles.sellerName}>{vendedor.nome}</Text>
          <Text style={styles.sellerRating}>{vendedor.avaliacao}</Text>
          <Text style={styles.sellerTime}>{vendedor.membroDesde}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="Chat Interno"
          onPress={() => router.push("/(tabs)/mensagens")}
        />
        <View style={{ height: 10 }} />
        <Button
          title="Comprar pelo WhatsApp"
          color="#25D366"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  imagePlaceholder: {
    height: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 15,
  },
  productInfo: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  price: { fontSize: 20, color: "green", marginVertical: 5, fontWeight: "600" },
  desc: { fontSize: 16, color: "#555" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  sellerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 25,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 15,
  },
  sellerDetails: { flex: 1 },
  sellerName: { fontSize: 16, fontWeight: "bold", color: "#000" },
  sellerRating: { fontSize: 14, color: "#ff9900", marginTop: 2 },
  sellerTime: { fontSize: 12, color: "#888", marginTop: 2 },

  buttonContainer: { marginTop: "auto", paddingBottom: 20 },
});

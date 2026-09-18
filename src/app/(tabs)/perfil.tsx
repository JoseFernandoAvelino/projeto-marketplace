import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface MeuProduto {
  id: string;
  nome: string;
  preco: string;
}

const meusAnuncios: MeuProduto[] = [
  { id: "1", nome: "Perfume 100ml", preco: "R$ 129,00" },
  { id: "2", nome: "Celular 128 Gb", preco: "R$ 1199,00" },
];

export default function Perfil() {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Minha Loja</Text>
        <Text style={styles.info}>Vendedor(a) • Membro desde 2026</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Personalizar Tema e Fonte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.adsSection}>
        <Text style={styles.sectionTitle}>Meus Anúncios Ativos</Text>
        <FlatList
          data={meusAnuncios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardPrice}>{item.preco}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profileHeader: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#e6f2ff",
    borderBottomWidth: 1,
    borderColor: "#d0e1f9",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#b3d4ff",
    marginBottom: 15,
  },
  name: { fontSize: 24, fontWeight: "bold", color: "#003366" },
  info: { fontSize: 14, color: "#555", marginTop: 5 },
  editButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 20,
  },
  editButtonText: { color: "#007BFF", fontWeight: "bold" },
  adsSection: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  card: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  cardTitle: { fontSize: 16 },
  cardPrice: { fontSize: 16, fontWeight: "bold", color: "green", marginTop: 5 },
});

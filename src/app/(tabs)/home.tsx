import { router } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Produto {
  id: string;
  nome: string;
  preco: string;
  status: string;
}

const produtos: Produto[] = [
  {
    id: "1",
    nome: "Perfume 100ml",
    preco: "R$ 129,00",
    status: "Novo",
  },
  {
    id: "2",
    nome: "Celular 128 Gb",
    preco: "R$ 1199,00",
    status: "Novo",
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vitrine</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/produto/[id]",
                params: {
                  id: item.id,
                  nome: item.nome,
                  preco: item.preco,
                  status: item.status,
                },
              })
            }
          >
            <View style={styles.imagePlaceholder} />
            <Text style={styles.title}>{item.nome}</Text>
            <Text style={styles.price}>{item.preco}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    borderRadius: 5,
  },
  title: { fontSize: 16 },
  price: { fontSize: 16, fontWeight: "bold", color: "green", marginTop: 5 },
});

import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Mensagem {
  id: string;
  nome: string;
  ultimaMensagem: string;
  hora: string;
}

const conversas: Mensagem[] = [
  {
    id: "1",
    nome: "Cliente 1",
    ultimaMensagem: "Este perfume está disponível?",
    hora: "10:30",
  },
  {
    id: "2",
    nome: "Cliente 2",
    ultimaMensagem: "Este celular está disponível?",
    hora: "Ontem",
  },
];

export default function Mensagens() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Caixa de Entrada</Text>
      <FlatList
        data={conversas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatCard}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{item.nome}</Text>
              <Text style={styles.chatTime}>{item.hora}</Text>
            </View>
            <Text style={styles.chatText}>{item.ultimaMensagem}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  chatCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  chatName: { fontWeight: "bold", fontSize: 16 },
  chatTime: { fontSize: 12, color: "#888" },
  chatText: { color: "#555" },
});

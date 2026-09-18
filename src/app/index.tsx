import { router } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marketplace App</Text>
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <Button title="Entrar" onPress={() => router.replace("/(tabs)/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

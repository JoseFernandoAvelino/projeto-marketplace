import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="produto/[id]"
        options={{ headerShown: true, title: "Detalhes" }}
      />
    </Stack>
  );
}
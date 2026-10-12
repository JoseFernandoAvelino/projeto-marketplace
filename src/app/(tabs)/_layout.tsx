import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#006D43",
        tabBarInactiveTintColor: "#6D7A70",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: 65 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="storefront" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explorar"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="anunciar"
        options={{
          title: "Anunciar",
          tabBarIcon: () => (
            <View
              className="w-14 h-14 bg-[#00995D] rounded-full items-center justify-center shadow-lg elevation-4"
              style={{ top: -12 }}
            >
              <MaterialIcons name="add" size={32} color="#FFF" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="mensagens"
        options={{
          title: "Conversas",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat-bubble-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

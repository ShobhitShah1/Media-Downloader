import Colors from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          overflow: "hidden",
          position: "absolute",
          backgroundColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
          borderColor: "transparent",
        },
        tabBarActiveTintColor: Colors.dark.primary,
        tabBarInactiveTintColor: Colors.dark.textSecondary,
        tabBarBackground: () => {
          return (
            <BlurView
              intensity={80}
              tint="dark"
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "transparent",
                overflow: "hidden",
              }}
              experimentalBlurMethod="dimezisBlurView"
            />
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Download",
          tabBarIcon: ({ color }) => (
            <Feather name="download" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "History",
          headerBackground: () => {
            return (
              <BlurView
                intensity={80}
                tint="systemMaterialDark"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                }}
                experimentalBlurMethod="dimezisBlurView"
              />
            );
          },
          headerRight: () => {
            return (
              <Pressable style={styles.clearButton}>
                <Ionicons name="trash" size={20} color="white" />
                <Text style={styles.clearButtonText}>Clear All</Text>
              </Pressable>
            );
          },
          tabBarIcon: ({ color }) => (
            <Feather name="clock" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 15,
  },
  clearButtonText: {
    color: "white",
    marginLeft: 5,
  },
});

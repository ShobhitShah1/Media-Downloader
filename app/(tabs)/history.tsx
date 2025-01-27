import { RenderHistoryItem } from "@/components/RenderHistory";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export interface DownloadHistoryItem {
  id: string;
  url: string;
  date: string;
  thumbnail: string;
  platform: string;
  fileName: string;
  fileSize: string;
  quality: string;
}

const mockDownloadHistory: DownloadHistoryItem[] = Array.from(
  { length: 20 },
  (_, i) => {
    return {
      id: i?.toString(),
      url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      date: "2024-01-25",
      thumbnail: "https://picsum.photos/200/120?random=1",
      platform: "YouTube",
      fileName: "Rick Astley - Never Gonna Give You Up.mp4",
      fileSize: "45 MB",
      quality: "720p",
    };
  }
);

export default function HistoryScreen() {
  const height = useBottomTabBarHeight();
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={mockDownloadHistory}
        renderItem={({ item }) => {
          return (
            <RenderHistoryItem
              item={item}
              expandedItemId={expandedItemId}
              setExpandedItemId={setExpandedItemId}
              key={item.id}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No download history</Text>
        }
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: height, paddingTop: 110 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    // paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  clearButtonText: {
    color: "white",
    marginLeft: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.5)",
    marginTop: 50,
  },
});

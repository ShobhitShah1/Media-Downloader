import { RenderHistoryItem } from "@/components/RenderHistory";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

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

const mockDownloadHistory: DownloadHistoryItem[] = [
  {
    id: "1",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2024-01-25",
    thumbnail: "https://picsum.photos/200/120?random=1",
    platform: "YouTube",
    fileName: "Rick Astley - Never Gonna Give You Up.mp4",
    fileSize: "45 MB",
    quality: "720p",
  },
  {
    id: "2",
    url: "https://instagram.com/p/example-post",
    date: "2024-01-24",
    thumbnail: "https://picsum.photos/200/120?random=2",
    platform: "Instagram",
    fileName: "Trending Instagram Reel.mp4",
    fileSize: "35 MB",
    quality: "1080p",
  },
  {
    id: "3",
    url: "https://vimeo.com/video/example",
    date: "2024-01-23",
    thumbnail: "https://picsum.photos/200/120?random=3",
    platform: "Vimeo",
    fileName: "Creative Short Film.mp4",
    fileSize: "85 MB",
    quality: "4K",
  },
];

export default function HistoryScreen() {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [itemOpacities, setItemOpacities] = useState<{ [key: string]: number }>(
    {}
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Download History</Text>
        <Pressable style={styles.clearButton}>
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.clearButtonText}>Clear All</Text>
        </Pressable>
      </View>
      <FlatList
        data={mockDownloadHistory}
        renderItem={({ item }) => {
          return (
            <RenderHistoryItem
              item={item}
              expandedItemId={expandedItemId}
              itemOpacities={itemOpacities}
              setExpandedItemId={setExpandedItemId}
              setItemOpacities={setItemOpacities}
              key={item.id}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No download history</Text>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
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

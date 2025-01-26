import { RenderHistoryItem } from "@/components/RenderHistory";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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

  const renderHistoryItem = ({ item }: { item: DownloadHistoryItem }) => {
    const isExpanded = expandedItemId === item.id;
    const opacity = itemOpacities[item.id] || 1;

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: withTiming(opacity),
    }));

    const toggleExpand = () => {
      setItemOpacities((prev) => ({
        ...prev,
        [item.id]: 0.7,
      }));
      setExpandedItemId(isExpanded ? null : item.id);
    };

    return (
      <Animated.View
        style={[
          styles.historyItemContainer,
          isExpanded && styles.expandedItem,
          animatedStyle,
        ]}
      >
        <TouchableOpacity
          style={styles.historyItemHeader}
          onPress={toggleExpand}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnailImage}
          />
          <View style={styles.historyItemDetails}>
            <Text style={styles.historyItemTitle} numberOfLines={1}>
              {item.fileName}
            </Text>
            <View style={styles.historyItemSubtitle}>
              <Text style={styles.platformText}>{item.platform}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="link" size={18} color="white" />
              <Text style={styles.detailText} numberOfLines={1}>
                {item.url}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="film" size={18} color="white" />
              <Text style={styles.detailText}>
                {item.quality} • {item.fileSize}
              </Text>
            </View>
            <TouchableOpacity style={styles.redownloadButton}>
              <Ionicons name="download" size={18} color="white" />
              <Text style={styles.redownloadText}>Re-download</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Download History</Text>
        <TouchableOpacity style={styles.clearButton}>
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
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
  historyItemContainer: {
    backgroundColor: "rgba(30,30,30,0.8)",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  expandedItem: {
    backgroundColor: "rgba(50,50,50,0.9)",
  },
  historyItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  thumbnailImage: {
    width: 80,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  historyItemDetails: {
    flex: 1,
  },
  historyItemTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  historyItemSubtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  platformText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
  dateText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
  },
  expandedDetails: {
    padding: 15,
    backgroundColor: "rgba(40,40,40,0.9)",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    color: "white",
    marginLeft: 10,
    flex: 1,
  },
  redownloadButton: {
    flexDirection: "row",
    backgroundColor: "#4A148C",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  redownloadText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.5)",
    marginTop: 50,
  },
});

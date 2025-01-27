import { DownloadHistoryItem } from "@/app/(tabs)/history";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  withSpring,
  withTiming,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  Easing,
} from "react-native-reanimated";

export const RenderHistoryItem = ({
  item,
  expandedItemId,
  setExpandedItemId,
}: {
  item: DownloadHistoryItem;
  expandedItemId: string | null;
  setExpandedItemId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const isExpanded = expandedItemId === item.id;
  const animation = useSharedValue(0);

  useEffect(() => {
    if (isExpanded) {
      animation.value = withSpring(1, {
        damping: 15,
        stiffness: 120,
        mass: 0.8,
      });
    } else {
      animation.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [isExpanded]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(animation.value, [0, 1], [1, 1.02]),
        },
      ],
      zIndex: isExpanded ? 1 : 0,
      marginBottom: interpolate(animation.value, [0, 1], [8, 16]),
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 1], [0.95, 1]),
      transform: [
        {
          translateY: interpolate(animation.value, [0, 1], [0, -2]),
        },
      ],
      backgroundColor: `rgba(${interpolate(
        animation.value,
        [0, 1],
        [40, 50]
      )}, ${interpolate(animation.value, [0, 1], [40, 50])}, ${interpolate(
        animation.value,
        [0, 1],
        [40, 50]
      )}, 0.95)`,
    };
  });

  const expandedStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      maxHeight: interpolate(animation.value, [0, 1], [0, 160]),
      transform: [
        {
          translateY: interpolate(animation.value, [0, 1], [-20, 0]),
        },
      ],
    };
  });

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(animation.value, [0, 1], [0, 180])}deg`,
        },
      ],
    };
  });

  const toggleExpand = () => {
    setExpandedItemId(isExpanded ? null : item.id);
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.content, contentStyle]}>
        <Pressable
          style={[styles.header, { paddingBottom: isExpanded ? 10 : 0 }]}
          onPress={toggleExpand}
          android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.fileName}
            </Text>
            <View style={styles.subtitleRow}>
              <View style={styles.platformBadge}>
                <Ionicons
                  name={
                    item.platform.toLowerCase() === "youtube"
                      ? "logo-youtube"
                      : "globe-outline"
                  }
                  size={12}
                  color="white"
                />
                <Text style={styles.platformText}>{item.platform}</Text>
              </View>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
          <Animated.View style={chevronStyle}>
            <Ionicons name="chevron-down" size={24} color="white" />
          </Animated.View>
        </Pressable>

        <Animated.View
          style={[
            styles.expandedContent,
            { paddingBottom: isExpanded ? 16 : 0 },
            expandedStyle,
          ]}
        >
          <View style={styles.detailRow}>
            <Ionicons name="link" size={16} color="#A0A0A0" />
            <Text style={styles.detailText} numberOfLines={1}>
              {item.url}
            </Text>
            <Pressable style={styles.copyButton}>
              <Ionicons name="copy-outline" size={14} color="#A0A0A0" />
            </Pressable>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="film" size={16} color="#A0A0A0" />
            <Text style={styles.detailText}>
              {item.quality} • {item.fileSize}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.actions}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="trash-outline" size={18} color="#FF4B4B" />
              <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
            </Pressable>
            <Pressable style={styles.primaryButton}>
              <Ionicons name="download-outline" size={18} color="white" />
              <Text style={styles.actionText}>Re-download</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  thumbnail: {
    width: 76,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#2A2A2A",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  platformBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  platformText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  dateText: {
    color: "#A0A0A0",
    fontSize: 12,
    marginLeft: 8,
  },
  expandedContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(20, 20, 20, 0.95)",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    flex: 1,
    color: "#A0A0A0",
    fontSize: 13,
    marginLeft: 8,
  },
  copyButton: {
    padding: 4,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 79, 79, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EA",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  deleteText: {
    color: "#FF4B4B",
  },
});

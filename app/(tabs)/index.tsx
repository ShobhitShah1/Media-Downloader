import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface MediaQuality {
  label: string;
  size: string;
  color: string;
}

interface MediaInfo {
  title: string;
  thumbnail: string;
  qualities: MediaQuality[];
}

const fetchMediaInfo = async (url: string): Promise<MediaInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "Epic Video Content",
        thumbnail: "https://picsum.photos/300/200",
        qualities: [
          { label: "720p", size: "45MB", color: "#6A5ACD" },
          { label: "1080p", size: "85MB", color: "#4169E1" },
          { label: "4K", size: "220MB", color: "#1E90FF" },
        ],
      });
    }, 1500);
  });
};

export default function MediaDownloaderScreen() {
  const [url, setUrl] = useState("");
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const progressValue = useSharedValue(0);
  const inputScale = useSharedValue(1);
  const mediaCardOpacity = useSharedValue(0);

  const handleSubmit = useCallback(async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    progressValue.value = withTiming(0, { duration: 0 });
    inputScale.value = withSpring(0.95);

    const interval = setInterval(() => {
      progressValue.value = withTiming(progressValue.value + 0.1, {
        duration: 200,
      });
    }, 100);

    try {
      const info = await fetchMediaInfo(url);

      clearInterval(interval);
      progressValue.value = withTiming(1, { duration: 300 });

      runOnJS(setMediaInfo)(info);
      runOnJS(setIsLoading)(false);

      mediaCardOpacity.value = withTiming(1, { duration: 300 });
    } catch (error) {
      clearInterval(interval);
      runOnJS(setIsLoading)(false);
    } finally {
      inputScale.value = withSpring(1);
    }
  }, [url]);

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: inputScale.value }],
  }));

  const mediaCardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: mediaCardOpacity.value,
    transform: [
      {
        translateY: interpolate(
          mediaCardOpacity.value,
          [0, 1],
          [50, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, inputAnimatedStyle]}>
        <Ionicons
          name="link"
          size={24}
          color="rgba(255,255,255,0.5)"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Paste video URL"
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={url}
          onChangeText={setUrl}
          style={styles.input}
          multiline
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Ionicons
            name={isLoading ? "refresh" : "arrow-forward"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>

      {mediaInfo && (
        <Animated.View style={[styles.mediaCard, mediaCardAnimatedStyle]}>
          <Image
            source={{ uri: mediaInfo.thumbnail }}
            style={styles.thumbnailImage}
          />
          <Text style={styles.mediaTitle}>{mediaInfo.title}</Text>

          <View style={styles.qualityContainer}>
            {mediaInfo.qualities.map((quality) => (
              <TouchableOpacity
                key={quality.label}
                style={[
                  styles.qualityButton,
                  selectedQuality === quality.label && {
                    backgroundColor: quality.color,
                  },
                ]}
                onPress={() => setSelectedQuality(quality.label)}
              >
                <Text style={styles.qualityLabel}>{quality.label}</Text>
                <Text style={styles.qualitySize}>{quality.size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.downloadButton,
              !selectedQuality && styles.disabledButton,
            ]}
            disabled={!selectedQuality}
          >
            <Ionicons name="download" size={24} color="white" />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    minHeight: 50,
    backgroundColor: "rgba(50,50,50,0.5)",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 15,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    color: "white",
    paddingVertical: 15,
    lineHeight: 20,
  },
  submitButton: {
    padding: 15,
  },
  mediaCard: {
    width: "100%",
    backgroundColor: "rgba(30,30,30,0.8)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  thumbnailImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  mediaTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  qualityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  qualityButton: {
    width: "30%",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(50,50,50,0.5)",
    alignItems: "center",
  },
  qualityLabel: {
    color: "white",
    fontWeight: "bold",
  },
  qualitySize: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
  downloadButton: {
    flexDirection: "row",
    backgroundColor: "#4A148C",
    padding: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  disabledButton: {
    flexDirection: "row",
    backgroundColor: "#585858",
    padding: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  downloadText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
});

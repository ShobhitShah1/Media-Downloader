import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Colors from "@/constants/Colors";

interface DownloadButtonProps {
  onDownload: () => void;
  progress: number;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  onDownload,
  progress,
}) => {
  const [animation] = useState(new Animated.Value(0));

  const progressWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", `${progress}%`],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onDownload}
      activeOpacity={0.7}
    >
      <View style={styles.progressBackground}>
        <Animated.View
          style={[styles.progressForeground, { width: progressWidth }]}
        />
        <Text style={styles.buttonText}>
          {progress > 0 ? `Downloading ${progress}%` : "Download"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
  progressBackground: {
    backgroundColor: Colors.dark.surface,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  progressForeground: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.dark.primary,
  },
  buttonText: {
    color: Colors.dark.text,
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 10,
  },
});

import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface AnimatedInputProps {
  onValidate: (url: string) => Promise<boolean>;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({ onValidate }) => {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const validateUrl = async () => {
    const valid = await onValidate(url);
    setIsValid(valid);

    if (!valid) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const animatedStyle = {
    transform: [
      {
        translateX: shakeAnimation,
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TextInput
        style={[
          styles.input,
          isValid === false && styles.invalidInput,
          isValid === true && styles.validInput,
        ]}
        placeholder="Paste YouTube or Instagram URL"
        placeholderTextColor={Colors.dark.textSecondary}
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={validateUrl}>
        <Feather
          name={isValid === null ? "link" : isValid ? "check" : "x"}
          size={24}
          color={
            isValid === null
              ? Colors.dark.textSecondary
              : isValid
              ? Colors.dark.secondary
              : "red"
          }
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    color: Colors.dark.text,
    borderRadius: 12,
    padding: 15,
    paddingRight: 50,
  },
  invalidInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  validInput: {
    borderColor: Colors.dark.secondary,
    borderWidth: 1,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
});

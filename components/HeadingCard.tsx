// File: components/HeadingCard.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from "react-native";

const { width } = Dimensions.get("window");
const MARGIN = 10;
const BUTTON_WIDTH = (width - MARGIN * 3) / 2;

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/** 
 * A modern two-column button that wraps long titles onto up to two lines.
 */
export default function HeadingCard({
  title,
  onPress,
  style,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.buttonText, textStyle]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    paddingVertical: 16,
    marginBottom: MARGIN,
    marginHorizontal: MARGIN / 2,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation (Android)
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    flexWrap: "wrap",     // allow wrapping to multiple lines
    lineHeight: 20,       // improves readability when wrapped
  },
});

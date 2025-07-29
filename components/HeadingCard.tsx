import React from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageSourcePropType
} from "react-native";

const { width } = Dimensions.get("window");
const H_MARGIN = 16;
const MIN_W = 140;
const MAX_W = 200;
const CARD_W = Math.min(MAX_W, Math.max(MIN_W, (width - H_MARGIN * 3) / 2));

export interface HeadingCardProps {
  title: string;
  onPress?: () => void;
  /** If present the image is **always** shown as card background. */
  imageSource?: ImageSourcePropType;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function HeadingCard({
  title,
  onPress,
  imageSource,
  style,
  textStyle
}: HeadingCardProps) {
  /** Shared content that sits on top of the (optional) image. */
  const Content = (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(0,0,0,0.12)" }}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed
      ]}
    >
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[
          styles.text,
          imageSource && styles.textOnImage,
          textStyle
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );

  // ── without image ────────────────────────────────────────────────────
  if (!imageSource) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
          style
        ]}
      >
        {Content}
      </Pressable>
    );
  }

  // ── with image ───────────────────────────────────────────────────────
  return (
    <ImageBackground
      source={imageSource}
      resizeMode="cover"
      imageStyle={styles.imageClip}
      style={[styles.card, style]}
    >
      {Content}
    </ImageBackground>
  );
}

const baseCard: ViewStyle = {
  width: CARD_W,
  minHeight: 100,
  paddingVertical: 24,
  paddingHorizontal: 20,
  borderRadius: 20,
  marginTop: 16,
  marginHorizontal: H_MARGIN / 2,
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
  // shadow / elevation
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 6
};

const styles = StyleSheet.create({
  card: {
    ...baseCard,
    backgroundColor: "#F8FAFC"
  },
  pressable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  pressed: { opacity: 0.85 },

  imageClip: { borderRadius: 20 },

  text: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
    color: "#0F172A"
  },
  textOnImage: {
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.65)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  }
});

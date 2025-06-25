// File: components/HeadingCard.tsx
import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const MARGIN = 10;
const CARD_WIDTH = (width - MARGIN * 3) / 2;

interface Props {
  title: string;
  image?: string | null;
  onPress: () => void;
}

/** Generic card reused anywhere we need a 2-column grid */
export default function HeadingCard({ title, image, onPress }: Props) {
  const sourceProp =
    typeof image === "string" && image?.length
      ? { uri: image }
      : require("../assets/images/icon.png");

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={sourceProp} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: MARGIN
  },
  image: {
    width: "100%",
    height: CARD_WIDTH * (135 / 155),
    resizeMode: "cover"
  },
  textContainer: {
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});

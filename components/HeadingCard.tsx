import { TouchableOpacity, Text, StyleSheet, Dimensions, type ViewStyle, type TextStyle } from "react-native"

const { width, height } = Dimensions.get("window")
const MARGIN = 16
const MIN_CARD_WIDTH = 140
const MAX_CARD_WIDTH = 200
const BUTTON_WIDTH = Math.min(MAX_CARD_WIDTH, Math.max(MIN_CARD_WIDTH, (width - MARGIN * 3) / 2))

interface Props {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

/**
 * A modern two-column button that wraps long titles onto up to two lines.
 * Enhanced with beautiful visual design and responsive layout.
 */
export default function HeadingCard({ title, onPress, style, textStyle }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.92}>
      <Text style={[styles.buttonText, textStyle]} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    minHeight: 88,
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginBottom: 16,
    marginHorizontal: MARGIN / 2,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    // Enhanced multi-layer shadow for depth (iOS)
    shadowColor: "#1F2937",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // Additional shadow layer for more depth
    // Modern card elevation (Android)
    elevation: 6,
    // Subtle gradient-like border
    borderWidth: 1,
    borderColor: "#F8FAFC",
    // Add subtle inner shadow effect
    borderTopWidth: 0.5,
    borderTopColor: "#FFFFFF",
  },
  buttonText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    flexWrap: "wrap",
    lineHeight: 24,
    letterSpacing: -0.3,
    textAlignVertical: "center",
    // Add subtle text shadow for depth
    textShadowColor: "rgba(0, 0, 0, 0.02)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})

// File: app/Authors.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// replace these with your actual image imports:
import FeatureImage from "../assets/images/Authors/feature.png";
import AppLogo from "../assets/images/Authors/childcare_logo.png";
import DrAvinash from "../assets/images/Authors/dr_avinash.png";
import DrSayali from "../assets/images/Authors/dr_sayali.png";

export default function Authors() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>About</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Feature shot */}
        <Image
          source={FeatureImage}
          style={[styles.bannerImage, { width: width * 0.95 }]}
          resizeMode="contain"
        />

        {/* About Application */}
        <Text style={styles.sectionTitle}>About Application</Text>
        <Text style={styles.paragraph}>
          A pediatric clinical app is a mobile application designed to assist
          healthcare professionals and students in B.A.M.S. for study, diagnosis,
          treatment, and management of pediatric patients. It provides drug
          information, calculators, scoring systems, lab reference ranges,
          developmental milestones, clinical guidelines, image galleries, and
          even consultation tools.
        </Text>

        {/* App logo */}
        <Image
          source={AppLogo}
          style={[styles.logo, { width: width * 0.6 }]}
          resizeMode="contain"
        />

        {/* Contact */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          9890542264{"\n"}
          9561528609{"\n"}
          avikarambhe539@gmail.com
        </Text>

        {/* Authors */}
        <Text style={styles.sectionTitle}>About Authors</Text>

        <View style={styles.authorCard}>
          <Image source={DrAvinash} style={styles.avatar} />
          <View style={styles.authorInfo}>
            <Text style={styles.name}>Dr. Avinash D. Karambhe</Text>
            <Text style={styles.detail}>M.D. Pediatric (Ayu)</Text>
            <Text style={styles.detail}>Associate Professor</Text>
          </View>
        </View>

        <View style={styles.authorCard}>
          <Image source={DrSayali}   resizeMode="contain" style={styles.avatar} />
          <View style={styles.authorInfo}>
            <Text style={styles.name}>Dr. Sayali R. Khandelwal</Text>
            <Text style={styles.detail}>M.D. Pediatric (Ayu)</Text>
            <Text style={styles.detail}>Assistant Professor</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 12
  },
  back: {
    fontSize: 20,
    fontWeight: "600",
    width: 24
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700"
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 32
  },

  bannerImage: {
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 24
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
    marginBottom: 24
  },

  logo: {
    height: 120,
    alignSelf: "center",
    marginBottom: 24
  },

  authorCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    // iOS shadow
    shadowColor: "#1F2937",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // Android elevation
    elevation: 6
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor:'lightblue'
  },
  authorInfo: {
    flex: 1
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4
  },
  detail: {
    fontSize: 16,
    color: "#64748B"
  }
});

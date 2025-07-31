// File: app/index.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// static import of your default icon
import IconImage from "../assets/images/icon.png";

const cardTitle = [


  {
    title: "Immunology",
    image:
      "https://images.unsplash.com/photo-1582719471180-aad67c6023c8?q=80&w=1925&auto=format&fit=crop"
  },
  {
    title: "Infectious Diseases",
    image:
      "https://images.unsplash.com/photo-1706201320711-3d85bf15bac4?q=80&w=1981&auto=format&fit=crop"
  },
  {
    title: "Worm Infestations",
    image:
      "https://images.unsplash.com/photo-1680240277111-7a3d022a74b8?q=80&w=1936&auto=format&fit=crop"
  },
  {
    title: "Respiratory System",
    image:
      "https://images.unsplash.com/photo-1715529282062-773305ae0178?q=80&w=1925&auto=format&fit=crop"
  },
  {
    title: "Gastrointestinal System",
    image:
      "https://images.unsplash.com/photo-1743767587835-7a80fe384236?q=80&w=1955&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Nephrology",
    image:
      "https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Hematological Diseases",
    image:
      "https://images.unsplash.com/photo-1706478106657-1a8d73d82f29?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Neurology",
    image:
      "https://images.unsplash.com/photo-1566669419640-ae09e20a18d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Cardiology",
    image:
      "https://plus.unsplash.com/premium_photo-1682308449346-0d68b4e3f3fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2FyZGlvbG9neXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title: "Endocrinology",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-eb60a2a47f9b27bd1cb01d0dc40bd869-lq"
  },
  {
    title: "Rheumatology",
    image:
      "https://images.unsplash.com/photo-1659353887907-000c9a92377d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Dermatology",
    image:
      "https://images.unsplash.com/photo-1713085085470-fba013d67e65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Genetic Diseases",
    image:
      "https://plus.unsplash.com/premium_photo-1676418571698-e473eef0f6dd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Behavioral Diseases",
    image:
      "https://images.unsplash.com/photo-1604004092136-58a56264f0ab?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Newborn Problems",
    image:
      "https://images.unsplash.com/photo-1716929806153-4e3f66242de0?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Nutritional Diseases",
    image: "https://i.ytimg.com/vi/A3LHlMsTc1M/maxresdefault.jpg"
  },
  {
    title: "Birth Injuries",
    image:
      "https://images.unsplash.com/photo-1692459525151-e6d134f98afc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Normal Newborn Features",
    image:
      "https://irp.cdn-website.com/6185c197/dms3rep/multi/newborn-char.png"
  },
  {
    title: "Nutrition In Child",
    image:
      "https://www.metropediatrics.com/wp-content/uploads/2023/12/healthy-dinners-for-kids.jpg"
  },
  {
    title: "Growth & Development in Child",
    image:
      "https://www.family.abbott/content/dam/an/familyabbott/in-en/pediasure/child-nutrition-and-development/blogs/how-to-monitor-your-childs-growth/How%20to%20monitor%20your%20child%20growth%20updated.jpg"
  },
   {
    title: "Authors",
    image:
      "https://img.freepik.com/premium-vector/child-care-logo_20448-66.jpg"
  },
  
];

const { width } = Dimensions.get("window");
const MARGIN = 15;
const CARD_WIDTH = (width - MARGIN * 3) / 2;

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (item: typeof cardTitle[0]) => {
    switch (item.title) {
       case "Authors":
        router.push("/Authors");
        break;
      case "Immunology":
        router.push("/Immunology");
        break;
      case "Infectious Diseases":
        router.push("/Infectious");
        break;
         case "Worm Infestations":
        router.push("/WormInfestations");
        break;
        case "Respiratory System":
        router.push("/RespiratorySystem");
        break; 
         case "Gastrointestinal System":
        router.push("/GastrointestinalSystem");
        break; 
          case "Nephrology":
        router.push("/Nephrology");
        break; 
        case "Hematological Diseases":
        router.push("/HematologicalDiseases");
        break; 
        case "Neurology":
        router.push("/Neurology");
        break; 
        case "Cardiology":
        router.push("/Cardiology");
        break; 
        case "Endocrinology":
        router.push("/Endocrinology");
        break; 
        case "Rheumatology":
        router.push("/Rheumatology");
        break; 
        case "Dermatology":
        router.push("/Dermatology");
        break; 
        case "Genetic Diseases":
        router.push("/GeneticDiseases");
        break; 
        case "Behavioral Diseases":
        router.push("/BehavioralDiseases");
        break; 
        case "Newborn Problems":
        router.push("/NewbornProblems");
        break; 
        case "Nutritional Diseases":
        router.push("/NutritionalDisorders");
        break; 
        case "Birth Injuries":
        router.push("/BirthInjuries");
        break; 
        case "Normal Newborn Features":
        router.push("/NormalNewbornFeatures");
        break; 
        case "Nutrition In Child":
        router.push("/NutritionInChildren");
        break;
        case "Growth & Development in Child":
        router.push("/GrowthAndDevelopment");
        break;
       
      default:
        Alert.alert("Coming soon", `${item.title} section is under construction.`);
    }
  };

  const renderCard = ({ item }: { item: typeof cardTitle[0] }) => {
    let sourceProp;
    if (typeof item.image === "string" && item.image.length > 0) {
      sourceProp = { uri: item.image };
    } else {
      sourceProp = IconImage;
    }

    return (
      <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
     
        <Image source={sourceProp} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNStatusBar
        barStyle="dark-content"
        backgroundColor="#f8f8f8"
        translucent={false}
      />
          <Text style={{textAlign:'center', fontSize:20, paddingVertical:10,fontWeight:'600'}}>Child Care</Text>
      <FlatList
        data={cardTitle}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderCard}
        numColumns={2}
        contentContainerStyle={styles.outer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  outer: {
    padding: MARGIN
  },
  row: {
    justifyContent: "space-between",
    marginBottom: MARGIN
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
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

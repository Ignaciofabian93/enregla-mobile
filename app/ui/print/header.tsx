import { colors, fontStyles } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

type PrintHeader = {
  title: string;
  canGoBack?: boolean;
};

export default function Header({ title, canGoBack = false }: PrintHeader) {
  const router = useRouter();
  return (
    <>
      <View style={styles.header}>
        <View style={[styles.icon, { width: "10%" }]}>
          {canGoBack && <Ionicons name="arrow-back" size={28} onPress={() => router.back()} color={colors.light[900]} />}
        </View>
        <Text style={[fontStyles.title, { fontSize: 24, textAlign: "center", width: "100%" }]}>{title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 0,
    top: 5,
  },
});

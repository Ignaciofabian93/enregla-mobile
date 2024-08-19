import { colors } from "@/constants/theme";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const nissan = require("@/assets/icons/nissan.png");

type Card = {
  title: string;
  hasLogo?: boolean;
  hasVin?: boolean;
  hasPlate?: boolean;
  onPress: () => void;
};

export default function Card() {
  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => {}}>
        <Text>Card</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: "auto",
    borderWidth: 1,
    borderColor: colors.light[400],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: "space-between",
    elevation: 2,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
});

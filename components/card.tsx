import { colors, fontStyles } from "@/constants/theme";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const nissan = require("@/assets/icons/nissan.png");

type Card = {
  title: string;
  hasLogo?: boolean;
  hasVin?: boolean;
  hasPlate?: boolean;
  onPress: () => void;
};

export default function Card({ title, hasLogo, hasPlate, hasVin, onPress }: Card) {
  return (
    <>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={fontStyles.bodysemibold}>{title}</Text>
        <View style={styles.description}>
          <View style={styles.bottom}>
            {hasVin && <Text style={[fontStyles.detail, { fontSize: 12 }]}>JTDBF2342434</Text>}
            {hasPlate && <Text style={[fontStyles.detail, { fontSize: 14 }]}>AB-CD-12</Text>}
          </View>
          <View style={styles.icon_container}>{hasLogo && <Image source={nissan} style={styles.icon} />}</View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "96%",
    height: 110,
    borderWidth: 1,
    borderColor: colors.light[400],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: "space-between",
    elevation: 2,
    backgroundColor: colors.light[50],
  },
  description: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bottom: {
    width: "80%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  icon_container: {
    width: "20%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

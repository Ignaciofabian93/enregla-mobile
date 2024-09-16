import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";

type Card = {
  plate: string;
  vin: string;
  operator: string;
  date: string;
  onPress: () => void;
};

export default function Card({ plate, vin, operator, date, onPress }: Card) {
  return (
    <>
      <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
        <View style={styles.row}>
          <Text style={styles.field}>Fecha:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>Patente:</Text>
          <Text style={styles.value}>{plate ?? "No registrada"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>VIN:</Text>
          <Text style={styles.value}>{vin ?? "No registrado"}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 310,
    height: "95%",
    borderWidth: 1,
    borderColor: colors.light[400],
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 12,
    justifyContent: "space-between",
    elevation: 2,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  field: {
    textAlign: "left",
    fontFamily: "Sora_SemiBold",
    fontSize: 16,
    marginRight: 12,
  },
  value: {
    textAlign: "right",
    fontFamily: "Sora_Regular",
    fontSize: 16,
  },
});

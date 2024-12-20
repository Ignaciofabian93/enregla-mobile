import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";

type Card = {
  plate: string;
  date: string;
  onPress: () => void;
};

export default function Card({ plate, date, onPress }: Card) {
  return (
    <>
      <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
        <View>
          <View style={styles.row}>
            <Text style={styles.field}>Fecha:</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.field}>Patente:</Text>
            <Text style={styles.value}>{plate ?? "No registrada"}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{ color: "#fff" }}>Imprimir</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "85%",
    borderWidth: 1,
    borderColor: colors.light[400],
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "space-between",
    elevation: 4,
    backgroundColor: "#fff",
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
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
  button: {
    backgroundColor: colors.primary[700],
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
});

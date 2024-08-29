import { Text, View, StyleSheet, TextInput } from "react-native";
import { colors } from "@/constants/theme";

type PlateInput = {
  plate: string;
};

export default function PlateInput({ plate }: PlateInput) {
  const plateValue = plate.split("-");

  return (
    <>
      <View style={styles.container}>
        <TextInput maxLength={2} autoCapitalize="characters" style={styles.input} value={plateValue[0]} />
        <Text style={styles.dash}>-</Text>
        <TextInput maxLength={2} autoCapitalize="characters" style={styles.input} value={plateValue[1]} />
        <Text style={styles.dash}>-</Text>
        <TextInput maxLength={2} autoCapitalize="characters" style={styles.input} value={plateValue[2]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "auto",
    marginVertical: 10,
  },
  input: {
    width: 64,
    height: 42,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: colors.light[800],
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Sora_Regular",
    fontSize: 18,
  },
  dash: {
    width: 8,
    fontWeight: "800",
  },
});

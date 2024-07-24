import { Text, View, StyleSheet, TextInput } from "react-native";
import { colors } from "@/constants/theme";

type PlateInput = {
  plate: string[];
  handlePlate: (position: number, value: string) => void;
};

export default function PlateInput({ plate, handlePlate }: PlateInput) {
  return (
    <>
      <View style={styles.container}>
        <TextInput maxLength={2} autoCapitalize="sentences" style={styles.input} onChangeText={(e) => handlePlate(1, e)} value={plate[0]} />
        <Text style={styles.dash}>-</Text>
        <TextInput maxLength={2} autoCapitalize="sentences" style={styles.input} onChangeText={(e) => handlePlate(2, e)} value={plate[1]} />
        <Text style={styles.dash}>-</Text>
        <TextInput maxLength={2} autoCapitalize="sentences" style={styles.input} onChangeText={(e) => handlePlate(3, e)} value={plate[2]} />
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
  },
  input: {
    width: 64,
    height: 42,
    borderWidth: 1,
    backgroundColor: colors.white,
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

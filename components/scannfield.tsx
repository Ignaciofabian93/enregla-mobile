import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CustomTextInput from "./textinput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/theme";

type ScannField = {
  value: string;
  scan: () => void;
  name: string;
};

const ScannButton = ({ onPress, name }: { onPress: () => void; name: string }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.button}>
      <Text style={[styles.field, { textAlign: "center" }]}>{name}</Text>
      <Ionicons name="camera" size={24} />
    </TouchableOpacity>
  );
};

export default function ScannField({ value, scan, name }: ScannField) {
  console.log("VALUE: ", value);

  return (
    <View style={styles.container}>
      <View style={{ width: "60%" }}>
        <CustomTextInput
          placeholder={name}
          value={value}
          autoCapitalize="characters"
          maxLength={17}
          size="lg"
        />
      </View>
      <ScannButton onPress={scan} name={name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  field: {
    fontFamily: "Sora_SemiBold",
    fontSize: 16,
  },
  button: {
    width: "30%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.light[400],
    borderRadius: 8,
    padding: 3,
    elevation: 2,
    backgroundColor: colors.white,
  },
});

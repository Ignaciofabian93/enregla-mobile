import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CustomTextInput from "./textinput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/theme";

type ScannField = {
  value: string;
  scan: () => void;
  name: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

const ScannButton = ({ onPress, name, disabled }: { onPress: () => void; name: string; disabled: boolean }) => {
  return (
    <TouchableOpacity
      onPress={disabled ? () => null : () => onPress()}
      activeOpacity={0.9}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={[styles.field, { textAlign: "center" }]}>{name}</Text>
      <Ionicons name="camera" size={24} />
    </TouchableOpacity>
  );
};

export default function ScannField({ value, scan, name, onChange, isInvalid, errorMessage }: ScannField) {
  return (
    <View style={styles.container}>
      <View style={{ width: "60%" }}>
        <CustomTextInput
          onChangeText={(e) => onChange(e)}
          placeholder={name}
          value={value}
          autoCapitalize="characters"
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          maxLength={name === "Patente" ? 8 : 17}
          size="lg"
        />
      </View>
      <ScannButton onPress={scan} name={name} disabled={value.length > 0} />
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
    backgroundColor: "#fff",
  },
  disabled: {
    backgroundColor: colors.light[300],
  },
});

import { Text, View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { Checkbox } from "expo-checkbox";

type Checkbox = {
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
};

export default function CustomCheckBox({ checked = false, onChange, title }: Checkbox) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Checkbox
          value={checked}
          onValueChange={onChange}
          color={colors.light[700]}
          style={[styles.check]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Sora_SemiBold",
    fontSize: 14,
    marginBottom: 8,
  },
  check: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
});

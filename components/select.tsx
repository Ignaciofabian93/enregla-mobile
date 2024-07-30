import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@/constants/theme";

type CustomPicker = {
  data: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CustomPicker({ data, value, onChange }: CustomPicker) {
  return (
    <View style={styles.container}>
      <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
        <Picker.Item label="Seleccione..." value="Seleccione..." />
        {data.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    borderWidth: 1,
    borderColor: colors.light[400],
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginVertical: 10,
    elevation: 2,
  },
  picker: {
    width: "100%",
    height: 50,
  },
});

import { colors, fontStyles } from "@/constants/theme";
import { View, StyleSheet, Text } from "react-native";

export default function Header() {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={fontStyles.subtitle}>Juanito</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
  },
});

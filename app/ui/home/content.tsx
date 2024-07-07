import { fontStyles } from "@/constants/theme";
import { View, StyleSheet, Text } from "react-native";

const Row = ({ field, value }: { field: string; value: string }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={fontStyles.bodysemibold}>{field}</Text>
        <Text style={fontStyles.body}>{value}</Text>
      </View>
    </>
  );
};

export default function Content() {
  return (
    <>
      <View style={styles.content}>
        <Row field="Fecha:" value={new Date().toISOString().slice(0, 10)} />
        <Row field="Etiquetas:" value={"80"} />
        <Row field="Rollos:" value={"1"} />
        <Row field="Operador:" value={"Juanito"} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "64%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 4,
  },
});

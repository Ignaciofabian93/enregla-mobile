import { colors, fontStyles } from "@/constants/theme";
import useSessionStore from "@/store/session";
import { View, StyleSheet, Text } from "react-native";

const Row = ({ field, value }: { field: string; value: string }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={[fontStyles.bodysemibold, { fontSize: 14 }]}>{field}</Text>
        <Text style={[fontStyles.body, { fontSize: 14, width: "70%" }]}>{value}</Text>
      </View>
    </>
  );
};

export default function Content() {
  const { user } = useSessionStore();
  return (
    <>
      <View style={styles.content}>
        <View style={styles.info}>
          <Row field="Operador:" value={user.name} />
          <Row field="Fecha:" value={new Date().toISOString().slice(0, 10)} />
          <Row field="Etiquetas:" value={"80"} />
          <Row field="Rollos:" value={"1"} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "64%",
    alignItems: "center",
  },
  info: {
    width: "96%",
    height: "auto",
    backgroundColor: colors.light[100],
    borderRadius: 12,
    borderColor: colors.light[300],
    borderWidth: 1,
    padding: 12,
    elevation: 2,
  },
  row: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
});

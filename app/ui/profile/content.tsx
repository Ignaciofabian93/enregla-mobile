import { colors, fontStyles } from "@/constants/theme";
import useSessionStore from "@/store/session";
import { StyleSheet, Text, View } from "react-native";

const Row = ({ field, value }: { field: string; value: string }) => {
  return (
    <View style={styles.row}>
      <Text style={[fontStyles.bodysemibold, { fontSize: 14 }]}>{field}</Text>
      <Text style={[fontStyles.body, { fontSize: 14, width: "70%" }]}>{value}</Text>
    </View>
  );
};

export default function Content() {
  const { user } = useSessionStore();
  return (
    <>
      <View style={styles.content}>
        <View style={styles.info}>
          <Row field="Nombre:" value={user.name} />
          <Row field="Email:" value={user.email} />
          <Row field="Cargo:" value={user.role.name} />
          <Row field="Agencia:" value={user.branch.agency.name} />
          <Row field="Municipio:" value={user.branch.municipality} />
          <Row field="Dirección:" value={user.branch.address} />
          <Row field="Teléfono:" value={user.branch.telephone} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  row: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  info: {
    width: "90%",
    height: "auto",
    backgroundColor: colors.light[100],
  },
});

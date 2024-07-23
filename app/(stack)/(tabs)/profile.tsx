import { Text, View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import useSessionStore from "@/store/session";
import CustomButton from "@/components/button";
import useSession from "@/hooks/useSession";

const Row = ({ field, value }: { field: string; value: string }) => {
  return (
    <View style={styles.row}>
      <Text style={[{ fontSize: 14, fontFamily: "Sora_SemiBold" }]}>{field}</Text>
      <Text style={[{ fontSize: 14, fontFamily: "Sora_Regular", width: "70%" }]}>{value}</Text>
    </View>
  );
};

export default function Profile() {
  const { user } = useSessionStore();
  const { closeSession } = useSession();

  return (
    <>
      <Layout>
        <Container>
          <View style={styles.header}>
            <Text style={[{ fontSize: 28, fontFamily: "Sora_SemiBold" }]}>Perfil</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.info}>
              <Row field="Nombre:" value={user?.name} />
              <Row field="Email:" value={user?.email} />
              <Row field="Cargo:" value={user?.role} />
              <Row field="Agencia:" value={user?.agency} />
              <Row field="Municipio:" value={user?.municipality} />
              <Row field="Dirección:" value={user?.address} />
            </View>
          </View>
          <View style={styles.footer}>
            <CustomButton text="Cerrar sesión" onPress={closeSession} type="warning" />
          </View>
        </Container>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    paddingHorizontal: 8,
  },
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
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

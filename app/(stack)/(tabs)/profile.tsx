import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/button";
import Layout from "@/components/layout";
import useSession from "@/hooks/useSession";
import useProfile from "@/hooks/useProfile";
import { Link } from "expo-router";
import CustomModal from "@/components/modal";
import CustomTextInput from "@/components/textinput";

export default function Profile() {
  const { closeSession, loading } = useSession();
  const { branch, user, handleShowModal, showModal, handleCloseModal, form, handleForm, print } = useProfile();

  const youtube_logo = require("@/assets/icons/youtube.png");
  const instagram_logo = require("@/assets/icons/instagram.png");

  return (
    <>
      <Layout>
        <View style={styles.view}>
          <Text style={styles.title}>Información</Text>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.field}>Operador: </Text>
              <Text style={styles.info}>{user?.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.field}>Email: </Text>
              <Text style={styles.info}>{user?.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.field}>Dirección: </Text>
              <Text style={styles.info}>{branch?.address}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.field}>Teléfono: </Text>
              <Text style={styles.info}>{branch?.telephone}</Text>
            </View>
          </View>
          <View style={{ width: "100%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Link href={"https://www.youtube.com/@console.coding"} style={{ height: 100, marginHorizontal: 16 }}>
              <Image source={youtube_logo} style={{ width: 50, height: 50 }} />
            </Link>
            <Link href={"https://www.youtube.com/@console.coding"} style={{ height: 100, marginHorizontal: 16 }}>
              <Image source={instagram_logo} style={{ width: 50, height: 50 }} />
            </Link>
          </View>
          <View>
            <CustomButton text="Solicitar insumos" onPress={handleShowModal} type="primary" isLoading={false} />
            <CustomButton text="Cerrar sesión" onPress={closeSession} type="warning" isLoading={loading} />
          </View>
        </View>
        <CustomModal visible={showModal}>
          <View style={{ width: "90%" }}>
            <ScrollView contentContainerStyle={{ paddingTop: 32 }}>
              <View style={{ marginBottom: 20 }}>
                <View style={{ width: "100%", marginBottom: 16 }}>
                  <Text style={styles.field}>Ácido:</Text>
                  <CustomTextInput
                    value={form.acid.toString()}
                    onChangeText={(e) => handleForm("acid", Number(e))}
                    size="lg"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ width: "100%", marginBottom: 16 }}>
                  <Text style={styles.field}>Rollos de papel:</Text>
                  <CustomTextInput
                    value={form.paper.toString()}
                    onChangeText={(e) => handleForm("paper", Number(e))}
                    size="lg"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ width: "100%", marginBottom: 16 }}>
                  <Text style={styles.field}>Catalizador amarillo:</Text>
                  <CustomTextInput
                    value={form.yellow_catalyzer.toString()}
                    onChangeText={(e) => handleForm("yellow_catalyzer", Number(e))}
                    size="lg"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ width: "100%", marginBottom: 16 }}>
                  <Text style={styles.field}>Catalizador azul:</Text>
                  <CustomTextInput
                    value={form.blue_catalyzer.toString()}
                    onChangeText={(e) => handleForm("blue_catalyzer", Number(e))}
                    size="lg"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ width: "100%", marginBottom: 16 }}>
                  <Text style={styles.field}>Paletas de madera:</Text>
                  <CustomTextInput
                    value={form.wood_sticks.toString()}
                    onChangeText={(e) => handleForm("wood_sticks", Number(e))}
                    size="lg"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ width: "100%", marginBottom: 16 }}>
                  <Text style={styles.field}>Lápiz:</Text>
                  <CustomTextInput
                    value={form.pen.toString()}
                    onChangeText={(e) => handleForm("pen", Number(e))}
                    size="lg"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ width: "100%", marginBottom: 16 }}>
                  <Text style={styles.field}>Batería lápiz:</Text>
                  <CustomTextInput
                    value={form.pen_battery.toString()}
                    onChangeText={(e) => handleForm("pen_battery", Number(e))}
                    size="lg"
                    keyboardType="decimal-pad"
                  />
                </View>
                <CustomButton text="Crear solicitud" onPress={print} type="primary" />
                <CustomButton text="Cerrar" onPress={handleCloseModal} type="secondary" />
              </View>
            </ScrollView>
          </View>
        </CustomModal>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: 32,
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 24,
  },
  infoContainer: {
    width: "100%",
    height: "40%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  field: {
    fontFamily: "Sora_SemiBold",
    fontSize: 18,
  },
  info: {
    fontFamily: "Sora_Regular",
    fontSize: 18,
  },
});

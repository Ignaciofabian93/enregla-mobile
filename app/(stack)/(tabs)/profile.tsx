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
  const tiktok_logo = require("@/assets/icons/tiktok.png");

  return (
    <>
      <Layout>
        <View style={styles.view}>
          <View style={{ width: "100%" }}>
            <Text style={styles.title}>Información</Text>
            <Text style={{ fontFamily: "Sora_Regular", fontSize: 16, textAlign: "center", marginBottom: 24 }}>
              Link a redes para más información
            </Text>
            <View
              style={{
                width: "100%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href={"https://www.youtube.com/watch?v=WJmduq-Aojg"} style={{ height: 100, marginHorizontal: 16 }}>
                <Image source={youtube_logo} style={{ width: 40, height: 40 }} />
              </Link>
              <Link
                href={"https://www.instagram.com/enregla_oficial/?igsh=MTl2a2R5dzFvaGR3NA%3D%3D"}
                style={{ height: 100, marginHorizontal: 16 }}
              >
                <Image source={instagram_logo} style={{ width: 40, height: 40 }} />
              </Link>
              <Link
                href={"https://www.tiktok.com/@enreglaoficial?_t=8iLHvxI40m5&_r=1"}
                style={{ height: 100, marginHorizontal: 16 }}
              >
                <Image source={tiktok_logo} style={{ width: 40, height: 40 }} />
              </Link>
            </View>
          </View>
          <View>
            <CustomButton text="Cerrar sesión" onPress={closeSession} type="warning" isLoading={loading} />
          </View>
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: 32,
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 22,
    width: "100%",
    textAlign: "left",
    marginBottom: 16,
  },
});

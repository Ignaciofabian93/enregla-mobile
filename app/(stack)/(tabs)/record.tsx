import Card from "@/components/card";
import Layout from "@/components/layout";
import CustomTextInput from "@/components/textinput";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function RecordedLabels() {
  return (
    <>
      <Layout>
        <View style={styles.view}>
          <View style={{ width: "100%" }}>
            <Text style={styles.title}>Reimprimir etiqueta</Text>
            <View style={{ width: "100%", marginBottom: 16 }}>
              <Text style={styles.field}>Buscar patente:</Text>
              <CustomTextInput value={""} multiline={false} verticalAlign="top" size="lg" onChangeText={() => {}} />
            </View>
          </View>
          <View style={{ width: "100%", paddingBottom: "10%" }}>
            {/* <Notification visible={showMessage} message={message.content} type={message.type} /> */}
            <ScrollView contentContainerStyle={{ width: "100%", paddingTop: 32 }}>
              <View style={{ marginBottom: 20, alignItems: "center" }}>
                <Card plate="jsdahjas" date="sajhsaj" onPress={() => {}} />
              </View>
            </ScrollView>
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
    paddingBottom: 16,
  },
  field: {
    width: "100%",
    textAlign: "left",
    fontFamily: "Sora_SemiBold",
    fontSize: 16,
  },
});

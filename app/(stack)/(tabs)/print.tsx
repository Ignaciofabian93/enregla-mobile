import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";
import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import CustomCheckBox from "@/components/checkbox";
import PlateInput from "@/components/plateInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import usePrint from "@/hooks/usePrint";
import CustomButton from "@/components/button";
import CustomPicker from "@/components/select";

export default function Printer() {
  const {
    vin,
    hasVin,
    carPlate,
    hasPlate,
    logo,
    hasLogo,
    handlePlate,
    handleChecks,
    takePhoto,
    base64,
    handlePrintLabel,
  } = usePrint();

  const Title = () => {
    return (
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontFamily: "Sora_SemiBold" }}>Editar Etiqueta</Text>
      </View>
    );
  };

  const Section = ({ children }: { children: React.ReactNode }) => {
    return <View style={styles.section}>{children}</View>;
  };

  return (
    <>
      <Layout>
        <Container>
          <Title />
          <View style={styles.content}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ width: "100%", height: "auto", flexDirection: "row" }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Section>
                  <View style={{ width: "90%", marginBottom: 24 }}>
                    <Text style={styles.field}>Elija marca del vehículo:</Text>
                    <CustomPicker data={[]} value="" onChange={() => {}} />
                  </View>
                  <View style={{ width: "90%", marginBottom: 24 }}>
                    <Text style={styles.field}>Elija modelo del vehículo:</Text>
                    <CustomPicker data={[]} value="" onChange={() => {}} />
                  </View>
                  <View style={{ width: "90%", marginBottom: 24 }}>
                    <Text style={styles.field}>Elija año del vehículo:</Text>
                    <CustomPicker data={[]} value="" onChange={() => {}} />
                  </View>
                  <View style={{ width: "90%", marginBottom: 24 }}>
                    <Text style={styles.field}>Ingrese la patente del vehículo:</Text>
                    <View style={{ width: "100%", alignItems: "center" }}>
                      <PlateInput plate={carPlate} handlePlate={handlePlate} />
                    </View>
                  </View>
                  <View style={{ width: "90%", marginBottom: 24 }}>
                    <Text style={styles.field}>Tome foto de patente:</Text>
                    <View
                      style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 8,
                        borderWidth: 0.5,
                        borderColor: colors.light[800],
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {base64 ? (
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${base64}` }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <TouchableOpacity onPress={takePhoto} activeOpacity={0.8}>
                          <Ionicons name="camera-sharp" size={36} color={colors.light[800]} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </Section>
                <Section>
                  <View style={{ width: "90%", marginBottom: 24 }}>
                    <Text style={styles.field}>Elementos para la etiqueta:</Text>
                    <View style={styles.checkboxList}>
                      <CustomCheckBox
                        title="VIN"
                        checked={hasVin}
                        onChange={() => handleChecks("hasVin")}
                      />
                      <CustomCheckBox
                        title="Patente"
                        checked={hasPlate}
                        onChange={() => handleChecks("hasPlate")}
                      />
                      <CustomCheckBox
                        title="Logo"
                        checked={hasLogo}
                        onChange={() => handleChecks("hasLogo")}
                      />
                    </View>
                  </View>
                </Section>
                <Section>
                  <TouchableOpacity style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16 }}>
                      Previsualizar etiqueta
                    </Text>
                    <Ionicons name="eye-sharp" size={24} color={colors.light[800]} />
                  </TouchableOpacity>
                </Section>
                <View
                  style={{
                    width: "100%",
                    height: 140,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomButton
                    text="Imprimir etiqueta"
                    size="lg"
                    type="primary"
                    onPress={handlePrintLabel}
                  />
                  <CustomButton text="Finalizar y guardar" size="lg" type="secondary" />
                </View>
              </View>
            </ScrollView>
          </View>
        </Container>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "6%",
  },
  content: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  section: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    paddingBottom: 24,
    borderBottomColor: colors.light[300],
  },
  field: {
    width: "100%",
    textAlign: "left",
    fontFamily: "Sora_SemiBold",
    fontSize: 16,
    marginBottom: 16,
  },
  checkboxList: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  footer: {},
});

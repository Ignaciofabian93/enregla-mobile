import { colors } from "@/constants/theme";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "@/components/button";
import CustomCheckBox from "@/components/checkbox";
import CustomPicker from "@/components/select";
import CustomTextInput from "@/components/textinput";
import Notification from "@/components/toast";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScannField from "@/components/scannfield";
import PreviewModal from "@/components/previewmodal";
import usePrinter from "@/hooks/usePrinter";

const carBrands = ["Toyota", "Ford", "Chevrolet", "Honda", "Nissan"];
const nissanCarModels = ["Sentra", "Altima", "Pathfinder", "Titan"];
const generateYearsRange = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 30 }, (_, i) => String(currentYear - i));
};
const years = generateYearsRange();

export default function PrintForm() {
  const {
    print,
    showMessage,
    loading,
    message,
    form,
    handleForm,
    takePlatePhoto,
    takeVINPhoto,
    vinImage,
    vinText,
    plateImage,
    plateText,
    showPreview,
    openPreview,
    closePreview,
  } = usePrinter();
  return (
    <View style={{ width: "100%", paddingBottom: "10%" }}>
      <Notification visible={showMessage} message={message.content} type={message.type} />
      <ScrollView contentContainerStyle={{ width: "100%", paddingTop: 32 }}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Elija marca del vehículo:</Text>
            <CustomPicker data={carBrands} value={form.vehicle_brand} onChange={(e) => handleForm("car_brand", e)} />
          </View>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Elija modelo del vehículo:</Text>
            <CustomPicker
              data={nissanCarModels}
              value={form.vehicle_model}
              onChange={(e) => handleForm("car_model", e)}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 24 }}>
            <Text style={styles.field}>Elija año del vehículo:</Text>
            <CustomPicker data={years} value={form.vehicle_year} onChange={(e) => handleForm("car_year", e)} />
          </View>

          <View style={{ width: "100%", marginBottom: 24 }}>
            <Text style={styles.field}>Escanear:</Text>
            <ScannField value={form.vehicle_plate} scan={takePlatePhoto} name="Patente" />
            <ScannField value={form.vehicle_vin} scan={takeVINPhoto} name="VIN" />
          </View>

          <View style={{ width: "100%", marginBottom: 24 }}>
            <Text style={styles.field}>Elementos para la etiqueta:</Text>
            <View style={styles.checkboxList}>
              <CustomCheckBox title="VIN" checked={form.show_vin} onChange={(e) => handleForm("show_vin", e)} />
              <CustomCheckBox title="Patente" checked={form.show_plate} onChange={(e) => handleForm("show_plate", e)} />
              <CustomCheckBox title="Logo" checked={form.show_logo} onChange={(e) => handleForm("show_logo", e)} />
            </View>
          </View>
          <TouchableOpacity style={styles.preview} onPress={openPreview}>
            <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16 }}>Previsualizar etiqueta</Text>
            <Ionicons name="eye-sharp" size={24} color={colors.light[800]} />
          </TouchableOpacity>
        </View>
        <View>
          <CustomButton text="Imprimir" onPress={print} type="primary" isLoading={loading} />
          <CustomButton text="Finalizar" onPress={() => {}} type="secondary" isLoading={loading} />
        </View>
        {showPreview && (
          <PreviewModal
            visible={showPreview}
            close={closePreview}
            vin={form.show_vin ? form.vehicle_vin : undefined}
            plate={form.show_plate ? form.vehicle_plate : undefined}
            logo={form.show_logo ? form.vehicle_logo : undefined}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  checkboxList: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  preview: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.light[400],
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
});

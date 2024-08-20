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
    showPreview,
    openPreview,
    closePreview,
    vehicleBrands,
    vehicleModels,
  } = usePrinter();
  return (
    <View style={{ width: "100%", paddingBottom: "10%" }}>
      <Notification visible={showMessage} message={message.content} type={message.type} />
      <ScrollView contentContainerStyle={{ width: "100%", paddingTop: 32 }}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Ingrese la orden de compra:</Text>
            <CustomTextInput
              value={form.purchase_number}
              isInvalid={form.purchase_number.length < 6 && form.purchase_number.length > 0}
              errorMessage="Orden de compra inválida"
              onChangeText={(e) => handleForm("purchase_number", e)}
              autoCapitalize="characters"
              size="lg"
            />
          </View>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Elija marca del vehículo:</Text>
            <CustomPicker
              data={vehicleBrands.map((el) => el.brand)}
              value={form.vehicle_brand}
              onChange={(e) => handleForm("vehicle_brand", e)}
              disabled={!form.purchase_number}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Elija modelo del vehículo:</Text>
            <CustomPicker
              data={vehicleModels.filter((el) => el.brand_id === form.vehicle_brand_id).map((item) => item.model)}
              value={form.vehicle_model}
              onChange={(e) => handleForm("vehicle_model", e)}
              disabled={!form.vehicle_brand_id}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 24 }}>
            <Text style={styles.field}>Elija año del vehículo:</Text>
            <CustomPicker
              data={years}
              disabled={!form.vehicle_model}
              value={form.vehicle_year}
              onChange={(e) => handleForm("vehicle_year", e)}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 24 }}>
            <Text style={styles.field}>Escanear:</Text>
            <ScannField
              onChange={(e) => handleForm("vehicle_plate", e)}
              value={form.vehicle_plate}
              scan={takePlatePhoto}
              name="Patente"
            />
            <ScannField onChange={(e) => handleForm("vehicle_vin", e)} value={form.vehicle_vin} scan={takeVINPhoto} name="VIN" />
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

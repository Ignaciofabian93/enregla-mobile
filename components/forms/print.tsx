import { colors } from "@/constants/theme";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "@/components/button";
import CustomCheckBox from "@/components/checkbox";
import CustomPicker from "@/components/select";
import CustomTextInput from "@/components/textinput";
import Notification from "@/components/toast";
import Ionicons from "@expo/vector-icons/Ionicons";
import ScannField from "@/components/scannfield";
import CustomModal from "@/components/modal";
import usePrinter from "@/hooks/usePrinter";
import PreviewModal from "../htmlPreview";

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
    vehicles,
    confirm,
    labelIsOk,
    labelIsNotOk,
    saveLabelData,
    operators,
    askAgain,
  } = usePrinter();
  return (
    <View style={{ width: "100%", paddingBottom: "10%" }}>
      <Notification visible={showMessage} message={message.content} type={message.type} />
      <ScrollView contentContainerStyle={{ width: "100%", paddingTop: 32 }}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Orden de trabajo (OT):</Text>
            <CustomTextInput
              value={form.work_order}
              multiline={false}
              verticalAlign="top"
              size="lg"
              onChangeText={(e) => handleForm("work_order", e)}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Elija operador:</Text>
            <CustomPicker
              data={operators.map((el) => el.name)}
              value={form.operator}
              onChange={(e) => handleForm("operator", e)}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Elija marca del vehículo:</Text>
            <CustomPicker
              data={vehicles.map((el) => el.brand)}
              value={form.vehicle_id ? vehicles[form.vehicle_id - 1]?.brand : ""}
              onChange={(e) => handleForm("vehicle_id", e)}
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
              <CustomCheckBox
                disabled={!form.vehicle_vin}
                title="VIN"
                checked={form.show_vin}
                onChange={(e) => handleForm("show_vin", e)}
              />
              <CustomCheckBox
                disabled={!form.vehicle_plate}
                title="Patente"
                checked={form.show_plate}
                onChange={(e) => handleForm("show_plate", e)}
              />
              <CustomCheckBox
                disabled={!form.vehicle_logo}
                title="Logo"
                checked={form.show_logo}
                onChange={(e) => handleForm("show_logo", e)}
              />
            </View>
          </View>
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={styles.field}>Comentarios:</Text>
            <CustomTextInput
              value={form.description}
              multiline={true}
              verticalAlign="top"
              size="lg"
              onChangeText={(e) => handleForm("description", e)}
            />
          </View>
          <TouchableOpacity style={styles.preview} onPress={openPreview}>
            <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16 }}>Previsualizar etiqueta</Text>
            <Ionicons name="eye-sharp" size={24} color={colors.light[800]} />
          </TouchableOpacity>
        </View>
        <View>
          <CustomButton
            text="Imprimir"
            onPress={print}
            type="primary"
            isLoading={loading}
            disabled={!form.show_vin && !form.show_plate && !form.show_logo}
          />
          <CustomButton
            text="Finalizar"
            onPress={saveLabelData}
            type="secondary"
            isLoading={loading}
            disabled={!form.show_vin && !form.show_plate && !form.show_logo}
          />
        </View>
        <PreviewModal
          visible={showPreview}
          close={closePreview}
          vin={form.show_vin ? form.vehicle_vin : undefined}
          plate={form.show_plate ? form.vehicle_plate : undefined}
          logo={form.show_logo ? form.vehicle_logo : undefined}
        />
        <CustomModal visible={confirm && askAgain}>
          <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "Sora_SemiBold",
                fontSize: 24,
              }}
            >
              Confirmar
            </Text>
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "Sora_SemiBold",
                fontSize: 16,
                marginBottom: 22,
              }}
            >
              ¿La etiqueta fue impresa correctamente?
            </Text>
            <CustomButton text="Sí" onPress={labelIsOk} type="primary" />
            <CustomButton text="No" onPress={labelIsNotOk} type="primary" />
          </View>
        </CustomModal>
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

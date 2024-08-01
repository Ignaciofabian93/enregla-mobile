import CustomButton from "@/components/button";
import CustomCheckBox from "@/components/checkbox";
import PlateInput from "@/components/plateInput";
import Scanner from "@/components/scanner";
import CustomPicker from "@/components/select";
import CustomTextInput from "@/components/textinput";
import Notification from "@/components/toast";
import { colors } from "@/constants/theme";
import usePrint from "@/hooks/usePrint";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

const carBrands = ["Toyota", "Ford", "Chevrolet", "Honda", "Nissan"];
const nissanCarModels = ["Sentra", "Altima", "Pathfinder", "Titan"];
const generateYearsRange = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 30 }, (_, i) => String(currentYear - i));
};
const years = generateYearsRange();
console.log(years);

export default function PrintForm() {
  const {
    takePlatePhoto,
    takeVINPhoto,
    handlePrintLabel,
    handleLabelInformation,
    labelInformation,
    message,
    loading,
    showMessage,
    handlePrintLabel_2,
    handlePrintLabel_3,
    handlePrintLabel_4,
    handlePrintLabel_5,
  } = usePrint();
  return (
    <View style={{ width: "100%", paddingBottom: "10%" }}>
      <Notification visible={showMessage} message={message.content} type={message.type} />
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Elija marca del vehículo:</Text>
          <CustomPicker
            data={carBrands}
            value={labelInformation.car_brand}
            onChange={(e) => handleLabelInformation("car_brand", e)}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Elija modelo del vehículo:</Text>
          <CustomPicker
            data={nissanCarModels}
            value={labelInformation.car_model}
            onChange={(e) => handleLabelInformation("car_model", e)}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Elija año del vehículo:</Text>
          <CustomPicker
            data={years}
            value={labelInformation.car_year}
            onChange={(e) => handleLabelInformation("car_year", e)}
          />
        </View>
        <View
          style={{
            width: "100%",
            marginBottom: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "60%" }}>
            <CustomTextInput
              value={labelInformation.car_plate}
              autoCapitalize="characters"
              maxLength={8}
              size="lg"
            />
          </View>
          <TouchableOpacity
            onPress={takePlatePhoto}
            activeOpacity={0.9}
            style={{ width: "30%", alignItems: "center" }}
          >
            <Text style={[styles.field, { textAlign: "center" }]}>Patente</Text>
            <Ionicons name="camera" size={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            marginBottom: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "60%" }}>
            <CustomTextInput
              value={labelInformation.car_vin}
              autoCapitalize="characters"
              maxLength={17}
              size="lg"
            />
          </View>
          <TouchableOpacity
            onPress={takeVINPhoto}
            activeOpacity={0.9}
            style={{ width: "30%", alignItems: "center" }}
          >
            <Text style={[styles.field, { textAlign: "center" }]}>VIN</Text>
            <Ionicons name="camera" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Elementos para la etiqueta:</Text>
          <View style={styles.checkboxList}>
            <CustomCheckBox
              title="VIN"
              checked={labelInformation.show_vin}
              onChange={(e) => handleLabelInformation("show_vin", e)}
            />
            <CustomCheckBox
              title="Patente"
              checked={labelInformation.show_plate}
              onChange={(e) => handleLabelInformation("show_plate", e)}
            />
            <CustomCheckBox
              title="Logo"
              checked={labelInformation.show_logo}
              onChange={(e) => handleLabelInformation("show_logo", e)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.light[400],
            padding: 10,
            borderRadius: 8,
            width: "100%",
          }}
        >
          <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16 }}>Previsualizar etiqueta</Text>
          <Ionicons name="eye-sharp" size={24} color={colors.light[800]} />
        </TouchableOpacity>
      </View>
      <View>
        <CustomButton
          text="Logo VIN Plate"
          onPress={handlePrintLabel}
          type="primary"
          size="lg"
          activeOpacity={0.8}
          isLoading={loading}
        />
        <CustomButton
          text="VIN Plate"
          onPress={handlePrintLabel_2}
          type="primary"
          activeOpacity={0.8}
          size="lg"
          isLoading={loading}
        />
        <CustomButton
          text="Logo base64"
          onPress={handlePrintLabel_3}
          type="primary"
          activeOpacity={0.8}
          size="lg"
          isLoading={loading}
        />
        <CustomButton
          text="Logo PNG"
          onPress={handlePrintLabel_4}
          type="primary"
          activeOpacity={0.8}
          size="lg"
          isLoading={loading}
        />
        <CustomButton
          text="Logo URL"
          onPress={handlePrintLabel_5}
          type="primary"
          activeOpacity={0.8}
          size="lg"
          isLoading={loading}
        />
      </View>
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
});

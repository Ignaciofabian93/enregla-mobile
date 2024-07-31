import CustomButton from "@/components/button";
import CustomCheckBox from "@/components/checkbox";
import PlateInput from "@/components/plateInput";
import CustomPicker from "@/components/select";
import CustomTextInput from "@/components/textinput";
import Notification from "@/components/toast";
import { colors } from "@/constants/theme";
import usePrint from "@/hooks/usePrint";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    takeChasisPhoto,
    plate,
    chasis,
    handlePrintLabel,
    handleLabelInformation,
    labelInformation,
    message,
    loading,
    handleCarPlate,
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
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Ingrese número de chasis del vehículo:</Text>
          <CustomTextInput autoCapitalize="characters" size="lg" />
        </View>
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Tome foto del chasis:</Text>
          <View
            style={{
              width: "100%",
              height: 200,
              borderRadius: 8,
              borderWidth: 0.5,
              borderColor: colors.light[800],
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginVertical: 10,
            }}
          >
            {labelInformation.chasis_img ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${labelInformation.chasis_img}` }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <TouchableOpacity onPress={takeChasisPhoto} activeOpacity={0.8}>
                <Ionicons name="camera-sharp" size={36} color={colors.light[800]} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Ingrese la patente del vehículo:</Text>
          <PlateInput plate={labelInformation.car_plate} handlePlate={handleCarPlate} />
        </View>
        <View style={{ width: "100%", marginBottom: 24 }}>
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
              overflow: "hidden",
              marginVertical: 10,
            }}
          >
            {labelInformation.plate_img ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${labelInformation.plate_img}` }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <TouchableOpacity onPress={takePlatePhoto} activeOpacity={0.8}>
                <Ionicons name="camera-sharp" size={36} color={colors.light[800]} />
              </TouchableOpacity>
            )}
          </View>
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
        <View style={{ width: "100%", marginBottom: 24 }}>
          <Text style={styles.field}>Ingrese VIN:</Text>
          <CustomTextInput autoCapitalize="characters" maxLength={17} size="lg" />
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
          isLoading={false}
        />
        <CustomButton
          text="VIN Plate"
          onPress={handlePrintLabel_2}
          type="primary"
          size="lg"
          isLoading={false}
        />
        <CustomButton
          text="Logo base64"
          onPress={handlePrintLabel_3}
          type="primary"
          size="lg"
          isLoading={false}
        />
        <CustomButton
          text="Logo PNG"
          onPress={handlePrintLabel_4}
          type="primary"
          size="lg"
          isLoading={false}
        />
        <CustomButton
          text="Logo URL"
          onPress={handlePrintLabel_5}
          type="primary"
          size="lg"
          isLoading={false}
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

import { Modal, Text, View, StyleSheet, Image } from "react-native";
import { colors } from "@/constants/theme";
import CustomButton from "./button";

const car_icon = require("@/assets/icons/nissan.png");

type Preview = {
  visible: boolean;
  close: () => void;
  vin?: string;
  plate?: string;
  logo?: string;
};

const LabelPreview = ({ vin, plate, logo }: { vin?: string; plate?: string; logo?: string }) => {
  return (
    <>
      <View style={styles.label}>
        <Text style={styles.labeltext}>{vin}</Text>
        <Text style={styles.labeltext}>{plate}</Text>
        <Image source={car_icon} style={{ width: 56, height: 56 }} />
      </View>
    </>
  );
};

export default function PreviewModal({ visible, close, vin, plate, logo }: Preview) {
  return (
    <>
      <Modal visible={visible} animationType="slide" transparent style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.title}>Vista previa</Text>
          <LabelPreview vin={vin} plate={plate} logo={logo} />
          <CustomButton text="Cerrar" onPress={close} type="secondary" />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "90%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    height: "64%",
    backgroundColor: colors.white,
    marginHorizontal: "auto",
    marginVertical: "auto",
    borderWidth: 2,
    borderColor: colors.light[400],
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 20,
  },
  label: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: colors.light[400],
    padding: 10,
    borderRadius: 8,
  },
  labeltext: {
    fontFamily: "Sora_SemiBold",
    fontSize: 24,
  },
});

import { Modal, Text, View, StyleSheet, Image } from "react-native";
import { colors } from "@/constants/theme";
import CustomButton from "./button";

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
        {logo && <Image source={{ uri: logo }} style={{ width: 64, height: 64, marginBottom: 2 }} />}
        {vin && <Text style={styles.vin}>{vin}</Text>}
        {plate && <Text style={styles.plate}>{plate}</Text>}
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
          <CustomButton text="Cerrar" onPress={close} type="primary" />
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
    width: "100%",
    height: "90%",
    backgroundColor: "#fff",
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
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.light[400],
    padding: 10,
    borderRadius: 8,
  },
  vin: {
    fontFamily: "Sora_SemiBold",
    fontSize: 14,
    marginBottom: 2,
  },
  plate: {
    fontFamily: "Sora_SemiBold",
    fontSize: 26,
    marginBottom: 2,
  },
});

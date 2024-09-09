import { Modal, Text, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { colors } from "@/constants/theme";
import CustomButton from "./button";
import { PrintTemplate } from "@/constants/templates";

type Preview = {
  visible: boolean;
  close: () => void;
  vin?: string;
  plate?: string;
  logo?: string;
};

export default function PreviewModal({ visible, close, vin, plate, logo }: Preview) {
  // Generate the HTML string using the PrintTemplate function
  const htmlContent = PrintTemplate({ vin: vin as string, plate: plate as string, logo: logo as string });

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.title}>Vista previa</Text>

          {/* Render the HTML content using WebView */}
          <WebView
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
            style={styles.webView}
            scalesPageToFit={true} // Fit the content to the WebView
          />

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
  webView: {
    width: 800,
    height: 800,
    borderWidth: 1,
    borderColor: colors.light[400],
    borderRadius: 8,
  },
});

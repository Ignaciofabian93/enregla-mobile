import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";
import { View } from "react-native";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <View>
        <CameraView
          style={{ width: "100%", height: "10%" }}
          facing="back"
          zoom={0}
          mode="picture"
          onBarcodeScanned={(e) => console.log("SCAN", e)}
          barcodeScannerSettings={{ barcodeTypes: ["pdf417"] }}
        >
          <View></View>
        </CameraView>
      </View>
    </>
  );
}

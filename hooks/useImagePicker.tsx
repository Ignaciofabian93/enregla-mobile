import { useState } from "react";
import { launchCameraAsync, requestCameraPermissionsAsync, MediaTypeOptions } from "expo-image-picker";
import { Alert } from "react-native";
import MlKitOcr from "react-native-mlkit-ocr";

export default function useImagePicker() {
  const [plateImage, setPlateImage] = useState<string>("");
  const [plateText, setPlateText] = useState<string>("");
  const [vinImage, setVinImage] = useState<string>("");
  const [vinText, setVinText] = useState<string>("");

  const processImage = async (image: string) => {
    try {
      const text = await MlKitOcr.detectFromUri(image);
      let formattedPlate = text[0].text.replace(/[^A-Z0-9]/gi, "");

      return formattedPlate;
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar la imagen");
    }
  };

  const takePlatePhoto = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status === "granted") {
      const image = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 0.9,
        allowsEditing: true,
        base64: true,
      });

      if (image.assets) {
        setPlateImage(image.assets[0].base64 as string);
        const text = await processImage(image.assets[0].uri);
        if (!text) {
          Alert.alert("Error", "No se pudo procesar la imagen. Inténtelo nuevamente o ingrese el valor manualmente.");
          return;
        } else {
          setPlateText(text as string);
        }
      }
    }
  };

  const takeVINPhoto = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status === "granted") {
      const image = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 0.9,
        allowsEditing: true,
        base64: true,
      });

      if (image.assets) {
        setVinImage(image.assets[0].base64 as string);
        const text = await processImage(image.assets[0].uri);
        if (!text) {
          Alert.alert("Error", "No se pudo procesar la imagen. Inténtelo nuevamente o ingrese el valor manualmente.");
          return;
        } else {
          setVinText(text as string);
        }
      }
    }
  };

  return { plateImage, takePlatePhoto, vinImage, takeVINPhoto, plateText, vinText };
}

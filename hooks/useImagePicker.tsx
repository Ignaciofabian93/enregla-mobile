import { useState } from "react";
import { launchCameraAsync, requestCameraPermissionsAsync, MediaTypeOptions } from "expo-image-picker";
import MlKitOcr from "react-native-mlkit-ocr";

export default function useImagePicker() {
  const [plate, setPlate] = useState<string>("");
  const [plateText, setPlateText] = useState<string>("");
  const [vin, setVin] = useState<string>("");
  const [vinText, setVinText] = useState<string>("");

  const processImage = async (image: string) => {
    try {
      const text = await MlKitOcr.detectFromUri(image);
      console.log(text.map((t) => t.text));
      return text[0].text;
    } catch (error) {
      console.log("ERROR: ", error);
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
        setPlate(image.assets[0].base64 as string);
        const text = await processImage(image.assets[0].uri);
        console.log("TEXT: ", text);
        setPlateText(text as string);
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
        setVin(image.assets[0].base64 as string);
        const text = await processImage(image.assets[0].uri);
        setVinText(text as string);
      }
    }
  };

  return { plate, takePlatePhoto, vin, takeVINPhoto, plateText, vinText };
}

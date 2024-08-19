import { useState } from "react";
import { launchCameraAsync, requestCameraPermissionsAsync, MediaTypeOptions } from "expo-image-picker";
import MlKitOcr from "react-native-mlkit-ocr";

export default function useImagePicker() {
  const [plateImage, setPlateImage] = useState<string>("");
  const [plateText, setPlateText] = useState<string>("");
  const [vinImage, setVinImage] = useState<string>("");
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
        setPlateImage(image.assets[0].base64 as string);
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
        setVinImage(image.assets[0].base64 as string);
        const text = await processImage(image.assets[0].uri);
        console.log("TEXT: ", text);
        setVinText(text as string);
      }
    }
  };

  return { plateImage, takePlatePhoto, vinImage, takeVINPhoto, plateText, vinText };
}

import { useState } from "react";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  MediaTypeOptions,
} from "expo-image-picker";

export default function useImagePicker() {
  const [base64, setBase64] = useState<string>("");

  const takePhoto = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status === "granted") {
      const image = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 0.9,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });

      if (image.assets) {
        setBase64(image.assets[0].base64 as string);
      }
    }
  };

  return { base64, takePhoto };
}

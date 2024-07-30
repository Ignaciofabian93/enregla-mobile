import { useState } from "react";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  MediaTypeOptions,
} from "expo-image-picker";

export default function useImagePicker() {
  const [plate, setPlate] = useState<string>("");
  const [chasis, setChasis] = useState<string>("");

  const takePlatePhoto = async () => {
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
        setPlate(image.assets[0].base64 as string);
      }
    }
  };

  const takeChasisPhoto = async () => {
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
        setChasis(image.assets[0].base64 as string);
      }
    }
  };

  return { plate, takePlatePhoto, chasis, takeChasisPhoto };
}

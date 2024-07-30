import Toast from "react-native-root-toast";
import { colors } from "@/constants/theme";

type Notification = {
  visible: boolean;
  message: string;
  type: "success" | "error" | "info";
};

export default function Notification({ visible, message, type }: Notification) {
  const backgroundStyles = {
    error: colors.warning[600],
    success: colors.primary[600],
    info: colors.light[600],
  };
  return (
    <>
      <Toast
        backgroundColor={backgroundStyles[type]}
        visible={visible}
        position={50}
        shadow={true}
        animation={true}
        textStyle={{ fontFamily: "Sora_Regular" }}
        duration={2000}
        delay={0.5}
        hideOnPress={true}
        containerStyle={{ borderRadius: 8 }}
      >
        {message}
      </Toast>
    </>
  );
}

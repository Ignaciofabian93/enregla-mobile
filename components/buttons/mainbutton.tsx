import { Text, TouchableOpacity, type TouchableOpacityProps, ActivityIndicator } from "react-native";
import { buttonStyles, textStyles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  onPress: () => void;
  type: "primary" | "secondary" | "warning";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

export default function MainButton({ text, onPress, type, size = "md", style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <>
      <TouchableOpacity onPress={onPress} {...rest} style={[buttonStyles.button, buttonStyles[type], buttonStyles[size], style]}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={[textStyles.text, textStyles[type]]}>{text}</Text>}
      </TouchableOpacity>
    </>
  );
}

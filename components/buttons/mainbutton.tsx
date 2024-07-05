import { Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { buttonStyles, textStyles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  onPress: () => void;
  type: "primary" | "secondary" | "warning";
  size?: "sm" | "md" | "lg";
};

export default function MainButton({ text, onPress, type, size = "md", ...rest }: ButtonProps) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        {...rest}
        style={[buttonStyles.button, buttonStyles[type], buttonStyles[size]]}
      >
        <Text style={[textStyles.text, textStyles[type]]}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

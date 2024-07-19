import { StyleSheet, Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { colors } from "@/constants/theme";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  onPress: () => void;
  type: "primary" | "secondary" | "warning";
  size?: "sm" | "md" | "lg";
};

export default function MainButton({ text, onPress, type, size = "md", style, ...rest }: ButtonProps) {
  return (
    <>
      <TouchableOpacity onPress={onPress} {...rest} style={[buttonStyles.button, buttonStyles[type], buttonStyles[size], style]}>
        <Text style={[textStyles.text, textStyles[type]]}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const buttonStyles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    elevation: 3,
  },
  primary: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.light[50],
    borderColor: colors.primary[500],
  },
  warning: {
    backgroundColor: colors.warning[50],
    borderColor: colors.warning[500],
  },
  sm: {
    width: "60%",
  },
  md: {
    width: "80%",
  },
  lg: {
    width: "100%",
  },
});

const textStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  primary: {
    color: colors.light[50],
  },
  secondary: {
    color: colors.primary[500],
  },
  warning: {
    color: colors.warning[500],
  },
});

import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

type Button = TouchableOpacityProps & {
  text: string;
  type?: "primary" | "secondary" | "warning";
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function CustomButton({
  text,
  type = "primary",
  onPress,
  isLoading,
  size = "lg",
  disabled = false,
  ...rest
}: Button) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        {...rest}
        style={[styles.button, styles[type], styles[size], disabled && styles.disabled]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={type === "primary" ? "#fff" : "#f34"} />
        ) : (
          <Text style={[styles.text, styles[type], disabled && styles.disabled]}>{text}</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderWidth: 2,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Sora_Regular",
  },
  primary: {
    borderColor: colors.primary[600],
    backgroundColor: colors.primary[600],
    color: "white",
  },
  disabled: {
    backgroundColor: colors.light[600],
    color: colors.light[200],
    borderColor: colors.light[300],
  },
  secondary: {
    borderColor: colors.primary[500],
    backgroundColor: "#fff",
    color: colors.primary[500],
  },
  warning: {
    borderColor: colors.warning[900],
    backgroundColor: "#fff",
    color: colors.warning[900],
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

import { colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary[300],
    borderColor: colors.primary[400],
  },
  secondary: {},
  warning: {
    backgroundColor: colors.warning[50],
    borderColor: colors.warning[500],
  },
  sm: {
    width: "50%",
  },
  md: {
    width: "70%",
  },
  lg: {
    width: "90%",
  },
});

export const textStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  primary: {
    color: colors.light[50],
  },
  secondary: {},
  warning: {
    color: colors.warning[500],
  },
});

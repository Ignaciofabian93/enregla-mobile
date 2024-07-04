import { colors, radius, spacing } from "@/constants/theme";
import { TextInput, type TextInputProps, StyleSheet } from "react-native";

type InputProps = TextInputProps & {
  size: "sm" | "md" | "lg" | "xl";
};

export default function CustomTextInput({ size = "lg", value, onChangeText, placeholder, ...rest }: InputProps) {
  return (
    <>
      <TextInput
        style={[styles.input, styles[size]]}
        {...rest}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: colors.textWhite,
    height: 56,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    fontStyle: "italic",
    marginVertical: spacing.md,
  },
  sm: {},
  md: {},
  lg: {},
  xl: {},
});

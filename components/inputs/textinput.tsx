import { colors, fontStyles, radius, spacing } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, type TextInputProps, StyleSheet, View, Text } from "react-native";

type InputProps = TextInputProps & {
  size: "sm" | "md" | "lg";
  errorMessage?: string;
  isInvalid?: boolean;
  icon?: boolean;
  iconName?: "eye" | "eye-off" | "mail";
  onIconPress?: () => void;
};

export default function CustomTextInput({
  size = "lg",
  value,
  onChangeText,
  placeholder,
  isInvalid,
  errorMessage,
  icon = false,
  iconName,
  onIconPress,
  secureTextEntry = false,
  ...rest
}: InputProps) {
  const checkBorderColor = () => {
    if (!value?.length) return colors.light[400];
    else if (isInvalid) return colors.warning[600];
    else return colors.primary[600];
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, styles[size], fontStyles.link, { borderColor: checkBorderColor() }]}
          {...rest}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.placeholder}
        />
        {icon && iconName && (
          <Ionicons
            name={iconName}
            size={24}
            style={{ position: "absolute", top: "29%", right: "5%" }}
            color={colors.light[500]}
            onPress={onIconPress}
          />
        )}
        {errorMessage && isInvalid ? (
          <View>
            <Text style={[fontStyles.mark, styles.error]}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    marginVertical: spacing.md,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    height: 56,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    backgroundColor: colors.light[100],
    elevation: 2,
  },
  error: {
    color: colors.warning[600],
    position: "absolute",
    bottom: -16,
    left: 6,
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

import { colors } from "@/constants/theme";
import { TextInput, type TextInputProps, StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type InputProps = TextInputProps & {
  size: "sm" | "md" | "lg";
  errorMessage?: string;
  isInvalid?: boolean;
  icon?: boolean;
  iconName?: "eye" | "eye-off" | "mail" | "person";
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
  keyboardType = "default",
  ...rest
}: InputProps) {
  const checkBorderColor = () => {
    if (!value?.length) return colors.light[400];
    else if (isInvalid) return colors.danger[600];
    else return colors.primary[600];
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, styles[size], { borderColor: checkBorderColor() }]}
          {...rest}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={"#aaa"}
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
            <Text style={[styles.error]}>{errorMessage}</Text>
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
    marginVertical: 10,
    position: "relative",
  },
  input: {
    fontFamily: "Sora_Regular",
    borderWidth: 1,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  error: {
    color: colors.danger[600],
    position: "absolute",
    bottom: -16,
    left: 6,
    fontFamily: "Sora_Regular",
    fontSize: 12,
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

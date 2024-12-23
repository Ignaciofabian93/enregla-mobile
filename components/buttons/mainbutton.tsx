import { Text, StyleSheet, TouchableOpacity, type TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  text: string;
  onPress: () => void;
  type: "primary" | "secondary";
};

export default function MainButton({ text, onPress, type, ...rest }: ButtonProps) {
  return (
    <>
      <TouchableOpacity onPress={onPress} {...rest} style={[styles.button, styles[type]]}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 100,
    width: "100%",
    height: 48,
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
  },
  primary: {},
  secondary: {},
});

import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function KeyBoardDismiss({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
    </>
  );
}

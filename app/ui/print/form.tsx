import { View, StyleSheet } from "react-native";
import useLabelStore from "@/store/label";

export default function Form() {
  const { labelData } = useLabelStore();
  console.log(labelData);

  return (
    <>
      <View style={styles.form}></View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {},
});

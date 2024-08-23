import { Modal, View, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

type CustomModal = {
  visible: boolean;
  children: React.ReactNode;
};

export default function CustomModal({ visible, children }: CustomModal) {
  return (
    <>
      <Modal visible={visible} animationType="slide" transparent style={styles.modal}>
        <View style={styles.container}>{children}</View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "90%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "90%",
    backgroundColor: "#fff",
    marginHorizontal: "auto",
    marginVertical: "auto",
    borderWidth: 2,
    borderColor: colors.light[400],
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
  },
});

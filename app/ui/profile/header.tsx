import { colors, fontStyles } from "@/constants/theme";
import useSessionStore from "@/store/session";
import { View, StyleSheet, Text } from "react-native";

export default function Header() {
  const { user } = useSessionStore();
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={fontStyles.title}>{user.name}</Text>
          <Text style={fontStyles.title}>{user.email}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    paddingHorizontal: 8,
  },
});

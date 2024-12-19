import { colors } from "@/constants/theme";
import { useRouter, Href } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

type MenuCard = {
  title: string;
  link: Href<string | object>;
};

export default function MenuCard({ title, link }: MenuCard) {
  const router = useRouter();

  const navigateTo = () => {
    setTimeout(() => router.replace(link), 300);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={navigateTo}>
        <View>
          <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 18, flexWrap: "wrap" }}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "42%",
    height: "100%",
    borderColor: colors.primary[700],
    borderWidth: 2,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

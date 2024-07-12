import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { labelOptions } from "@/constants/labeloptions";
import Card from "@/components/card";
import useLabelStore from "@/store/label";

type Option = {
  title: string;
  hasLogo?: boolean;
  hasPlate?: boolean;
  hasVin?: boolean;
};

export default function TemplateMenu() {
  const router = useRouter();
  const { handleLabelData } = useLabelStore();

  const selectTemplate = (option: Option) => {
    handleLabelData("has_vin", option.hasVin as boolean);
    handleLabelData("has_logo", option.hasLogo as boolean);
    handleLabelData("has_plate", option.hasPlate as boolean);
    router.push("printform");
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.menu}>
            {labelOptions.map((option, index) => (
              <Card
                key={index}
                title={option.title}
                onPress={() => selectTemplate(option)}
                hasLogo={option.hasLogo}
                hasPlate={option.hasPlate}
                hasVin={option.hasVin}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menu: {
    width: "100%",
    height: "auto",
    alignItems: "center",
  },
  scroll: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
  },
});

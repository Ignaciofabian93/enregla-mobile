import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { colors } from "@/constants/theme";

export default function TabLayout() {
  const [scale] = useState(new Animated.Value(1.0));

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.icon, focused ? styles.focused : styles.default]}>
              <TabBarIcon name={focused ? "home" : "home-outline"} color={focused ? colors.primary[100] : colors.light[400]} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="(printer)"
        options={{
          title: "Imprimir",
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused ? styles.focused : styles.default]}>
              <TabBarIcon name={focused ? "print" : "print-outline"} color={focused ? colors.primary[100] : colors.light[400]} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon, focused ? styles.focused : styles.default]}>
              <TabBarIcon name={focused ? "person-sharp" : "person-outline"} color={focused ? colors.primary[100] : colors.light[400]} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.light[50],
    borderWidth: 0,
    borderTopWidth: 0,
    height: 64,
    shadowColor: colors.light.default,
  },
  icon: {
    width: 50,
    height: 48,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  focused: {
    backgroundColor: colors.primary[300],
    borderColor: colors.primary[300],
    elevation: 1,
  },
  default: {
    backgroundColor: colors.light[100],
    borderColor: colors.light[300],
    elevation: 1,
  },
});

import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { colors } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ccc",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.icon, { backgroundColor: focused ? colors.primary : colors.grey }]}>
              <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.icon, { backgroundColor: focused ? colors.primary : colors.grey }]}>
              <TabBarIcon name={focused ? "person-sharp" : "person-outline"} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.dark,
    borderWidth: 0,
    borderTopWidth: 0,
    height: 56,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

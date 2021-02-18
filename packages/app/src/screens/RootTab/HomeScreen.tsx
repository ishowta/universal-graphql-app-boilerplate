import React from "react";
import { Button, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import tailwind from "tailwind-rn";
import { RootTabList } from "../../App";

export type HomeScreenParams = undefined;
export type HomeScreenProps = BottomTabScreenProps<RootTabList, "Home">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => (
  <View style={tailwind("flex-1 flex items-center justify-around")}>
    <Text style={tailwind("text-2xl")}>Welcome!</Text>
    <View style={tailwind("flex justify-around w-48 h-32")}>
      <Button title="Auth" onPress={() => navigation.navigate("Auth")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </View>
  </View>
);

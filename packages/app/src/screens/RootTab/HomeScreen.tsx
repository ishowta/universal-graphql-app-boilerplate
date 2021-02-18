import type {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import React from "react";
import {Button, Text, View} from "react-native";
import tailwind from "tailwind-rn";
import type {RootTabList} from "../../App";

export type HomeScreenParameters = undefined;
export type HomeScreenProps = BottomTabScreenProps<RootTabList, "Home">;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <View style={tailwind("flex-1 flex items-center justify-around")}>
      <Text style={tailwind("text-2xl")}>Welcome!</Text>
      <View style={tailwind("flex justify-around w-48 h-32")}>
        <Button
          onPress={() => {
            navigation.navigate("Auth");
          }}
          title="Auth"
        />
        <Button
          onPress={() => {
            navigation.navigate("Profile");
          }}
          title="Profile"
        />
      </View>
    </View>
  );
};

import React from "react";
import { Button, Text, View } from "react-native";
import { RootTabList } from "../../App";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type HomeScreenParams = undefined;
export type HomeScreenProps = BottomTabScreenProps<RootTabList, "HomeScreen">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View>
      <Text>Hello</Text>
      <Button title="Auth" onPress={() => navigation.navigate("AuthScreen")} />
    </View>
  );
};

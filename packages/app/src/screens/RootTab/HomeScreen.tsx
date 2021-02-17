import React from "react";
import { Button, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabList } from "../../App";

export type HomeScreenParams = undefined;
export type HomeScreenProps = BottomTabScreenProps<RootTabList, "HomeScreen">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => (
  <View>
    <Text>Hello</Text>
    <Button title="Auth" onPress={() => navigation.navigate("AuthScreen")} />
  </View>
);

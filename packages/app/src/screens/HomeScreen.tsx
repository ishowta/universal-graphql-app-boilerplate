import React from "react";
import { Button, Text, View } from "react-native";
import { AuthScreen } from "./AuthScreen";
import { useNavigation } from "@react-navigation/native";
import { RootTabList } from "../App";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";

export type HomeScreenParams = {};
export type HomeScreenProps = BottomTabScreenProps<RootTabList, "HomeScreen">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View>
      <Text>Hello</Text>
      <Button
        title="Auth"
        onPress={() =>
          navigation.navigate("AuthScreen", {
            providerTags: ["Google"],
          })
        }
      />
    </View>
  );
};

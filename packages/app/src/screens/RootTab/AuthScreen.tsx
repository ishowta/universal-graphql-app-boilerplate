import React, { useCallback } from "react";
import { View } from "react-native";
import { SocialIcon } from "react-native-elements";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import tailwind from "tailwind-rn";
import { RootTabList } from "../../App";

import { useSignIn } from "../../hooks/firebase/useSignIn";

export type AuthScreenParams = undefined;
export type AuthScreenProps = BottomTabScreenProps<RootTabList, "Auth">;
export const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const signIn = useSignIn();
  const onPressAuth = useCallback(
    async (providerTag) => {
      await signIn(providerTag);
      navigation.navigate("Profile");
    },
    [navigation]
  );
  return (
    <View
      style={{
        ...tailwind("flex-1 flex justify-center w-96"),
        margin: "auto", // TODO: Why `m-auto` not work?
      }}
    >
      <SocialIcon
        button
        title="Sign in with Google"
        type="google"
        onPress={() => onPressAuth("google")}
      />
    </View>
  );
};

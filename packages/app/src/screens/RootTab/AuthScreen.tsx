import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useCallback } from "react";
import { View } from "react-native";
import { SocialIcon } from "react-native-elements";
import tailwind from "tailwind-rn";
import type { RootTabList } from "../../App";
import { useSignIn } from "../../hooks/firebase/useSignIn";

export type AuthScreenParameters = undefined;
export type AuthScreenProps = BottomTabScreenProps<RootTabList, "Auth">;
export const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const signIn = useSignIn();
  const onPressAuth = useCallback(
    async (providerTag) => {
      await signIn(providerTag);
      navigation.navigate("Profile");
    },
    [navigation, signIn]
  );

  return (
    <View
      style={{
        ...tailwind("flex-1 flex justify-center w-80"),
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <SocialIcon
        button
        onPress={() => {
          return onPressAuth("google");
        }}
        title="Sign in with Google"
        type="google"
      />
    </View>
  );
};

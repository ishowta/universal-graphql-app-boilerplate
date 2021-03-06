import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useCallback } from "react";
import { View } from "react-native";
import { SocialIcon } from "react-native-elements";
import tailwind from "tailwind-rn";
import type { RootTabList } from "../../App";
import type { AuthProviderTag } from "../../hooks/firebase/useSignIn";
import { useSignIn } from "../../hooks/firebase/useSignIn";

export type AuthScreenParameters = undefined;
export type AuthScreenProps = BottomTabScreenProps<RootTabList, "Auth">;
export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const signIn = useSignIn();
  const onPressAuth = useCallback(
    async (providerTag: AuthProviderTag) => {
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
        onPress={async (): Promise<void> => {
          return onPressAuth("Google");
        }}
        title="Sign in with Google"
        type="google"
      />
    </View>
  );
};

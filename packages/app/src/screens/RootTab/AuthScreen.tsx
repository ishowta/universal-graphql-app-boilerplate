import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { SocialIcon } from "react-native-elements";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabList } from "../../App";
import { useCallback } from "react";
import {
  AuthProviderTag,
  AuthProviderTagList,
  useSignIn,
} from "../../hooks/firebase/useSignIn";

export type AuthScreenParams = undefined;
export type AuthScreenProps = BottomTabScreenProps<RootTabList, "AuthScreen">;
export const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const signIn = useSignIn();
  const onPressAuth = useCallback(
    async (providerTag) => {
      await signIn(providerTag);
      navigation.navigate("UsersScreen");
    },
    [navigation]
  );
  const AuthItem: ListRenderItem<AuthProviderTag> = useCallback(
    ({ item: providerTag }) => {
      switch (providerTag) {
        case "Google":
          return (
            <SocialIcon
              button
              title="Sign in with Google"
              type="google"
              onPress={() => onPressAuth(providerTag)}
            />
          );
      }
    },
    []
  );
  return (
    <FlatList<AuthProviderTag>
      data={AuthProviderTagList}
      renderItem={AuthItem}
      keyExtractor={(tag) => tag}
    />
  );
};

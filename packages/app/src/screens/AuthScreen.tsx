import React from "react";
import { FlatList, ListRenderItem, Platform } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { RootTabList } from "../App";
import { useCallback } from "react";
import { auth } from "../functions/auth";

// TODO: Append several providerTags of auth
export type AuthProviderTag =
  //  | "Apple"
  //  | "Facebook"
  //  | "Twitter"
  "Google";
//  | "PhoneNumber"
//  | "EmailAndPassword"
//  | "Guest"
export type AuthScreenParams = {
  providerTags: AuthProviderTag[];
};
export type AuthScreenProps = BottomTabScreenProps<RootTabList, "AuthScreen">;
export const AuthScreen = ({
  navigation,
  route: {
    params: { providerTags },
  },
}: AuthScreenProps) => {
  const onPressAuth = useCallback(
    async (providerTag) => {
      await auth(providerTag);
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
      data={providerTags}
      renderItem={AuthItem}
      keyExtractor={(tag) => tag}
    />
  );
};

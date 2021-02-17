import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Button, Text, View } from "react-native";
import { graphql } from "react-relay";
import { useQuery } from "relay-hooks";
import { tailwind } from "../../tailwind";
import { UsersScreenQuery } from "./__generated__/UsersScreenQuery.graphql";
import { useAuthState } from "../../hooks/firebase/useAuthState";
import { RootTabList } from "../../App";

import "firebase/auth";

export type UserScreenParams = undefined;
export type UserScreenProps = BottomTabScreenProps<RootTabList, "UsersScreen">;

export const UsersScreen = ({ navigation }: UserScreenProps) => {
  const [user, _isAuthLoading, authError] = useAuthState();
  const {
    data,
    isLoading: _isDbLoading,
    error: dbError,
  } = useQuery<UsersScreenQuery>(
    graphql`
      query UsersScreenQuery($id: String!) {
        user(id: $id) {
          id
          username
          createdAt
        }
      }
    `,
    { id: user?.uid ?? "" },
    { skip: user == null }
  );
  return (
    <View style={tailwind("flex-1 items-center justify-center")}>
      {dbError != null ? (
        <Text>{dbError.message}</Text>
      ) : authError != null ? (
        <Text>{authError.message}</Text>
      ) : (
        <>
          <Text>DB User Name: {data?.user?.username}</Text>
          {user == null ? (
            <Text>Not login</Text>
          ) : (
            <>
              <Text>Auth User ID: {user.uid}</Text>
              <Text>Auth User Email: {user.email}</Text>
              <Text>Auth User Name: {user.displayName}</Text>
            </>
          )}
          <Button
            title="Test"
            onPress={() => navigation.navigate("HomeScreen")}
          />
        </>
      )}
    </View>
  );
};

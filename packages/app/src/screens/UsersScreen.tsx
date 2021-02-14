import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Text, View, _Text } from "react-native";
import { graphql } from "react-relay";
import { useQuery } from "relay-hooks";
import { tailwind } from "../tailwind";
import { UsersScreenQuery } from "./__generated__/UsersScreenQuery.graphql";
import { useAuthState } from "../hooks/useAuthState";
import { RootTabList } from "../App";

export type UserScreenParams = {};
export type UserScreenProps = BottomTabScreenProps<RootTabList, "UsersScreen">;

export const UsersScreen = ({ navigation }: UserScreenProps) => {
  const {
    data,
    isLoading: isDbLoading,
    error: dbError,
  } = useQuery<UsersScreenQuery>(graphql`
    query UsersScreenQuery {
      users {
        nodes {
          id
          nodeId
        }
      }
    }
  `);
  const [user, isAuthLoading, authError] = useAuthState();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    user?.getIdToken().then(setToken);
  }, [user]);
  return (
    <View style={tailwind("flex-1 items-center justify-center")}>
      {dbError != null ? (
        <Text>{dbError.message}</Text>
      ) : authError != null ? (
        <Text>{authError.message}</Text>
      ) : isDbLoading || isAuthLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>DB First User ID: {data!.users?.nodes[0].id}</Text>
          {user == null ? (
            <Text>Not login</Text>
          ) : (
            <>
              <Text>Auth User ID: {user.uid}</Text>
              <Text>Auth User Email: {user.email}</Text>
              <Text>Auth User Name: {user.displayName}</Text>
              <Text>Auth User Token: {token}</Text>
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

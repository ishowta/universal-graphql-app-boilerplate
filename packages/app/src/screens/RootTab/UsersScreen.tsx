import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { graphql } from "react-relay";
import { useQuery } from "relay-hooks";
import type { RootTabList } from "../../App";
import { useAuthState } from "../../hooks/firebase/useAuthState";
import { tailwind } from "../../tailwind";
import type { UsersScreenQuery } from "./__generated__/UsersScreenQuery.graphql";

import "firebase/auth";

export type UserScreenParameters = undefined;
export type UserScreenProps = BottomTabScreenProps<RootTabList, "Profile">;

export const UsersScreen = (_: UserScreenProps) => {
  const [user, _isAuthLoading, authError] = useAuthState();
  const {
    data,
    isLoading: _isDatabaseLoading,
    error: databaseError,
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
    <View style={tailwind("flex-1 justify-center  items-center")}>
      <View>
        {databaseError != null ? (
          <Text>{databaseError.message}</Text>
        ) : authError != null ? (
          <Text>{authError.message}</Text>
        ) : (
          <>
            <Text style={tailwind("text-blue-500")}>
              DB User Name: {data?.user?.username}
            </Text>
            {user == null ? (
              <Text>Not login</Text>
            ) : (
              <>
                <Text>Firebase User ID: {user.uid}</Text>
                <Text>Firebase User Email: {user.email}</Text>
                <Text>Firebase User Name: {user.displayName}</Text>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { graphql } from "react-relay";
import { useLazyLoadQuery } from "relay-hooks";
import type { RootTabList } from "../../App";
import { useAuthState } from "../../hooks/firebase/useAuthState";
import { tailwind } from "../../tailwind";
import type { UsersScreenQuery } from "./__generated__/UsersScreenQuery.graphql";

import "firebase/auth";

export type UserScreenParameters = undefined;
export type UserScreenProps = BottomTabScreenProps<RootTabList, "Profile">;

export const UsersScreen: React.FC<UserScreenProps> = () => {
  const [user, authError] = useAuthState();
  const { data } = useLazyLoadQuery<UsersScreenQuery>(
    graphql`
      query UsersScreenQuery($id: String!) {
        user(id: $id) {
          username
        }
      }
    `,
    user?.uid == null ? undefined : { id: user.uid },
    { skip: user == null }
  );

  return (
    <View style={tailwind("flex-1 justify-center  items-center")}>
      <View>
        {authError != null && <Text>{authError.message}</Text>}
        <>
          {data == null ? (
            <Text>DB Not Login</Text>
          ) : (
            <Text style={tailwind("text-blue-500")}>
              {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                `DB User Name: ${data.user!.username}`
              }
            </Text>
          )}
          {user == null ? (
            <Text>Auth Not login</Text>
          ) : (
            <>
              <Text>{`Firebase User ID: ${user.uid}`}</Text>
              {user.email != null && (
                <Text>{`Firebase User Email: ${user.email}`}</Text>
              )}
              {user.displayName != null && (
                <Text>{`Firebase User Name: ${user.displayName}`}</Text>
              )}
            </>
          )}
        </>
      </View>
    </View>
  );
};

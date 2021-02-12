import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Button, Text, View, _Text } from "react-native";
import { graphql, QueryRenderer } from "react-relay";
import { useQuery } from "relay-hooks";
import { RootTabList } from "../App";
import environment from "../relay";
import { tailwind } from "../tailwind";
import { UsersQuery } from "./__generated__/UsersQuery.graphql";

export type UserProps = undefined;

const Users: React.FC<UserProps> = () => {
  const navigation = useNavigation<
    BottomTabNavigationProp<RootTabList, "Users">
  >();
  const { data, isLoading, error } = useQuery<UsersQuery>(graphql`
    query UsersQuery {
      users {
        nodes {
          id
          nodeId
        }
      }
    }
  `);
  return (
    <View style={tailwind("flex-1 items-center justify-center")}>
      {error != null ? (
        <Text>{error.message}</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>User ID: {data!.users?.nodes[0].id}</Text>
          <Button title="Test" onPress={() => navigation.navigate("Test")} />
        </>
      )}
    </View>
  );
};

const Users2: React.FC = () => {
  const navigation = useNavigation<
    BottomTabNavigationProp<RootTabList, "Users">
  >();

  return (
    <QueryRenderer<UsersQuery>
      environment={environment}
      query={graphql`
        query UsersQuery {
          users {
            nodes {
              id
              nodeId
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <Text>{error.message}</Text>;
        }
        if (!props) {
          return <Text>Loading...</Text>;
        }
        return (
          <View style={tailwind("flex-1 items-center justify-center")}>
            <Text>User ID: {props.users?.nodes[0].id}</Text>
            <Button title="Test" onPress={() => navigation.navigate("Test")} />
          </View>
        );
      }}
    />
  );
};

export default Users;

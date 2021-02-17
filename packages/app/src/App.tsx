import React, { useEffect } from "react";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { graphql, useMutation, useRelayEnvironment } from "relay-hooks";
import { UsersScreen, UserScreenParams } from "./screens/RootTab/UsersScreen";
import { HomeScreen, HomeScreenParams } from "./screens/RootTab/HomeScreen";
import { AuthScreen, AuthScreenParams } from "./screens/RootTab/AuthScreen";
import { FirebaseProvider } from "./providers/firebaseProvider";
import { RelayProvider } from "./providers/relayProvider";
import { AppCreateUserMutation } from "./__generated__/AppCreateUserMutation.graphql";

import "react-native-gesture-handler";
import "./helpers/loadIcons";

const linking: LinkingOptions = {
  prefixes: [],
  config: {
    screens: {
      UsersScreen: "users",
      HomeScreen: "home",
      AuthScreen: "auth",
    },
  },
};

export type RootTabList = {
  HomeScreen: HomeScreenParams;
  UsersScreen: UserScreenParams;
  AuthScreen: AuthScreenParams;
};

const RootTab = createBottomTabNavigator<RootTabList>();

const App: React.FC = () => {
  const tabBarVisible =
    Platform.OS === "ios" ||
    Platform.OS === "android" ||
    (Platform.OS === "web" &&
      (() => {
        const { useMediaQuery } = require("beautiful-react-hooks");
        return useMediaQuery("(max-width: 32rem)");
      })());

  const environment = useRelayEnvironment();
  const [tryCreateUser] = useMutation<AppCreateUserMutation>(
    graphql`
      mutation AppCreateUserMutation($input: CreateUserInput!) {
        createUser(input: $input) {
          user {
            id
          }
        }
      }
    `
  );
  useEffect(() => {
    tryCreateUser({ variables: { input: { user: {} } } }).catch((_) => {});
  }, [environment]);

  return (
    <>
      <NavigationContainer linking={linking}>
        <RootTab.Navigator initialRouteName="HomeScreen">
          <RootTab.Screen
            options={{ tabBarVisible }}
            name="UsersScreen"
            component={UsersScreen}
          />
          <RootTab.Screen
            options={{ tabBarVisible }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <RootTab.Screen
            options={{ tabBarVisible }}
            name="AuthScreen"
            component={AuthScreen}
          />
        </RootTab.Navigator>
      </NavigationContainer>
    </>
  );
};

const AppWithProvider: React.FC = () => (
  <FirebaseProvider>
    <RelayProvider>
      <App />
    </RelayProvider>
  </FirebaseProvider>
);

export default AppWithProvider;

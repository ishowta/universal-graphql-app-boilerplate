import React from "react";
import { UsersScreen, UserScreenParams } from "./screens/RootTab/UsersScreen";
import "react-native-gesture-handler";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, HomeScreenParams } from "./screens/RootTab/HomeScreen";
import { Platform, View } from "react-native";
import { useMediaQuery } from "beautiful-react-hooks";
import { AuthScreen, AuthScreenParams } from "./screens/RootTab/AuthScreen";
import { FirebaseProvider } from "./providers/firebaseProvider";
import "./icons";
import { RelayProvider } from "./providers/relayProvider";
import { graphql, useMutation, useRelayEnvironment } from "relay-hooks";
import { useEffect } from "react";
import { AppCreateUserMutation } from "./__generated__/AppCreateUserMutation.graphql";

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
    (Platform.OS === "web" && useMediaQuery("(max-width: 32rem)"));

  const environment = useRelayEnvironment();
  const [createUser] = useMutation<AppCreateUserMutation>(
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
    createUser({ variables: { input: { user: {} } } });
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

const AppWithProvider: React.FC = () => {
  return (
    <FirebaseProvider>
      <RelayProvider>
        <App />
      </RelayProvider>
    </FirebaseProvider>
  );
};

export default AppWithProvider;

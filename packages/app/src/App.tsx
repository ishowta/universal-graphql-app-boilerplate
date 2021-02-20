import "react-native-gesture-handler";
import "./helpers/loadicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { LinkingOptions } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";
import { graphql, useMutation, useRelayEnvironment } from "relay-hooks";
import type { AppCreateUserMutation } from "./__generated__/AppCreateUserMutation.graphql";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { FirebaseProvider } from "./providers/firebaseProvider";
import { RelayProvider } from "./providers/relayProvider";
import type { AuthScreenParameters } from "./screens/RootTab/AuthScreen";
import { AuthScreen } from "./screens/RootTab/AuthScreen";
import type { HomeScreenParameters } from "./screens/RootTab/HomeScreen";
import { HomeScreen } from "./screens/RootTab/HomeScreen";
import type { UserScreenParameters } from "./screens/RootTab/UsersScreen";
import { UsersScreen } from "./screens/RootTab/UsersScreen";

const linking: LinkingOptions = {
  config: {
    screens: {
      AuthScreen: "auth",
      HomeScreen: "home",
      UsersScreen: "users",
    },
  },
  prefixes: [],
};

export type RootTabList = {
  Home: HomeScreenParameters;
  Profile: UserScreenParameters;
  Auth: AuthScreenParameters;
};

const RootTab = createBottomTabNavigator<RootTabList>();

const App: React.FC = () => {
  const isMobileWidth = useMediaQuery("(max-width: 32rem)");
  const tabBarVisible =
    Platform.OS === "ios" ||
    Platform.OS === "android" ||
    (Platform.OS === "web" && isMobileWidth);

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
    tryCreateUser({ variables: { input: { user: {} } } }).catch(() => {
      return null;
    });
  }, [environment, tryCreateUser]);

  return (
    <FirebaseProvider>
      <RelayProvider>
        <SafeAreaView />
        <NavigationContainer linking={linking}>
          <RootTab.Navigator initialRouteName="Home">
            <RootTab.Screen
              component={HomeScreen}
              name="Home"
              options={{ tabBarVisible }}
            />
            <RootTab.Screen
              component={UsersScreen}
              name="Profile"
              options={{ tabBarVisible }}
            />
            <RootTab.Screen
              component={AuthScreen}
              name="Auth"
              options={{ tabBarVisible }}
            />
          </RootTab.Navigator>
        </NavigationContainer>
      </RelayProvider>
    </FirebaseProvider>
  );
};

export default App;

import React, { useMemo } from "react";
import { UsersScreen, UserScreenParams } from "./screens/UsersScreen";
import "react-native-gesture-handler";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, HomeScreenParams } from "./screens/HomeScreen";
import { Platform, View } from "react-native";
import { useMediaQuery } from "beautiful-react-hooks";
import { RelayEnvironmentProvider } from "relay-hooks";
import environment from "./relay";
import { PropsToParams } from "./utils";
import { AuthScreen, AuthScreenParams } from "./screens/AuthScreen";
import { useEffect } from "react";
import { authSetup } from "./functions/authSetup";
import './icons';

export type RootTabList = {
  HomeScreen: PropsToParams<HomeScreenParams>;
  UsersScreen: PropsToParams<UserScreenParams>;
  AuthScreen: PropsToParams<AuthScreenParams>;
};

const RootTab = createBottomTabNavigator<RootTabList>();

const linking: LinkingOptions = {
  prefixes: [],
  config: {
    screens: {
      UsersScreen: "users",
      HomeScreen: "home",
      AuthScreen: {
        path: "auth",
        stringify: {
          providerTags: (val) => encodeURIComponent(JSON.stringify(val)),
        },
        parse: {
          providerTags: (val) => JSON.parse(decodeURIComponent(val)),
        },
      },
    },
  },
};

const App: React.FC = () => {
  //authSetup();
  useMemo(authSetup, []);
  const tabBarVisible =
    Platform.OS === "ios" ||
    Platform.OS === "android" ||
    (Platform.OS === "web" && useMediaQuery("(max-width: 32rem)"));

  return (
    <>
      <RelayEnvironmentProvider environment={environment}>
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
      </RelayEnvironmentProvider>
    </>
  );
};

export default App;

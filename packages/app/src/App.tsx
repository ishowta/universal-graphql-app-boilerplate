import React from "react";
import Users, { UserProps } from "./screens/Users";
import "react-native-gesture-handler";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test, { TestProps } from "./screens/Test";
import { Platform, View } from "react-native";
import { useMediaQuery } from "beautiful-react-hooks";
import { RelayEnvironmentProvider } from "relay-hooks";
import environment from "./relay";
import { PropsToParams } from "./utils";

export type RootTabList = {
  Users: PropsToParams<UserProps>;
  Test: PropsToParams<TestProps>;
};

const RootTab = createBottomTabNavigator<RootTabList>();

const linking: LinkingOptions = {
  prefixes: [],
  config: {
    screens: {
      Users: "users",
      Test: "test",
    },
  },
};

const App: React.FC = () => {
  const tabBarVisible =
    Platform.OS === "ios" ||
    Platform.OS === "android" ||
    (Platform.OS === "web" && useMediaQuery("(max-width: 32rem)"));

  return (
    <RelayEnvironmentProvider environment={environment}>
      <NavigationContainer linking={linking}>
        <RootTab.Navigator initialRouteName="Users">
          <RootTab.Screen
            options={{ tabBarVisible }}
            name="Users"
            component={Users}
          />
          <RootTab.Screen
            options={{ tabBarVisible }}
            name="Test"
            component={Test}
          />
        </RootTab.Navigator>
      </NavigationContainer>
    </RelayEnvironmentProvider>
  );
};

export default App;

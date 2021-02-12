import React from "react";
import Users, { UserProps } from "./screens/Users";
import "react-native-gesture-handler";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test, { TestProps } from "./screens/Test";
import { Platform, View } from "react-native";
import { useMediaQuery } from "beautiful-react-hooks";

export type RootTabList = {
  Users: UserProps;
  Test: TestProps;
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
  const isMobileNative = Platform.OS === "ios" || Platform.OS === "android";
  const isPortraitMobile = useMediaQuery("(max-width: 32rem)");
  const tabBarVisible = isMobileNative || isPortraitMobile;

  return (
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
  );
};

export default App;

import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Folders from "../screens/Home/Folders/Folders";
import Files from "../screens/Home/Files/Files";
import { globalStyles } from "../constants";

const { Screen, Navigator } = createMaterialBottomTabNavigator();

function HomeBottomTabs() {
  return (
    <Navigator barStyle={globalStyles.bottomTabs}>
      <Screen
        name="Folders"
        component={Folders}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="folder-open" size={24} color={color} />
            ) : (
              <Ionicons name="folder-open-outline" size={24} color={color} />
            ),
        }}
      />
      <Screen
        name="Files"
        component={Files}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="file" size={24} color={color} />
            ) : (
              <FontAwesome name="file-o" size={24} color={color} />
            ),
        }}
      />
    </Navigator>
  );
}

export default HomeBottomTabs;

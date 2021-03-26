import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import FolderDetails from "../screens/Home/Folders/FolderDetails";
import FileDetails from "../screens/Home/Files/FileDetails";
import { globalStyles } from "../constants";

const { Screen, Navigator } = createMaterialBottomTabNavigator();

function DetailsBottomTabs({ route }) {
  // Getting the parent folder Id from the previous screen (see "handleFolderClick.js")
  // and setting it as the initial params for both the tabs.
  // Note: Simply just passing the id as a param to the tab navigator
  // would only pass the param to one of the screens.
  // Example:
  //   navigation.push("Details", {
  //      screen: "FolderDetails", // or "FileDetails"
  //      params: {id}
  //    })
  // Above code will pass the id only to the FolderDetails screen
  // and not to FileDetails

  // Another way around (if not setting initial params) is by using react context

  return (
    <Navigator barStyle={globalStyles.bottomTabs}>
      <Screen
        name="FolderDetails"
        component={FolderDetails}
        initialParams={{ id: route.params.id }}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="folder-open" size={24} color={color} />
            ) : (
              <Ionicons name="folder-open-outline" size={24} color={color} />
            ),
          tabBarLabel: "Folders",
        }}
      />
      <Screen
        name="FileDetails"
        component={FileDetails}
        initialParams={{ id: route.params.id }}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="file" size={24} color={color} />
            ) : (
              <FontAwesome name="file-o" size={24} color={color} />
            ),
          tabBarLabel: "Files",
        }}
      />
    </Navigator>
  );
}

export default DetailsBottomTabs;

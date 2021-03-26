import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../contexts/Auth";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import Profile from "../screens/Profile/Profile";
import HomeBottomTabs from "./HomeBottomTabs";
import DetailsBottomTabs from "./DetailsBottomTabs";
import FilePreview from "../screens/Home/Files/FilePreview";
import Header from "../shared/Header";
import SearchResult from "../screens/Home/Search/SearchResult";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import { fontConfig } from "../constants";

const { Screen, Navigator } = createStackNavigator();

function MainStack() {
  const { currentUser } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerTitle: () => <Header /> }}>
        {!currentUser ? (
          <>
            <Screen name="Login" component={Login} />

            <Screen name="Signup" component={Signup} />

            <Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          <>
            <Screen name="Home" component={HomeBottomTabs} />

            <Screen
              name="Profile"
              component={Profile}
              options={{
                headerTitle: "Profile",
                headerTitleStyle: fontConfig.default.regular,
              }}
            />

            <Screen
              name="SearchResult"
              component={SearchResult}
              options={({ route }) => ({
                headerTitle: `Search for '${route.params.searchTerm}'`,
                headerTitleStyle: fontConfig.default.regular,
              })}
            />

            <Screen
              name="Details"
              component={DetailsBottomTabs}
              options={({ route }) => ({
                headerTitle: `${route.params.folderName}`,
                headerTitleStyle: fontConfig.default.regular,
              })}
            />

            <Screen
              name="FilePreview"
              component={FilePreview}
              options={({ route }) => ({
                headerTitle: route.params.folderName
                  ? `${route.params.folderName}/${route.params.fileName}`
                  : `${route.params.fileName}`,
                headerTitleStyle: fontConfig.default.regular,
              })}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}

export default MainStack;

import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/Auth";
import { colors, globalStyles, fontConfig } from "../constants";

const defaultProfilePic = require("../../assets/images/default-profile.png");
const headerIcon = require("../../assets/images/header-icon.png");

function Header() {
  // main header of the home page
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);

  return (
    <View style={globalStyles.row}>
      <Image source={headerIcon} style={styles.headerIcon} />
      <Text style={styles.headerText}>Drive</Text>

      {currentUser && (
        <TouchableOpacity
          style={styles.headerImg}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={
              currentUser.photoURL
                ? { uri: currentUser.photoURL }
                : defaultProfilePic
            }
            style={styles.profileImg}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 35,
    height: 25,
  },
  headerText: {
    fontSize: 23,
    marginLeft: 3,
    ...fontConfig.default.regular,
  },
  headerImg: {
    position: "absolute",
    right: 0,
  },
  profileImg: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 45,
    borderColor: colors.primary,
  },
});

export default Header;

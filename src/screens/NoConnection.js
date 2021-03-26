import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors, globalStyles } from "../constants";

function NoConnection() {
  return (
    <View
      style={[
        globalStyles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <MaterialIcons name="wifi-off" size={50} color={colors.primary} />
      <Text style={{ fontSize: 15 }}>No internet</Text>
    </View>
  );
}

export default NoConnection;

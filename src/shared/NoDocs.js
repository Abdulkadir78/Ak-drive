import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontConfig } from "../constants";

function NoDocs({ text }) {
  return (
    <View style={styles.noDocsView}>
      <Text style={styles.noDocsText}>No {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noDocsView: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  noDocsText: {
    fontSize: 16,
    ...fontConfig.default.regular,
    color: colors.black,
  },
});

export default NoDocs;

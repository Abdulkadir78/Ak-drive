import React from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";

function IndeterminateProgress({ title }) {
  return (
    <View style={{ alignItems: "center", marginBottom: 10 }}>
      <ProgressBar
        indeterminate={true}
        style={{ width: 150, borderRadius: 10 }}
      />
      <Text>{title}...</Text>
    </View>
  );
}

export default IndeterminateProgress;

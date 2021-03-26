import React from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";

function UploadProgress({ progress }) {
  return (
    <View style={{ alignItems: "center", marginBottom: 10 }}>
      <ProgressBar
        progress={progress / 100}
        indeterminate={progress === 100}
        style={{ width: 150, borderRadius: 10 }}
      />
      <Text>
        {progress === 100 ? "Updating..." : `Uploading - ${progress}%`}
      </Text>
    </View>
  );
}

export default UploadProgress;

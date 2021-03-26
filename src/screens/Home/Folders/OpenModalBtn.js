import React from "react";
import { Surface } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { colors, globalStyles } from "../../../constants";

function OpenModalBtn({ modalOpen }) {
  return (
    <Surface style={globalStyles.fab}>
      <MaterialIcons
        name="create-new-folder"
        size={50}
        color={colors.primary}
        onPress={modalOpen}
      />
    </Surface>
  );
}

export default OpenModalBtn;

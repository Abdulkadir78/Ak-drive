import React from "react";
import { Checkbox } from "react-native-paper";

import { colors } from "../constants";

function PasswordTrigger({ showPassword, handleShowPassword, authLoading }) {
  // password toggle checkbox
  return (
    <Checkbox
      status={showPassword ? "checked" : "unchecked"}
      color={colors.primary}
      uncheckedColor={colors.primary}
      onPress={handleShowPassword}
      disabled={authLoading}
    />
  );
}

export default PasswordTrigger;

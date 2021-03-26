import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

function DismissKeyboard(props) {
  // to dissmiss the keyboard when user presses somwhere outside of a text field
  return (
    <TouchableWithoutFeedback {...props} onPress={() => Keyboard.dismiss()}>
      {props.children}
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyboard;

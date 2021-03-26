import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";

import { colors } from "../../constants";
import handleFolderRename from "../../screens/Home/Folders/functions/handleFolderRename";

function RenameFolderInput({
  userId,
  oldName,
  folderId,
  parentId,
  setShowRenameField,
}) {
  const [newFolderName, setNewFolderName] = useState(null);
  const [maxLength] = useState(20);
  const [nameLength, setNameLength] = useState(oldName.length);
  const [updating, setUpdating] = useState(false);
  const [duplicateFound, setDuplicateFound] = useState(false);

  const handleChange = (val) => {
    setNewFolderName(val);
    setNameLength(val.length);
    if (duplicateFound) {
      setDuplicateFound(false);
    }
  };

  const handleBlur = () => {
    setShowRenameField(false);
  };

  const handleSubmit = async () => {
    if (
      !newFolderName ||
      newFolderName === oldName ||
      newFolderName.length > 20
    ) {
      return;
    }

    setUpdating(true);
    await handleFolderRename(
      userId,
      folderId,
      parentId,
      newFolderName,
      handleDuplicate,
      handleReset
    );
  };

  const handleDuplicate = () => {
    setUpdating(false);
    setDuplicateFound(true);
  };

  const handleReset = () => {
    setNewFolderName(null);
    setUpdating(false);
    setShowRenameField(false);
  };

  return (
    <View>
      {updating ? (
        <ActivityIndicator />
      ) : (
        <>
          {duplicateFound && (
            <Text style={styles.duplicateText}>
              This folder name already exists
            </Text>
          )}

          <TextInput
            defaultValue={oldName}
            value={newFolderName}
            autoFocus={true}
            maxLength={20}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmit}
            onBlur={handleBlur}
            style={styles.renameInput}
          />
          <Text style={styles.lengthCounter}>
            {nameLength}/{maxLength}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  lengthCounter: {
    fontSize: 10,
    textAlign: "right",
    color: colors.black,
  },
  renameInput: {
    height: 33,
    width: 100,
  },
  duplicateText: {
    fontSize: 12,
    textAlign: "center",
    width: 100,
    color: colors.error,
  },
});

export default RenameFolderInput;

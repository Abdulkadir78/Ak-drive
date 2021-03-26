import React, { useContext, useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import { AuthContext } from "../../../contexts/Auth";
import { colors, fontConfig, globalStyles } from "../../../constants";
import handleFolderCreate from "./functions/handleFolderCreate";
import OpenModalBtn from "./OpenModalBtn";
import IndeterminateProgress from "../../../shared/IndeterminateProgress";
import DismissKeyboard from "../../../shared/DismissKeyboard";

function AddFolderModal({ folderId }) {
  const [openModal, setOpenModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [duplicateFound, setDuplicateFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maxLength] = useState(20);
  const [nameLength, setNameLength] = useState(0);

  const { currentUser } = useContext(AuthContext);

  const modalOpen = () => {
    setOpenModal(true);
  };

  const modalClose = () => {
    setFolderName("");
    setDuplicateFound(false);
    setLoading(false);
    setOpenModal(false);
  };

  const handleDuplicate = () => {
    setLoading(false);
    setDuplicateFound(true);
  };

  const handleCreate = () => {
    setLoading(true);
    setDuplicateFound(false);

    handleFolderCreate(
      folderName,
      folderId,
      currentUser.uid,
      handleDuplicate,
      modalClose
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <OpenModalBtn modalOpen={modalOpen} />

      <Modal
        animationType="slide"
        visible={openModal}
        onRequestClose={modalClose}
      >
        <DismissKeyboard>
          <View style={styles.modalView}>
            <Entypo
              name="cross"
              size={35}
              color="black"
              onPress={modalClose}
              style={{ alignSelf: "center" }}
            />

            <Text style={styles.heading}>Create a folder</Text>
            <Divider style={globalStyles.divider} />

            {loading && <IndeterminateProgress title="Creating" />}

            {duplicateFound && (
              <Text style={{ ...globalStyles.error, marginBottom: 10 }}>
                A folder named '{folderName}' already exists
              </Text>
            )}

            <TextInput
              label="Folder name"
              mode="outlined"
              maxLength={maxLength}
              value={folderName}
              onChangeText={(val) => {
                setFolderName(val);
                setNameLength(val.length);
                if (duplicateFound) {
                  setDuplicateFound(false);
                }
              }}
              editable={!loading}
              style={{ ...globalStyles.input, backgroundColor: "white" }}
            />

            <Text style={styles.lengthCount}>
              {nameLength}/{maxLength}
            </Text>

            <Button
              mode="contained"
              onPress={handleCreate}
              disabled={loading || !folderName}
              style={{ marginTop: 5 }}
            >
              Create
            </Button>
          </View>
        </DismissKeyboard>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  heading: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
    ...fontConfig.default.regular,
  },
  lengthCount: {
    textAlign: "right",
    marginTop: -5,
    color: colors.black,
    ...fontConfig.default.regular,
  },
});

export default AddFolderModal;

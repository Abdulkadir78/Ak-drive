import React, { useState } from "react";
import { View } from "react-native";
import { Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import Upload from "./Upload";
import { colors, globalStyles } from "../../../constants";

function AddFileBtn({ parentId }) {
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const [startUpload, setStartUpload] = useState(false);

  const handleFileSelect = async () => {
    const result = await DocumentPicker.getDocumentAsync();

    if (result.type !== "cancel") {
      const response = await fetch(result.uri);
      const file = await response.blob();

      setDocumentName(result.name);
      setDocument(file);
      setStartUpload(true);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Surface style={globalStyles.fab}>
        <MaterialCommunityIcons
          name="file-plus"
          size={50}
          color={colors.primary}
          onPress={handleFileSelect}
        />
      </Surface>

      {startUpload && (
        <Upload
          document={document}
          documentName={documentName}
          parentId={parentId}
          setStartUpload={setStartUpload}
        />
      )}
    </View>
  );
}

export default AddFileBtn;

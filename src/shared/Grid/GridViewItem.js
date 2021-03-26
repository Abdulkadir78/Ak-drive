import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { Menu, Divider } from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors, fontConfig } from "../../constants";
import handleFolderClick from "../../screens/Home/Folders/functions/handleFolderClick";
import handleFolderDelete from "../../screens/Home/Folders/functions/handleFolderDelete";
import RenameFolderInput from "./RenameFolderInput";
import handleFileClick from "../../screens/Home/Files/functions/handleFileClick";
import handleFileDelete from "../../screens/Home/Files/functions/handleFileDelete";
import handleFileDownload from "../../screens/Home/Files/functions/handleFileDownload";

function GridViewItem({ item, userId, setShowSnack }) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [showRenameField, setShowRenameField] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const truncateName = (documentName) => `${documentName.slice(0, 13)}...`;

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          item.type === "file"
            ? handleFileClick(
                navigation,
                item.url,
                item.documentType,
                item.name,
                item.parentId
              )
            : handleFolderClick(navigation, item.id, item.name)
        }
        style={{ width: useWindowDimensions().width / 2 }}
      >
        {/* folder/file icon */}
        {item.type === "file" ? (
          <MaterialIcons
            name="insert-drive-file"
            size={120}
            color={colors.blue}
          />
        ) : (
          <MaterialIcons
            name="folder"
            size={130}
            color={colors.yellow}
            style={{ marginBottom: -10 }}
          />
        )}

        <View style={styles.folderNameView}>
          {showRenameField ? (
            // rename folder text input
            <RenameFolderInput
              userId={userId}
              oldName={item.name}
              folderId={item.id}
              parentId={item.parentId}
              setShowRenameField={setShowRenameField}
            />
          ) : (
            // folder name
            <Text style={styles.folderName}>
              {item.name.length > 13 ? truncateName(item.name) : item.name}
            </Text>
          )}

          {/* options */}
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <MaterialCommunityIcons
                name="dots-vertical"
                size={27}
                color={colors.black}
                onPress={() => setVisible(true)}
              />
            }
          >
            {/* rename folder btn */}
            {item.type === "folder" && (
              <>
                <Menu.Item
                  title="Rename"
                  onPress={() => {
                    setShowRenameField(true);
                    setVisible(false);
                  }}
                />
                <Divider />
              </>
            )}

            {/* download file btn */}
            {item.type === "file" && (
              <>
                <Menu.Item
                  title={downloading ? "Downloading..." : "Download"}
                  titleStyle={
                    downloading && { color: colors.green, fontWeight: "bold" }
                  }
                  onPress={() =>
                    handleFileDownload(
                      item,
                      setDownloading,
                      setVisible,
                      setShowSnack
                    )
                  }
                />
                <Divider />
              </>
            )}

            {/* delete folder/file btn */}
            <Menu.Item
              onPress={() =>
                item.type === "file"
                  ? handleFileDelete(item, userId)
                  : handleFolderDelete(item, userId)
              }
              title="Delete"
            />
          </Menu>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  folderNameView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  folderName: {
    color: colors.black,
    fontSize: 15,
    paddingRight: 7,
    ...fontConfig.default.regular,
  },
});

export default GridViewItem;

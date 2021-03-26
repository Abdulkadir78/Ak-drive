import React, { useEffect, useState, useContext } from "react";
import { View } from "react-native";

import { globalStyles } from "../../../constants";
import { AuthContext } from "../../../contexts/Auth";
import AddFolderModal from "./AddFolderModal";
import getFolders from "./functions/getFolders";
import PageLoader from "../../../shared/PageLoader";
import GridView from "../../../shared/Grid/GridView";
import NoDocs from "../../../shared/NoDocs";

function FolderDetails({ route }) {
  // this shows folders that are inside the current folder
  const [children, setChildren] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const { id } = route.params;

  useEffect(() => {
    const unsubscribe = getFolders(
      currentUser,
      id,
      setChildren,
      setPageLoading
    );

    return () => unsubscribe();
  }, [currentUser, id, setChildren, setPageLoading]);

  return pageLoading ? (
    <PageLoader />
  ) : (
    <View style={globalStyles.container}>
      <AddFolderModal folderId={id} />

      {children.length ? (
        <GridView documents={children} type="folder" userId={currentUser.uid} />
      ) : (
        <NoDocs text="folders" />
      )}
    </View>
  );
}

export default FolderDetails;

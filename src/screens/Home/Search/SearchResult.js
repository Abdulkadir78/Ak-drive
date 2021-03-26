import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { AuthContext } from "../../../contexts/Auth";
import { globalStyles } from "../../../constants";
import getDocs from "./functions/getDocs";
import PageLoader from "../../../shared/PageLoader";
import GridView from "../../../shared/Grid/GridView";
import NoDocs from "../../../shared/NoDocs";

function SearchResult({ route }) {
  const { searchTerm } = route.params;
  const { currentUser } = useContext(AuthContext);
  const [folderResults, setFolderResults] = useState([]);
  const [fileResults, setFileResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get folders matching the search term
    const unsubFolders = getDocs(
      searchTerm.trim().toLowerCase(),
      currentUser.uid,
      "folders",
      setFolderResults
    );

    // get files matching the search term
    const unsubFiles = getDocs(
      searchTerm.trim().toLowerCase(),
      currentUser.uid,
      "files",
      setFileResults,
      setLoading
    );

    return () => {
      unsubFolders();
      unsubFiles();
    };
  }, [
    currentUser.uid,
    searchTerm,
    setFolderResults,
    setFileResults,
    setLoading,
  ]);

  return loading ? (
    <PageLoader />
  ) : !folderResults.length && !fileResults.length ? (
    <NoDocs text="results" />
  ) : (
    <View style={globalStyles.container}>
      <GridView
        documents={[...folderResults, ...fileResults]}
        userId={currentUser.uid}
      />
    </View>
  );
}

export default SearchResult;

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../constants";

const SearchBar = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchTerm("");
      return;
    }

    navigation.navigate("SearchResult", { searchTerm });
    setSearchTerm("");
  };

  return (
    <Searchbar
      placeholder="Search"
      value={searchTerm}
      onChangeText={(val) => setSearchTerm(val)}
      iconColor={colors.primary}
      style={styles.searchBar}
      onSubmitEditing={handleSearch}
      onIconPress={handleSearch}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    marginVertical: 7,
  },
});

export default SearchBar;

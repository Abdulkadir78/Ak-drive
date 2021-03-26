const handleFolderClick = (navigation, id, folderName) => {
  navigation.push("Details", { id, folderName });
};

export default handleFolderClick;

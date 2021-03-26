import { firestore } from "../../../../../firebase/config";

const handleFileClick = async (
  navigation,
  url,
  documentType,
  fileName,
  parentId
) => {
  let folderName = null;

  if (parentId !== null) {
    // get the name of the folder in which the file is present
    // to show the folder name in the header of file preview
    // if file is in the root folder, then the folder name will be null

    try {
      const doc = await firestore.collection("folders").doc(parentId).get();
      const { name } = doc.data();
      folderName = name;
    } catch (err) {
      console.log(err);
    }
  }

  navigation.navigate("FilePreview", {
    url,
    documentType,
    fileName,
    folderName,
  });
};

export default handleFileClick;

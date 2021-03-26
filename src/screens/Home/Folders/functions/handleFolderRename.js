import { firestore } from "../../../../../firebase/config";
import checkForDuplicate from "./checkForDuplicate";

const handleFolderRename = async (
  userId,
  folderId,
  parentId,
  newFolderName,
  handleDuplicate,
  handleReset
) => {
  try {
    // check for folders with the same name
    const duplicate = await checkForDuplicate(
      userId,
      parentId,
      newFolderName,
      handleDuplicate
    );

    if (!duplicate) {
      await firestore
        .collection("folders")
        .doc(folderId)
        .update({ name: newFolderName });

      handleReset();
    }
  } catch (err) {
    console.log(err);
  }
};

export default handleFolderRename;

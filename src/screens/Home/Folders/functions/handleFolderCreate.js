import { firestore, timestamp } from "../../../../../firebase/config";
import checkForDuplicate from "./checkForDuplicate";

const handleFolderCreate = async (
  folderName,
  parentId,
  userId,
  handleDuplicate,
  modalClose
) => {
  if (!folderName) {
    return;
  }

  try {
    // check for duplicate folders in the same parent folder
    const duplicate = await checkForDuplicate(
      userId,
      parentId,
      folderName,
      handleDuplicate
    );

    // create the folder if no duplicates found
    if (!duplicate) {
      await firestore.collection("folders").add({
        name: folderName.trim(),
        ownerId: userId,
        parentId,
        type: "folder",
        createdAt: timestamp(),
      });
      modalClose();
    }
  } catch (err) {
    console.log(err);
  }
};

export default handleFolderCreate;

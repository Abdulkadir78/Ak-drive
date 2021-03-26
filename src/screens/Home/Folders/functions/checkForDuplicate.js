import { firestore } from "../../../../../firebase/config";

const checkForDuplicate = async (
  userId,
  parentId,
  folderName,
  handleDuplicate
) => {
  let duplicate = false;

  try {
    const foldersInParentId = await firestore
      .collection("folders")
      .where("ownerId", "==", userId)
      .where("parentId", "==", parentId)
      .where("name", "==", folderName)
      .get();

    if (foldersInParentId.docs[0]) {
      handleDuplicate();
      duplicate = true;
    }

    return duplicate;
  } catch (err) {
    console.log(err);
  }
};

export default checkForDuplicate;

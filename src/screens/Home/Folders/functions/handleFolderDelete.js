import { Alert } from "react-native";
import { firestore, storage } from "../../../../../firebase/config";

const handleFolderDelete = async (folder, userId) => {
  try {
    if (folder.ownerId === userId) {
      const childFolders = await firestore
        .collection("folders")
        .where("ownerId", "==", userId)
        .where("parentId", "==", folder.id)
        .get();

      if (childFolders.docs.length) {
        return Alert.alert(
          "Something went wrong",
          "Make sure the folder is empty before deleting."
        );
      }

      const childFiles = await firestore
        .collection("files")
        .where("ownerId", "==", userId)
        .where("parentId", "==", folder.id)
        .get();

      // create a batch to delete multiple files inside the folder
      const batch = firestore.batch();

      childFiles.forEach((doc) => {
        batch.delete(doc.ref);
        // delete file from storage
        storage
          .ref(`${userId}/${doc.data().storageId}`)
          .delete()
          .catch((err) => console.log(err));
      });
      // delete all files inside the folder
      await batch.commit();

      // delete the folder
      await firestore.collection("folders").doc(folder.id).delete();
    }
  } catch (err) {
    console.log(err);
  }
};

export default handleFolderDelete;

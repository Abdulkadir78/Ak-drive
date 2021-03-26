import { firestore, storage } from "../../../../../firebase/config";

const handleFileDelete = async (file, userId) => {
  try {
    if (file.ownerId === userId) {
      // delete from firestore
      await firestore.collection("files").doc(file.id).delete();

      // delete from storage
      await storage.ref(`${userId}/${file.storageId}`).delete();
    }
  } catch (err) {
    console.log(err);
  }
};

export default handleFileDelete;

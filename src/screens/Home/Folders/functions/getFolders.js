import { firestore } from "../../../../../firebase/config";

const getFolders = (currentUser, folderId, setFolders, setPageLoading) =>
  firestore
    .collection("folders")
    .where("ownerId", "==", currentUser.uid)
    .where("parentId", "==", folderId)
    .orderBy("createdAt", "desc")
    .onSnapshot(
      (snap) => {
        const documents = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFolders(documents);
        setPageLoading(false);
      },
      (err) => console.log(err)
    );

export default getFolders;

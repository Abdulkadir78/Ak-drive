import { firestore } from "../../../../../firebase/config";

const getFiles = (currentUser, parentId, setFiles, setPageLoading) =>
  firestore
    .collection("files")
    .where("ownerId", "==", currentUser.uid)
    .where("parentId", "==", parentId)
    .orderBy("createdAt", "desc")
    .onSnapshot(
      (snap) => {
        const documents = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFiles(documents);
        setPageLoading(false);
      },
      (err) => console.log(err)
    );

export default getFiles;

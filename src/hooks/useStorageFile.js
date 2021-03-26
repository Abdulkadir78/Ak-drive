import "react-native-get-random-values";
import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore, storage, timestamp } from "../../firebase/config";

import { AuthContext } from "../contexts/Auth";

function useStorageFile(document, documentName, parentId) {
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const storageId = uuidv4();

    const storageRef = storage.ref(`${currentUser.uid}/${storageId}`);

    storageRef.put(document).on(
      "state_changed",
      (snap) => {
        // progress of the upload
        const percentage = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (err) => console.log(err),
      async () => {
        try {
          // getting the url from firebase storage
          const downloadUrl = await storageRef.getDownloadURL();

          // create a document in firestore
          await firestore.collection("files").add({
            name: documentName,
            ownerId: currentUser.uid,
            documentType: document.type,
            url: downloadUrl,
            type: "file",
            createdAt: timestamp(),
            storageId,
            parentId,
          });

          setUrl(downloadUrl);
        } catch (err) {
          console.log(err);
        }
      }
    );
  }, [currentUser, document, documentName, parentId, setUrl, setProgress]);

  return { url, progress };
}

export default useStorageFile;

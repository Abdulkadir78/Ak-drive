import { useState, useEffect, useContext } from "react";
import { storage } from "../../firebase/config";

import { AuthContext } from "../contexts/Auth";

function useStorage(image) {
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const storageRef = storage.ref(`${currentUser.uid}/profilePic`);

    storageRef.put(image).on(
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

          // update user's profile
          await currentUser.updateProfile({
            photoURL: downloadUrl,
          });

          setUrl(downloadUrl);
        } catch (err) {
          console.log(err);
        }
      }
    );
  }, [currentUser, image, setUrl, setProgress]);

  return { url, progress };
}

export default useStorage;

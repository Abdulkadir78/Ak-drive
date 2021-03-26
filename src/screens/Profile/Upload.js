import React, { useEffect } from "react";
import { View } from "react-native";

import useStorage from "../../hooks/useStorage";
import UploadProgress from "../../shared/UploadProgress";

function Upload({ image, setStartUpload }) {
  const { url, progress } = useStorage(image);

  useEffect(() => {
    if (url) {
      setStartUpload(false);
    }
  }, [url, setStartUpload]);

  return (
    <View>
      <UploadProgress progress={progress} />
    </View>
  );
}

export default Upload;

import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const handleFileDownload = async (
  file,
  setDownloading,
  setVisible,
  setShowSnack
) => {
  try {
    // ask for storage permission
    const response = await MediaLibrary.requestPermissionsAsync();

    // if permission is granted
    if (response.granted) {
      setDownloading(true);

      // download file from network url to local uri
      const { uri } = await FileSystem.downloadAsync(
        file.url,
        `${FileSystem.documentDirectory}/${file.name}`
      );

      // create asset from the local uri
      const asset = await MediaLibrary.createAssetAsync(uri);

      // create an album in phone storage and move the asset into the album created
      await MediaLibrary.createAlbumAsync("Ak drive", asset, false);

      setDownloading(false);
      setVisible(false);

      // show a snackbar indicating successful donwload
      setShowSnack(true);
      return setTimeout(() => {
        setShowSnack(false);
      }, 1000);
    }

    // if permission is denied
    Alert.alert(
      "Permission required",
      "Storage permission is required to download the file."
    );

    setVisible(false);
  } catch (err) {
    setDownloading(false);
    setVisible(false);
  }
};

export default handleFileDownload;

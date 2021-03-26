import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { WebView } from "react-native-webview";

function FilePreview({ route }) {
  const { url, documentType } = route.params;

  return documentType === "application/pdf" ? (
    <PDFReader
      source={{
        uri: url,
      }}
      withPinchZoom={true}
      withScroll={true}
    />
  ) : (
    <WebView source={{ uri: url }} />
  );
}

export default FilePreview;

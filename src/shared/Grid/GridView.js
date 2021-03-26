import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Snackbar } from "react-native-paper";

import { globalStyles } from "../../constants";
import GridViewItem from "./GridViewItem";

function GridView({ documents, userId }) {
  const [showSnack, setShowSnack] = useState(false);

  return (
    <View style={globalStyles.container}>
      <Snackbar visible={showSnack} onDismiss={() => setShowSnack(false)}>
        File downloaded successfully
      </Snackbar>

      <FlatList
        removeClippedSubviews={false}
        numColumns={2}
        data={documents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GridViewItem
            item={item}
            userId={userId}
            setShowSnack={setShowSnack}
          />
        )}
        style={{ marginBottom: 10 }}
      />
    </View>
  );
}

export default GridView;

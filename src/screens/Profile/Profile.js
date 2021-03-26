import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import BottomSheet from "reanimated-bottom-sheet";

import { colors, globalStyles, fontConfig } from "../../constants";
import { AuthContext } from "../../contexts/Auth";
import IndeterminateProgress from "../../shared/IndeterminateProgress";
import Upload from "./Upload";

const defaultProfilePic = require("../../../assets/images/default-profile.png");

function Profile() {
  const {
    currentUser,
    logout,
    authLoading,
    error,
    removeProfilePic,
  } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [startUpload, setStartUpload] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [removingPic, setRemovingPic] = useState(false);

  const bottomSheetRef = useRef(null);
  const userPic = currentUser && currentUser.photoURL;

  useEffect(() => {
    setProfilePic(currentUser?.photoURL || null);
  }, [setProfilePic, currentUser, userPic]);

  const closeBottomSheet = () => {
    bottomSheetRef.current.snapTo(1);
  };

  const handlePicChange = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const response = await fetch(result.uri);
        const file = await response.blob();

        setImage(file);
        setStartUpload(true);
        closeBottomSheet();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePicRemove = async () => {
    if (removingPic) {
      return;
    }
    closeBottomSheet();
    setRemovingPic(true);
    await removeProfilePic();

    setProfilePic(currentUser.photoURL);
    setRemovingPic(false);
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: colors.primary,
        height: 200,
      }}
    >
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={styles.bottomSheetHeader}>Change profile picture</Text>

        {/* choose photo button */}
        <Button
          mode="contained"
          icon="image"
          color={colors.white}
          onPress={handlePicChange}
          disabled={startUpload || removingPic}
        >
          Choose a picture
        </Button>

        {/* remove profile pic button */}
        {profilePic && (
          <Button
            mode="outlined"
            icon="image-off"
            color={colors.white}
            onPress={handlePicRemove}
            disabled={startUpload || removingPic}
            style={{ borderColor: colors.white, marginVertical: 10 }}
          >
            Remove profile picture
          </Button>
        )}
      </View>
    </View>
  );

  return (
    currentUser && (
      <>
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
            <View style={styles.profileView}>
              {/* profile pic */}
              <Image
                source={profilePic ? { uri: profilePic } : defaultProfilePic}
                style={styles.profilePic}
              />

              {/* start upload and upload progress */}
              {startUpload && (
                <Upload image={image} setStartUpload={setStartUpload} />
              )}

              {removingPic && <IndeterminateProgress title="Updating" />}

              {/* error text */}
              {error && (
                <Text style={globalStyles.error}>
                  Something went wrong.Please try again later.
                </Text>
              )}

              {/* disabled email field */}
              <TextInput
                label="Email"
                mode="outlined"
                value={currentUser.email}
                disabled={true}
              />

              {/* change pic button */}
              <Button
                mode="contained"
                onPress={() => bottomSheetRef.current.snapTo(0)}
                disabled={startUpload || removingPic}
                style={{ marginVertical: 15, alignSelf: "center" }}
              >
                Change profile picture
              </Button>

              {/* logout button */}
              <Button
                mode="outlined"
                onPress={logout}
                disabled={startUpload || removingPic}
                color={colors.red}
                loading={authLoading}
                style={{ alignSelf: "center", borderColor: colors.red }}
              >
                {authLoading ? "logging out..." : "logout"}
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* bottom sheet with options to change/remove profile pic */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[200, 0]}
          initialSnap={1}
          borderRadius={15}
          renderContent={renderContent}
          enabledContentTapInteraction={false}
        />
      </>
    )
  );
}

export default Profile;

const styles = StyleSheet.create({
  profileView: {
    flex: 4,
    marginTop: -80,
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 10,
    alignSelf: "center",
  },
  bottomSheetHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    marginTop: 5,
    color: colors.white,
    ...fontConfig.default.regular,
  },
});

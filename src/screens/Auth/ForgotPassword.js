import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import { AuthContext } from "../../contexts/Auth";
import { colors, globalStyles, fontConfig } from "../../constants";

function ForgotPassword({ navigation }) {
  const { forgotPassword, authLoading, error, message, reset } = useContext(
    AuthContext
  );

  const goBack = () => {
    reset();
    navigation.goBack();
  };

  return (
    <View style={globalStyles.authView}>
      <View style={globalStyles.row}>
        <MaterialCommunityIcons
          name="account-key-outline"
          size={30}
          color={colors.black}
        />
        <Text
          style={{ fontSize: 25, margin: 5, ...fontConfig.default.regular }}
        >
          Forgot Password
        </Text>
      </View>
      <Divider style={globalStyles.divider} />

      <View>
        {message && <Text style={globalStyles.successMsg}>{message}</Text>}

        {error && (
          <Text style={globalStyles.error}>
            {error.code === "auth/user-not-found"
              ? "Email not found in our records"
              : "Something went wrong.Please try again later."}
          </Text>
        )}
      </View>

      {/* forgot password form */}
      <Formik
        initialValues={{ email: "" }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email("Please enter a valid email")
            .required("Email is a required field"),
        })}
        onSubmit={(values) => {
          if (authLoading) return;

          forgotPassword(values.email);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View>
            {/* email field */}
            <TextInput
              label="Email"
              mode="outlined"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              editable={!authLoading}
              style={globalStyles.input}
            />

            {errors.email && touched.email && (
              <Text style={globalStyles.error}>{errors.email}</Text>
            )}

            {/* submit button */}
            <Button
              mode="contained"
              loading={authLoading}
              onPress={handleSubmit}
              disabled={!isValid || !values.email}
              style={{ marginVertical: 10 }}
            >
              {authLoading ? "verifying..." : "submit"}
            </Button>
          </View>
        )}
      </Formik>

      <Button
        onPress={goBack}
        uppercase={false}
        style={{ alignSelf: "center" }}
      >
        Go back
      </Button>
    </View>
  );
}

export default ForgotPassword;

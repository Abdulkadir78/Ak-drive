import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";
import { TextInput, Button, Divider } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors, globalStyles } from "../../constants";
import { AuthContext } from "../../contexts/Auth";
import signupValidationSchema from "../../validation/signupValidationSchema";
import PasswordTrigger from "../../shared/PasswordTrigger";

function Signup({ navigation }) {
  const { signup, authLoading, reset, error } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigateToLogin = () => {
    reset();
    navigation.dispatch(StackActions.replace("Signup"));
    navigation.navigate("Login");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={globalStyles.authView}>
      <View style={globalStyles.row}>
        <MaterialIcons name="person-add-alt" size={40} color={colors.black} />
        <Text style={globalStyles.heading}>Signup</Text>
      </View>
      <Divider style={globalStyles.divider} />

      {error && (
        <Text style={globalStyles.error}>{error.message || error}</Text>
      )}

      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={signupValidationSchema}
        onSubmit={(values) => {
          if (authLoading) {
            return;
          }
          signup(values.email, values.password, values.confirmPassword);
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
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              editable={!authLoading}
              style={globalStyles.input}
            />

            {errors.email && touched.email && (
              <Text style={globalStyles.error}>{errors.email}</Text>
            )}

            <View>
              {/* password field */}
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                editable={!authLoading}
                style={globalStyles.input}
              />

              {errors.password && touched.password && (
                <Text style={globalStyles.error}>{errors.password}</Text>
              )}
            </View>

            <View>
              {/* confirm password field */}
              <TextInput
                label="Confirm password"
                mode="outlined"
                secureTextEntry={!showPassword}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                editable={!authLoading}
                style={globalStyles.input}
              />

              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={globalStyles.error}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* show password checkbox */}
            <View style={globalStyles.passwordCheckbox}>
              <PasswordTrigger
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                authLoading={authLoading}
              />
              <Text>Show Password</Text>
            </View>

            {/* singup button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={authLoading}
              disabled={
                !isValid ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
              }
            >
              {authLoading ? "verifying..." : "signup"}
            </Button>
          </View>
        )}
      </Formik>

      {/* login screen link */}
      <View style={globalStyles.row}>
        <Text>Have an account?</Text>
        <Button
          uppercase={false}
          onPress={navigateToLogin}
          compact={true}
          style={{ marginLeft: -6 }}
          disabled={authLoading}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

export default Signup;

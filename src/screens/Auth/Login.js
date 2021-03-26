import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import { Formik } from "formik";
import { StackActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors, globalStyles } from "../../constants";
import { AuthContext } from "../../contexts/Auth";
import loginValidationSchema from "../../validation/loginValidationSchema";
import PasswordTrigger from "../../shared/PasswordTrigger";

function Login({ navigation }) {
  const { login, authLoading, reset, error } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigateToSignup = () => {
    reset();
    navigation.dispatch(StackActions.replace("Login"));
    navigation.navigate("Signup");
  };

  const navigateToForgotPassword = () => {
    reset();
    navigation.dispatch(StackActions.replace("Login"));
    navigation.navigate("ForgotPassword");
  };

  // password visibility toggle
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={globalStyles.authView}>
      <View style={globalStyles.row}>
        <MaterialIcons name="login" size={40} color={colors.black} />
        <Text style={globalStyles.heading}>Login</Text>
      </View>
      <Divider style={globalStyles.divider} />

      {error && <Text style={globalStyles.error}>Invalid credentials</Text>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          if (authLoading) return;

          login(values.email, values.password);
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

              {/* show password checkbox */}
              <View style={globalStyles.passwordCheckbox}>
                <PasswordTrigger
                  showPassword={showPassword}
                  handleShowPassword={handleShowPassword}
                  authLoading={authLoading}
                />
                <Text>Show Password</Text>
              </View>
            </View>

            {/* login button */}
            <Button
              mode="contained"
              loading={authLoading}
              onPress={handleSubmit}
              disabled={!isValid || !values.email || !values.password}
            >
              {authLoading ? "verifying..." : "login"}
            </Button>
          </View>
        )}
      </Formik>

      {/* forgot password button */}
      <Button
        onPress={navigateToForgotPassword}
        uppercase={false}
        disabled={authLoading}
        style={{ alignSelf: "center", marginTop: 5 }}
      >
        Forgot Password?
      </Button>

      {/* signup screen link */}
      <View style={globalStyles.row}>
        <Text>Don't have an account?</Text>
        <Button
          uppercase={false}
          onPress={navigateToSignup}
          compact={true}
          style={{ marginLeft: -6 }}
          disabled={authLoading}
        >
          Signup
        </Button>
      </View>
    </View>
  );
}

export default Login;

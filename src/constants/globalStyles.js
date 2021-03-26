import { StyleSheet } from "react-native";

import colors from "./colors";
import { fontConfig } from "./fontConfig";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 40,
    margin: 5,
    ...fontConfig.default.regular,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  authView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },
  divider: {
    marginBottom: 15,
  },
  input: {
    fontSize: 19,
    marginVertical: 5,
  },
  passwordCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  error: {
    color: colors.error,
    fontSize: 15,
    textAlign: "center",
  },
  successMsg: {
    color: colors.green,
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
  },
  bottomTabs: {
    backgroundColor: colors.primary,
    paddingBottom: 2,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    elevation: 4,
  },
});

export default globalStyles;

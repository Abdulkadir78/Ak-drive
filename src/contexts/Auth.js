import React, { createContext, useState, useEffect } from "react";
import { auth, storage } from "../../firebase/config";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // check user's current authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setCurrentUser(null);
        return setLoading(false);
      }
      setCurrentUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setCurrentUser, setLoading]);

  const reset = () => {
    setError(null);
    setMessage(null);
  };

  const signup = async (email, password, confirmPassword) => {
    setError(null);
    setAuthLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setAuthLoading(false);
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setAuthLoading(false);
    } catch (err) {
      setError(err);
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setAuthLoading(true);
      await auth.signInWithEmailAndPassword(email, password);

      setAuthLoading(false);
    } catch (err) {
      setError(err);
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setAuthLoading(true);
      await auth.signOut();

      setAuthLoading(false);
    } catch (err) {
      setError(err);
      setAuthLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      setMessage(null);
      setAuthLoading(true);

      await auth.sendPasswordResetEmail(email);
      setMessage("Check your email for further details");
      setAuthLoading(false);
    } catch (err) {
      setError(err);
      setAuthLoading(false);
    }
  };

  const removeProfilePic = async () => {
    try {
      await currentUser.updateProfile({
        photoURL: "",
      });

      await storage.ref(`${currentUser.uid}/profilePic`).delete();
    } catch (err) {
      console.log(err);
    }
  };

  const values = {
    signup,
    login,
    logout,
    forgotPassword,
    reset,
    removeProfilePic,
    currentUser,
    authLoading,
    error,
    message,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;

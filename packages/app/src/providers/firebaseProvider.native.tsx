import firebase, { ReactNativeFirebase } from "@react-native-firebase/app";
import React, { createContext, useContext } from "react";

// ? Firebase config provided by native tools

const FirebaseContext = createContext<ReactNativeFirebase.FirebaseApp | null>(
  null
);

export const useFirebaseApp = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC = ({ children }) => {
  const app = firebase.app();

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

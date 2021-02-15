import React from "react";
import firebase, { ReactNativeFirebase } from "@react-native-firebase/app";
import { createContext, useContext, useMemo } from "react";
import env from "react-native-dotenv";

const config: ReactNativeFirebase.FirebaseAppOptions = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID!,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID!,
  measurementId: env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const FirebaseContext = createContext<ReactNativeFirebase.FirebaseApp | null>(
  null
);

export const useFirebaseApp = () => {
  const app = useContext(FirebaseContext);
  return app;
};

export const FirebaseProvider: React.FC = ({ children }) => {
  const app = useMemo(() => firebase.initializeApp(config), [config]);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { createContext, useContext, useMemo } from "react";

const config: Parameters<typeof firebase.initializeApp>[0] = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const FirebaseContext = createContext<firebase.app.App | null>(null);

export const useFirebaseApp = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC = ({ children }) => {
  const app = useMemo(() => firebase.initializeApp(config), [config]);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

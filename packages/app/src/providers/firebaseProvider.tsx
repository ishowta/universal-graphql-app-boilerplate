import firebase from "firebase/app";
import React, { createContext, useContext, useMemo } from "react";

import "firebase/auth";

const config: Parameters<typeof firebase.initializeApp>[0] = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

const FirebaseContext = createContext<firebase.app.App | null>(null);

export const useFirebaseApp = (): firebase.app.App | null => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider: React.FC = ({ children }) => {
  const app = useMemo(() => {
    return firebase.initializeApp(config);
  }, []);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};

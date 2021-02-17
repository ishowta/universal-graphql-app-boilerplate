import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";
import { useFirebaseApp } from "../../providers/firebaseProvider";

export const useAuthState = () => {
  const app = useFirebaseApp();
  const [authState, setAuthState] = useState(app?.auth().currentUser);
  const [error, setError] = useState<firebase.auth.Error | null>(null);
  useEffect(() => {
    const unSubscribe = app?.auth().onAuthStateChanged(setAuthState, setError);
    if (unSubscribe) return () => unSubscribe();
    return undefined;
  }, [app]);

  return [authState, authState == null, error] as const;
};
